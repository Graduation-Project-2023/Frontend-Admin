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
    title: "levels",
    path: "levels",
  },
  {
    id: "3",
    title: "grades",
    path: "grades",
  },
  {
    id: "4",
    title: "courses",
    path: "courses",
  },
  {
    id: "5",
    title: "control",
    path: "control",
  },
  {
    id: "6",
    title: "graduation",
    path: "graduation",
  },
  {
    id: "7",
    title: "graduation",
    path: "graduation",
  },
  {
    id: "8",
    title: "graduation",
    path: "graduation",
  },
  {
    id: "9",
    title: "graduation",
    path: "graduation",
  },
  {
    id: "10",
    title: "graduation",
    path: "graduation",
  },
];

export const ProgramsSidebar = () => {
  const { programId } = useParams();

  return <Sidebar sideData={ProgramsSidebarData} routerParams={programId} />;
};
