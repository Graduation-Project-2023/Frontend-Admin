import { HeaderNavbar } from "../../components/header/HeaderNavbar";

const StaffNavbarData = [
  {
    id: "1",
    title: "adminNavbar.student",
    keyword: "adminNavbarkeys.student",
    path: "schedule",
  },
  {
    id: "2",
    title: "adminNavbar.courses",
    keyword: "adminNavbarkeys.courses",
    path: "students_info",
  },
  {
    id: "3",
    title: "adminNavbar.departments",
    keyword: "adminNavbarkeys.departments",
    path: "coursework",
  },
];

export const StaffNavbar = () => {
  return <HeaderNavbar data={StaffNavbarData} />;
};
