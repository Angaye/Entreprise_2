import colors from '../../utils/style/colors';
import styled from 'styled-components';
import logo from '../../assets/icon-left-font-monochrome-white.png';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
    height: 100px;
    padding: 1rem;
    color: white;
    background-color: ${colors.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 768px) {
        height: 80px;
    }
`
const HeaderLogo = styled.img`
    height: 350px;
    @media screen and (max-width: 768px) {
        height: 150px; 
    }
`
const HeaderUser = styled.div`
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    & a {
        font-size: 3rem;
        color: white};
    }
    & .HeaderUser_username {
        margin-bottom: 3.5rem;
        @media screen and (max-width: 768px) {
            margin-bottom: 1.8rem;
        }

    }
    & .HeaderUser_manage {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        cursor:pointer;
        & p {
            margin: 0.3rem 0;
        }
    }
    @media screen and (max-width: 768px) {
        margin-right: 0.2rem;
    }
    
`

function Header () {
    const url = document.location.pathname;
    const [isArticlesPage, setIsArticlesPage] = useState(false);
    const [username, setUsername ] = useState();

    useEffect ( () => {
        setIsArticlesPage(url.includes("article"));
        setUsername(localStorage.getItem("Username"));
    },[url]);

    function deleteUser () {        
        async function fetchData() {
            try {
                const UserId = parseInt(localStorage.getItem("UserId"));
                const token = localStorage.getItem("Token");
                const response = await fetch(`http://localhost:3000/api/auth/delete`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({UserId})
                });
                const data = await response.json();
                if (data.error) {
                    alert(data.error);
                } else {
                    localStorage.clear();
                    alert("Utilisateur supprimé");
                    window.location.href = "/";
                }
            } catch (err) {
                console.log(err)
            }
          }
        fetchData();
    };

    function disconnectUser () {
        localStorage.clear();
        alert("Utilisateur déconnecté");
        window.location.href = "/"
    }

    return (
        <HeaderContainer>
            <Link to='/'>
                <HeaderLogo src={logo}/>
            </Link>  
            {!isArticlesPage ? (
                <HeaderUser>
                </HeaderUser>
            ) : (
                <HeaderUser>
                    <p className="HeaderUser_username">Bonjour {username}</p>
                    <div className="HeaderUser_manage">
                        <p className="remark" onClick={()=>disconnectUser()}>Déconnexion</p>
                        <p className="remark" onClick={()=>deleteUser()}>Supprimer le compte</p>  
                    </div>
                  
                </HeaderUser>
            )}
        </HeaderContainer>
    )
};

export default Header;