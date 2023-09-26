import BackButton from "../../components/BackButton/BackButton";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import BlueButton from "../../components/BlueButton/BlueButton";
import { Link } from "react-router-dom";

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
    const textRegex = new RegExp ("^[^<>]+$"); // Expression régulière pour les champs textes excluant les chevrons
    let title = "", content = "";
    let titleValidity = false, contentValidity = false;

    // Récupération des données utilisateurs
    function handleInputChange(event) {
        if (event.target.name === 'title') title = event.target.value;
        if (event.target.name === 'content') content = event.target.value;
    };
    
    function formSubmit(event) {
        event.preventDefault();
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
                    const response = await fetch(`http://localhost:3000/api/articles`, {
                        method: "POST",
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
                        alert("Nouvel article crée !")
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
            <h1>Soumettre un nouvel article</h1>         
            <ArticleNewForm onSubmit={(event) => formSubmit(event)}>
                <label htmlFor="title" className="primary-color">Titre de l'article</label>
                <input name="title" id="title" type="text" required onChange={(event) => handleInputChange(event)}/>
                <label htmlFor="content" className="primary-color">Contenu de l'article</label>
                <textarea name="content" id="content" required onChange={(event) => handleInputChange(event)}/>
                <BlueButton className="white-color">Soumettre</BlueButton>
            </ArticleNewForm>
        </ArticleNewContainer>
    )
};

export default ArticleNew;