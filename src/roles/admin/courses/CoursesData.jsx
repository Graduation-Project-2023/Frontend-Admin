import { Sidebar } from "../../../components/Sidebar";
import { SidebarContainer } from "../../../components/SidebarContainer";
import { FormCard } from "../../../components/FormCard";

export const CoursesData = () => {
  return (
    <>
      <Sidebar sideData={[]} sidebarTitle={"hello"} options={<ul>hello</ul>} />
      <SidebarContainer>
        <FormCard cardTitle={"trans"}></FormCard>
      </SidebarContainer>
    </>
  );
};
