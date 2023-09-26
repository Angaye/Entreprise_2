import styled from 'styled-components';
import colors from '../../utils/style/colors';

const StyledRedButton = styled.button`
    width: 16rem;
    padding: 1.5rem;
    margin: 2rem;
    background-color: ${colors.secondary};
    border: none;
    border-radius: 8px;
    & {children} {
        font-weight: bold;
        color: white;
        font-size: 1.5rem;
    }
    &:hover {
        cursor:pointer;
    }
`

function RedButton ({children}) {
    return (
        <StyledRedButton>{children}</StyledRedButton>
    )
};

export default RedButton;