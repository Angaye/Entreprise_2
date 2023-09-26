import styled from 'styled-components';
import colors from '../../utils/style/colors';
import cross from '../../assets/iconCross.png';
import { useParams } from 'react-router';

const CommentContainer = styled.div`
    & p{
        margin-bottom: 0.2rem;
    }    
`
const ContentContainer = styled.div`
    position: relative;
    margin: 0.2rem 0 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & p {
        width: 90%;
        padding: 1rem;
        margin: 0;
        color: ${colors.primary};
        border: 1px solid ${colors.primary};
        border-radius: 8px;
        background-color: ${colors.secondaryLight};
    }
    & img {
        height: 25px;
        margin: 0 2rem;
        cursor:pointer;
    }
`

function Comment ({profile, content, commentId}) {
    const UsernameLocal = localStorage.getItem("Username");
    const index = parseInt(useParams().id);
    const token = localStorage.getItem("Token");


    function deleteComment (event) {    
        console.log(event.target);
        console.log(commentId);
        console.log(index);
        async function fetchData() {
            try {                
                const response = await fetch(`http://localhost:3000/api/comments/`+index, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({commentId})
                });
                const data = await response.json();
                if (data.error) {
                    alert(data.error);
                } else {
                    alert("Commentaire supprimé");
                    window.location.href = "/articles/"+index;

                }
            } catch (err) {
                console.log(err)
            }
          }
        fetchData();
    };

    return (
        <CommentContainer>
            <div className="remark">{profile}</div>
            <ContentContainer>
                <p>{content}</p>
                {((UsernameLocal === profile) || (UsernameLocal === "ChargéCom")) ? <img src={cross} alt="" onClick={(event)=>deleteComment(event)}/> : "" }
            </ContentContainer>
        </CommentContainer>
    )
};

export default Comment;