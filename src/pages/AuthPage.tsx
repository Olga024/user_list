import styled from "styled-components";
import { AuthForm } from "../components/AuthForm"

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const AuthPage = () => {
    return <CenteredContainer>
        <AuthForm />
    </CenteredContainer>

}