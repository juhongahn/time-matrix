import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.header`
  margin: 0;
  padding: 1.2rem;

  display: flex;
  justify-content: space-between;

  background-color: rgb(246, 248, 250);
  box-shadow: rgb(208, 215, 222) -1px -1px 0px 0px inset;
`;

const List = styled.ul`
  display: flex;
  gap: 1.5rem;
`;

const NavItem = styled.li`
  & a {
    font-weight: 700;
    color: rgb(101, 109, 118);
  }
  & .active {
    color: black;
  }
`;

const Navbar = () => {
  return (
    <Container>
      <nav>
        <List>
          <NavItem>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/accomplishment"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Accomplishment
            </NavLink>
          </NavItem>
        </List>
      </nav>
    </Container>
  );
};
export default Navbar;
