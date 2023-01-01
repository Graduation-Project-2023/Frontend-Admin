import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbBan } from "react-icons/tb";
import { CommonPage } from "../components/other/CommonPage";
import { useTranslation } from "react-i18next";

export const Unauthorized = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  });

  return (
    <CommonPage
      icon={<TbBan />}
      mainText={t(`common.unauthorized_main`)}
      secondaryText={t(`common.unauthorized_secondary`)}
      loader={true}
    />
  );
};
