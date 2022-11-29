import { Header } from "../../components/Header";
import { HeaderNavbar } from "../../components/HeaderNavbar";

const AdminNavbarData = [
  {
    id: "1",
    title: "adminNavbar.student",
    keyword:"adminNavbarkeys.student",
    path: "academic_programs",
  },
  {
    id: "2",
    title: "adminNavbar.academic",
    keyword:"adminNavbarkeys.academic",
    path: "study_schedules",
  },
  {
    id: "3",
    title: "adminNavbar.schedule",
    keyword:"adminNavbarkeys.schedule",
    path: "student_data",
  },
  {
    id: "4",
    title: "adminNavbar.registeration",
    keyword:"adminNavbarkeys.registeration",
    path: "courses",
  },
  {
    id: "5",
    title: "adminNavbar.exams",
    keyword:"adminNavbarkeys.exams",
    path: "control_system",
  },
  {
    id: "6",
    title: "adminNavbar.results",
    keyword:"adminNavbarkeys.results",
    path: "control_system",
  },
  {
    id: "7",
    title: "adminNavbar.finance",
    keyword:"adminNavbarkeys.finance",
    path: "control_system",
  },
  {
    id: "8",
    title: "adminNavbar.absence",
    keyword:"adminNavbarkeys.absence",
    path: "control_system",
  },
  {
    id: "9",
    title: "adminNavbar.mail",
    keyword:"adminNavbarkeys.mail",
    path: "control_system",
  },
  {
    id: "10",
    title: "adminNavbar.supervision",
    keyword:"adminNavbarkeys.supervision",
    path: "control_system",
  },
  {
    id: "11",
    title: "adminNavbar.control",
    keyword:"adminNavbarkeys.control",
    path: "control_system",
  },
];

export const AdminNavbar = () => {
  return (
    <>
      <Header />
      <HeaderNavbar data={AdminNavbarData} />
    </>
  );
};
