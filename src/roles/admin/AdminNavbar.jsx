import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const AdminNavbarData = [
  {
    id: "1",
    title: "Academic Programs",
    path: "academic_programs",
  },
  {
    id: "2",
    title: "Study Schedules",
    path: "study_schedules",
  },
  {
    id: "3",
    title: "Student Data",
    path: "student_data",
  },
  {
    id: "4",
    title: "Courses",
    path: "courses",
  },
  {
    id: "5",
    title: "Control System",
    path: "control_system",
  },
];

export const AdminNavbar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {AdminNavbarData.map((item) => {
              return (
                <li key={item.id}>
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              );
            })}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
