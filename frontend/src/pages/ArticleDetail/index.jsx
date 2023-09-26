import colors from '../../utils/style/colors';
import styled from 'styled-components';
import RedButton from '../../components/RedButton/index';
import BackButton from '../../components/BackButton/BackButton';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Comment from '../../components/Comment/Comment';
import { useState, useEffect } from 'react';

const ArticleDetailContainer = styled.section`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    & h1 {
        align-self: flex-start;
    }
`
const ArticleDetailTitles = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .ArticleDetailTitles_title {
        text-align: left;
    }
    & div {
        display: flex;
        @media screen and (max-width: 425px) {
            flex-direction: column;
        }
    }
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`
const ArticleDetailContent = styled.p`
    padding: 1rem;
    text-align: justify;
    background-color: ${colors.tertiary};
`
const ArticleDetailAddComment = styled.form`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & input {
        width: 100%;
        height: 40px;
        border: 1px solid ${colors.secondary};
    }
`
const ArticleDetailComments = styled.div`
    height: 500px;
    overflow-y: scroll;
    overflow-x: wrap;
`

function ArticleDetail () {
    const textRegex = new RegExp ("^[^<>]+$"); // Expression régulière pour les champs textes excluant les chevrons
    const index = parseInt(useParams().id);
    const token = localStorage.getItem("Token");
    const [article, setArticle] = useState([]);
    const [refreshComment, setRefreshComment] = useState(false);
    const [commentsList, setCommentsList] = useState([]);
    const UserIdLocal = parseInt(localStorage.getItem("UserId"));


    // Récupérer et afficher les informations sur l'article de la page
    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("Token");
            try {
              const response = await fetch(`http://localhost:3000/api/articles/`+index, {headers: {"Authorization": "Bearer " + token}})
              const data = await response.json()
              setArticle(data)
            } catch (err) {
              console.log(err)
            }
            try {
                const response = await fetch(`http://localhost:3000/api/comments/`+index, {headers: {"Authorization": "Bearer " + token}})
                const data = await response.json()
                setCommentsList(data)
              } catch (err) {
                console.log(err)
              }
          }
          fetchData()
    }, [refreshComment, index])

    // Bouton supprimer pour effacer l'article
    function deleteArticle () {    
        async function fetchData() {
            try {                
                const response = await fetch(`http://localhost:3000/api/articles/`+index, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                });
                const data = await response.json();
                if (data.error) {
                    alert(data.error);
                } else {
                    alert("Article supprimé");
                }
            } catch (err) {
                console.log(err)
            }
          }
        fetchData();
    };

    // Bouton Envoyer pour poster un commentaire
    function commentSubmit(event) {
        setRefreshComment(false);
        let commentValidity = false;
        const comment = event.target[0].value;
        event.preventDefault();
        // Vérification des données: non nulles & format valable
        if (!comment) {
            alert("Votre commentaire est vide");
        } else {
            (!textRegex.test(comment)) ? alert("Votre commentaire contient des caractères spéciaux non autorisés") : commentValidity = true;
        }
        //Envoi de la requête
        if (commentValidity) {
            const ArticleId = index;
            const username = localStorage.getItem("Username");
            const post = comment;
            async function fetchData() {
                try {
                    const response = await fetch(`http://localhost:3000/api/comments/`+index, {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Accept": "application/json",
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ArticleId, username, post})
                    });
                    const data = await response.json();
                    if (data.error) {
                        alert(data.error);
                    } else {
                        alert("Nouveau commentaire ajouté");
                        event.target.reset();
                        setRefreshComment(true);
                    }
                } catch (err) {
                    console.log(err)                    
                }
            }
            fetchData()            
        }
    }

    return (
        <ArticleDetailContainer>
            <Link to='/articles'>
                <BackButton />
            </Link>            
            <ArticleDetailTitles>
                <h1 className="ArticleDetailTitles_title">{article.title}</h1>
                {((UserIdLocal === article.UserId) || (UserIdLocal === 1)) ? (
                    <div className="ArticleDetailTitles_buttons">
                        <Link to='/articles' onClick={()=>deleteArticle()}><RedButton >Supprimer</RedButton></Link>
                        <Link to={'/articles/modify/'+index}><RedButton>Modifier</RedButton></Link>  
                    </div>
                ):(
                    <div className="ArticleDetailTitles_buttons"> 
                    </div>
                )}        
            </ArticleDetailTitles>
            <ArticleDetailContent>{article.content}</ArticleDetailContent>
            <ArticleDetailAddComment onSubmit={(event) => commentSubmit(event)}>
                <input name="comment" id="comment" type="text" placeholder="Ajoutez votre commentaire ici" required />
                <RedButton>Envoyer</RedButton>
            </ArticleDetailAddComment>
            <ArticleDetailComments>
                {commentsList.map((comment) => (
                    <Comment 
                        key={comment.id}
                        commentId={comment.id}
                        profile={comment.username}
                        content={comment.post}
                    />
                ))}
            </ArticleDetailComments>        
        </ArticleDetailContainer>
    )
};

export default ArticleDetail;