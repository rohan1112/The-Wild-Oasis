import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Fullpage = styled.div`
  height: 100vh;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  //1.Load authenticated user if it is present
  const { isLoadingUser, isAuthenticated } = useUser();
  const navigate = useNavigate();

  //2.If authenticated user show dashboard other wise redirect to the login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoadingUser) navigate("/login");
    },
    [isAuthenticated, isLoadingUser, navigate]
  );

  //3.Load spinner if user is Loading
  if (isLoadingUser)
    return (
      <Fullpage>
        <Spinner />;
      </Fullpage>
    );

  //4.If user is authenticated show the app

  if (isAuthenticated) return children;
}
