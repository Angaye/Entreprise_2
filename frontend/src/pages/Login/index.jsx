import colors from '../../utils/style/colors';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BlueButton from '../../components/BlueButton/BlueButton';

const LoginContainer = styled.section`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const LoginForm = styled.form`
    width: 50vh;
    max-width: 60%;
    padding: 5rem 0;
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
    & input {
        width: 80%;
        height: 3.5rem;
        margin-bottom:2rem;
        border: 1px solid ${colors.primary};
        background-color: ${colors.tertiary};
    }
`

function Login () {
    const textRegex = new RegExp ("^[^<>]+$"); // Expression régulière pour les champs textes excluant les chevrons
    const emailRegex = new RegExp ('^[\\w\\-\\.\\+]+\\@[\\w\\.\\-]+\\.[\\w]{2,4}$'); // Expression régulière pour les champs "email"
    let email = "", password = "";
    let emailValidity = false, passwordValidity = false;

    // Récupération des données utilisateurs
    function handleInputChange(event) {
        if (event.target.name === 'email') email = event.target.value;
        if (event.target.name === 'password') password = event.target.value;
    };
    
    function formSubmit(event) {
        event.preventDefault();
        // Vérification des données: non nulles & format valable
        if (!email || !password) {
            alert("Les deux champs 'Email' et 'Mot de passe' sont obligatoires");
        } else {
            (!emailRegex.test(email)) ? alert("Votre email doit être du format jean.dupont@mail.com") : emailValidity = true;
            (!textRegex.test(password)) ? alert("Votre mot de passe contient des caractères spéciaux non autorisés") : passwordValidity = true;
        }
    
        //Envoi de la requête
        if (emailValidity && passwordValidity) {
            async function fetchData() {
                try {
                    const response = await fetch(`http://localhost:3000/api/auth/login`, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({email, password})
                    });
                    const data = await response.json();
                    if (data.error) {
                        alert(data.error);
                    } else {
                        console.log("Authentification réussie");
                        localStorage.removeItem('Token');
                        localStorage.setItem('Token', data.token);
                        localStorage.removeItem('UserId');
                        localStorage.setItem('UserId', data.UserId);
                        localStorage.removeItem('Username');
                        localStorage.setItem('Username', data.Username);
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
        <LoginContainer>
            <h1>Bienvenue sur notre réseau social interne</h1>
            <LoginBox>
                <h2>Déjà inscrit ?</h2>
                <LoginForm onSubmit={(event) => formSubmit(event)}>
                        <label htmlFor="email" className="primary-color">Email</label>
                        <input name="email" id="email" type="email" required onChange={(event) => handleInputChange(event)}/>
                        <label htmlFor="password" className="primary-color">Mot de passe</label>
                        <input name="password" id="password" type="password" required onChange={(event) => handleInputChange(event)}/>
                        <BlueButton className="white-color">Se connecter</BlueButton>
                </LoginForm>
                <h2>Nouveau venu ?</h2>
                <Link to="/auth/signup" className="primary-color">Inscrivez-vous <em>ici</em></Link>
            </LoginBox>            
        </LoginContainer>
    )
};

export default Login;