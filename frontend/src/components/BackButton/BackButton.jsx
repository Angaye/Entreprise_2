import styled from "styled-components";
import arrow from "../../assets/iconArrow.png";

const StyledBackButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background: none;
    & img {
        height: 10px;
        padding-right: 0.5rem;
    }
    &:hover {
        cursor:pointer;
    }
`

function BackButton () {
    return (
        <StyledBackButton>
            <img src={arrow} alt="" />
            <p className="remark">Retour à la liste des articles</p>
        </StyledBackButton>
    )
};

export default BackButton;