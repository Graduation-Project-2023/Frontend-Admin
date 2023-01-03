import { FaRobot } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { CommonPage } from "../components/other/CommonPage";

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <CommonPage
      icon={<FaRobot />}
      mainText={t("common.notfound_main")}
      secondaryText={t("common.notfound_secondary")}
      btnText={t("common.notfound_button")}
      navigateTo={"/admin/login"}
    />
  );
};
