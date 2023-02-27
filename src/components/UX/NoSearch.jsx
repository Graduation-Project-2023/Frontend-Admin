import React from "react";
import noData from "./Box.png";
import { useTranslation } from "react-i18next";

export const NoSearch = (prop) => {
  const { t } = useTranslation();
  return (
    <div className="noData">
      <img src={noData} alt="no data" />
      <h4>{t(`common.nosearch`)}</h4>
    </div>
  );
};
