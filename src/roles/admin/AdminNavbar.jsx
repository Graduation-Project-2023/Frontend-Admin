import { HeaderNavbar } from "../../components/HeaderNavbar";

const AdminNavbarData = [
  {
    id: "1",
    title: "adminNavbar.student",
    keyword: "adminNavbarkeys.student",
    path: "student_data",
  },
  {
    id: "2",
    title: "adminNavbar.academic",
    keyword: "adminNavbarkeys.academic",
    path: "academic_programs",
  },
  {
    id: "3",
    title: "adminNavbar.schedule",
    keyword: "adminNavbarkeys.schedule",
    path: "study_schedules",
  },
  {
    id: "4",
    title: "adminNavbar.registeration",
    keyword: "adminNavbarkeys.registeration",
    path: "registeration",
  },
  {
    id: "5",
    title: "adminNavbar.exams",
    keyword: "adminNavbarkeys.exams",
    path: "exams",
  },
  {
    id: "6",
    title: "adminNavbar.results",
    keyword: "adminNavbarkeys.results",
    path: "results",
  },
  {
    id: "7",
    title: "adminNavbar.finance",
    keyword: "adminNavbarkeys.finance",
    path: "finance",
  },
  {
    id: "8",
    title: "adminNavbar.absence",
    keyword: "adminNavbarkeys.absence",
    path: "absence",
  },
  {
    id: "9",
    title: "adminNavbar.mail",
    keyword: "adminNavbarkeys.mail",
    path: "mail",
  },
  {
    id: "10",
    title: "adminNavbar.supervision",
    keyword: "adminNavbarkeys.supervision",
    path: "supervision",
  },
  {
    id: "11",
    title: "adminNavbar.control",
    keyword: "adminNavbarkeys.control",
    path: "control_system",
  },
];

export const AdminNavbar = () => {
  return <HeaderNavbar data={AdminNavbarData} />;
};
