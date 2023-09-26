import BackButton from "../../components/BackButton/BackButton";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import BlueButton from "../../components/BlueButton/BlueButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

const ArticleNewContainer = styled.section`

`
const ArticleNewForm = styled.form`
    max-width: 80%;
    padding: 5rem 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 2px solid ${colors.secondary};
    background-color: ${colors.tertiary};
    & label {
        font-size: 1.5rem;
        padding-bottom: 1rem;
    }
    & input, textarea {
        width: 80%;
        height: 3.5rem;
        margin-bottom:2rem;
        border: 1px solid ${colors.primary};
        background-color: ${colors.tertiary};
        resize:none;
    }
    & #content {
        height: 30rem;
    }
`

function ArticleNew () {
    const token = localStorage.getItem("Token");
    const index = parseInt(useParams().id);
    const textRegex = new RegExp ("^[^<>]+$"); // Expression régulière pour les champs textes excluant les chevrons
    let title = "", content = "";
    let titleValidity = false, contentValidity = false;
    const [oldVersion, setOldVersion] = useState([]);

    useEffect(() => {
        async function fetchData() {            
            try {
                const response = await fetch(`http://localhost:3000/api/articles/`+index, {headers: {"Authorization": "Bearer " + token}});
                const data = await response.json();
                setOldVersion(data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [index, token])


    function formSubmit(event) {
        event.preventDefault();
        title = event.target[0].value;
        content = event.target[1].value;

        // Vérification des données: non nulles & format valable
        if (!title || !content) {
            alert("Un titre et un contenu sont obligatoires");
        } else {
            (!textRegex.test(title)) ? alert("Votre titre contient des caractères spéciaux non autorisés") : titleValidity = true;
            (!textRegex.test(content)) ? alert("Votre texte contient des caractères spéciaux non autorisés") : contentValidity = true;
        }
    
        //Envoi de la requête
        if (titleValidity && contentValidity) {
            async function fetchData() {
                try {
                    const UserId = localStorage.getItem("UserId");
                    const token = localStorage.getItem("Token");
                    console.log(token);
                    const response = await fetch(`http://localhost:3000/api/articles/modify/`+index, {
                        method: "PUT",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Accept": "application/json",
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({UserId, title, content})
                    });
                    const data = await response.json();
                    if (data.error) {
                        alert(data.error);
                    } else {
                        alert("Article modifié !")
                        window.location.href = "/articles"
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            fetchData()
        }
    }

    return (
        <ArticleNewContainer>
            <Link to='/articles'>
                <BackButton />
            </Link>   
            <h1>Modifier un article</h1>         
            <ArticleNewForm onSubmit={(event) => formSubmit(event)}>
                <label htmlFor="title" className="primary-color">Titre de l'article</label>
                <input name="title" id="title" type="text" defaultValue={oldVersion.title} required/>
                <label htmlFor="content" className="primary-color">Contenu de l'article</label>
                <textarea name="content" id="content" defaultValue={oldVersion.content} required/>
                <BlueButton className="white-color">Modifier</BlueButton>
            </ArticleNewForm>
        </ArticleNewContainer>
    )
};

export default ArticleNew;