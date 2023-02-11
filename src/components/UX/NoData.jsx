import React from "react";
import noData from "./Search.png";
import { useTranslation } from "react-i18next";

export const NoData = (prop) => {
  const { t } = useTranslation();
  return (
    <div className="noData">
      <img src={noData} alt="no data" />
      <h4>{t(`common.nodata`)}</h4>
    </div>
  );
};
