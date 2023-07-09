import { HeaderNavbar } from "../../components/header/HeaderNavbar";

const AdminNavbarData = [
  {
    id: "1",
    title: "adminNavbar.student",
    keyword: "adminNavbarkeys.student",
    path: "student_data",
  },
  {
    id: "2",
    title: "adminNavbar.courses",
    keyword: "adminNavbarkeys.courses",
    path: "courses",
  },
  {
    id: "3",
    title: "adminNavbar.departments",
    keyword: "adminNavbarkeys.departments",
    path: "departments",
  },
  {
    id: "4",
    title: "adminNavbar.academic",
    keyword: "adminNavbarkeys.academic",
    path: "academic_programs",
  },
  {
    id: "5",
    title: "adminNavbar.schedule",
    keyword: "adminNavbarkeys.schedule",
    path: "study_schedules",
  },
  {
    id: "6",
    title: "adminNavbar.registeration",
    keyword: "adminNavbarkeys.registeration",
    path: "registeration",
  },
  {
    id: "11",
    title: "adminNavbar.control",
    keyword: "adminNavbarkeys.control",
    path: "control_system",
  },
  // {
  //   id: "7",
  //   title: "adminNavbar.exams",
  //   keyword: "adminNavbarkeys.exams",
  //   path: "exams",
  // },
  {
    id: "8",
    title: "adminNavbar.results",
    keyword: "adminNavbarkeys.results",
    path: "results",
  },
  {
    id: "12",
    title: "adminNavbar.payment",
    keyword: "adminNavbarkeys.payment",
    path: "payments",
  },
  // {
  //   id: "9",
  //   title: "adminNavbar.absence",
  //   keyword: "adminNavbarkeys.absence",
  //   path: "absence",
  // },
  // {
  //   id: "10",
  //   title: "adminNavbar.supervision",
  //   keyword: "adminNavbarkeys.supervision",
  //   path: "supervision",
  // },
];

export const AdminNavbar = () => {
  return <HeaderNavbar data={AdminNavbarData} />;
};
