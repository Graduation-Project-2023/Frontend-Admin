import { useParams } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";

const ProgramsSidebarData = [
  {
    id: "1",
    title: "academicSidebar.level",
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
    title: "academicSidebar.main",
    path: "courses",
  },
  {
    id: "5",
    title: "academicSidebar.main",
    path: "control",
  },
  {
    id: "6",
    title: "academicSidebar.main",
    path: "graduation",
  },
  {
    id: "7",
    title: "academicSidebar.main",
    path: "graduation",
  },
  {
    id: "8",
    title: "academicSidebar.main",
    path: "graduation",
  },
  {
    id: "9",
    title: "academicSidebar.main",
    path: "graduation",
  },
];

export const ProgramsSidebar = () => {
  const { programId } = useParams();

  return <Sidebar sideData={ProgramsSidebarData} routerParams={programId} />;
};
