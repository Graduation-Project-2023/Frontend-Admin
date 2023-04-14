import { HeaderNavbar } from "../../components/header/HeaderNavbar";

const StaffNavbarData = [
  {
    id: "1",
    title: "adminNavbar.schedule",
    keyword: "adminNavbarkeys.schedule",
    path: "schedule",
  },
  {
    id: "2",
    title: "adminNavbar.students_info",
    keyword: "adminNavbarkeys.students_info",
    path: "students_info",
  },
  {
    id: "3",
    title: "adminNavbar.coursework",
    keyword: "adminNavbarkeys.coursework",
    path: "coursework",
  },
];

export const StaffNavbar = () => {
  return <HeaderNavbar data={StaffNavbarData} />;
};
