import colors from '../../utils/style/colors';
import styled from 'styled-components';

const StyledArticleContainer = styled.div`
    width: 29vw;
    height: 300px;
    margin-bottom: 2rem;
    margin-right: 1.3vw;
    padding: 0.5rem;
    border: solid 1px ${colors.primary};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & .articleContainer_summary {
        color: ${colors.primary};
        margin: 0
    }
    @media screen and (max-width: 768px) {
        width: 43vw;
        margin-right: 1.7vw;
    }
    @media screen and (max-width: 425px) {
        width: 80vw;
    }
`
const ArticleSummary = styled.div`
    font-size: 1.5rem;
    height: 150px;
    color: ${colors.primary};
    padding: 0.5rem;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: ${colors.tertiary};
`
const ArticleAuthor = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    & .remark {
        color: ${colors.secondary};
    }
`

function Article ({title, content, author}) {
    return (
        <StyledArticleContainer>
            <h2>{title}</h2>
            <p className="articleContainer_summary">Aperçu:</p>
            <ArticleSummary>{content}</ArticleSummary> 
            <ArticleAuthor>
                <p className="remark">Auteur: {author}</p>
            </ArticleAuthor>
        </StyledArticleContainer>        
    )
};

export default Article;