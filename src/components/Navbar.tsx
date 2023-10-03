import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.header`
  margin: auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

const List = styled.ul`
  display: flex;
  gap: 1rem;

  & a {
    text-decoration: none;
  }
`;

function Navbar() {
  return (
    <Container>
      <nav>
        <List>
          <li>
            <Link to="/">Home</Link>
          </li>
        </List>
      </nav>
    </Container>
  );
}
export default Navbar;
