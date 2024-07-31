import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    // 1. load the authenticated user
    const { user, isPending, isAuthenticated } = useUser();

    // 2. if there is NO authenticated user, redirect to the /login
    useEffect(() => {
        if (!isAuthenticated && !isPending) navigate("/login");
    }, [isAuthenticated, navigate, isPending]);

    // 3. while loading , show a spinner
    if (isPending)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 4. if there IS a user, render the app
    if (isAuthenticated) return children;
}

export default ProtectedRoute;
