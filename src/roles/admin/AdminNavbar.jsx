import { HeaderNavbar } from "../../components/HeaderNavbar";

const AdminNavbarData = [
  {
    id: "1",
    title: "adminNavbar.academic",
    path: "academic_programs",
  },
  {
    id: "2",
    title: "adminNavbar.schedules",
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
  {
    id: "6",
    title: "Control System",
    path: "control_system",
  },
  {
    id: "7",
    title: "Control System",
    path: "control_system",
  },
  {
    id: "8",
    title: "Control System",
    path: "control_system",
  },
  {
    id: "9",
    title: "Control System",
    path: "control_system",
  },
  {
    id: "10",
    title: "Control System",
    path: "control_system",
  },
  {
    id: "11",
    title: "Control System",
    path: "control_system",
  },
];

export const AdminNavbar = () => {
  return <HeaderNavbar data={AdminNavbarData} />;
};
