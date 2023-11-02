import { Outlet } from "react-router-dom";

import Navbar from "../components/nav/Navbar";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  
  display: flex;
  flex-direction: column;
  
  & main {
    flex-grow: 1;
  }
`;

const RootLayout = () => {
  return (
    <Container>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default RootLayout;
