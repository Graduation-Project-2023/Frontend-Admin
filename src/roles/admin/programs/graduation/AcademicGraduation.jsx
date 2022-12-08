import { SidebarContainer } from "../../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../../components/forms/FormCard";
import { useTranslation } from "react-i18next";

export const AcademicGraduation = () => {
  const { t } = useTranslation();
  return (
    <SidebarContainer>
      <FormCard>
        <h1 className="text-center">{t(`common.future`)}</h1>
      </FormCard>
    </SidebarContainer>
  );
};
