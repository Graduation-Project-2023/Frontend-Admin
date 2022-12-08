import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TbArrowBearRight } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { CommonPage } from "../components/other/CommonPage";

export const Redirecting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  useEffect(() => {
    const param = location.search.substring(1);

    setTimeout(() => {
      navigate(param);
    }, 2000);
  });

  return (
    <CommonPage
      icon={<TbArrowBearRight />}
      mainText={t(`common.redirecting_main`)}
      secondaryText={t(`common.unauthorized_secondary`)}
      loader={true}
    />
  );
};
