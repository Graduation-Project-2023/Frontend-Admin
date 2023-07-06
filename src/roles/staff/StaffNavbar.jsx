import { HeaderNavbar } from "../../components/header/HeaderNavbar";

const StaffNavbarData = [
  // {
  //   id: "0",
  //   title: "staff.navChat",
  //   keyword: "staff.chat",
  //   path: "chat",
  // },
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
  {
    id: "4",
    title: "adminNavbar.mcq",
    keyword: "adminNavbarkeys.mcq",
    path: "mcq",
  },
];

export const StaffNavbar = () => {
  return <HeaderNavbar data={StaffNavbarData} staff={true} />;
};
