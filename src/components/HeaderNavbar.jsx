import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const HeaderNavbar = (props) => {
  const navData = props.data;
  const { t } = useTranslation();
  return (
    <Navbar collapseOnSelect expand="lg" className="header">
      <Container>
       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto ">
          {navData.map((item) => {
            return (
              <li key={item.id} className='header-items'>
                <NavLink
                  className={({ isActive }) => (isActive ? "header-items-active" : "header-items-notactive")}
                  to={item.path}
                >
                  {t(`${item.keyword}`)}
                  {({ isActive }) => (isActive ? '{t(`${item.keyword}`)}' : '{t(`${item.title}`)}')}
                </NavLink>
              </li>
            );
          })}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
