import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const HeaderNavbar = (props) => {
  const navData = props.data;
  const { t } = useTranslation();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Nav className="me-auto">
          {navData.map((item) => {
            return (
              <li key={item.id}>
                <NavLink
                  className={({ isActive }) => (isActive ? "activeClass" : "")}
                  to={item.path}
                >
                  {t(`${item.title}`)}
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </Container>
    </Navbar>
  );
};
