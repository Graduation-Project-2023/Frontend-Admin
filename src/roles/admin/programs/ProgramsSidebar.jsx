import { useParams } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";

const ProgramsSidebarData = [
  {
    id: "1",
    title: "academicSidebar.main",
    path: "main",
  },
  {
    id: "2",
    title: "academicSidebar.level",
    path: "levels",
  },
  {
    id: "3",
    title: "academicSidebar.grades",
    path: "grades",
  },
  {
    id: "4",
    title: "academicSidebar.levelHours",
    path: "level-hours",
  },
  {
    id: "5",
    title: "academicSidebar.gpaHours",
    path: "gpa-hours",
  },
  {
    id: "6",
    title: "academicSidebar.courses",
    path: "courses",
  },
  {
    id: "7",
    title: "academicSidebar.gpa",
    path: "gpa",
  },
  {
    id: "8",
    title: "academicSidebar.control",
    path: "control",
  },
  {
    id: "9",
    title: "academicSidebar.graduation",
    path: "graduation",
  },
];

export const ProgramsSidebar = () => {
  const { programId } = useParams();

  return (
    <Sidebar
      activeNav={true}
      backendData={false}
      sideData={ProgramsSidebarData}
      sidebarTitle={"portal.programs"}
      options={
        <select className="form-select">
          <option>Hello</option>
          <option>One</option>
        </select>
      }
    />
  );
};
