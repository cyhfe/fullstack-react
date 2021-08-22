import styled from "styled-components";
import client from "../client";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div``;

const LoginButton = styled.div``;

const TopBar = () => {
  return (
    <Container>
      <Logo>Music Albums</Logo>
      {client.isLoggedIn() ? (
        <Link to="logout">Logout</Link>
      ) : (
        <Link to="login">Login</Link>
      )}
    </Container>
  );
};

export default TopBar;
