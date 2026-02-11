import styled from "styled-components";
import { AuthForm } from "../components/AuthForm"
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "../context/AppStateContext";
import { useEffect } from "react";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const AuthPage = () => {
    const navigate = useNavigate();
    const { loggedUser } = useAppStateContext();

    useEffect(() => {
        if (loggedUser) {
            navigate('/users', { replace: true });
        }
    }, [loggedUser, navigate]);

    return <CenteredContainer>
        <AuthForm />
    </CenteredContainer>

}