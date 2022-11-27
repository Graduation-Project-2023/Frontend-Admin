import React from "react";
import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { Navbar } from "../common/Navbar";
import { useTranslation } from "react-i18next";

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="common-cont">
          <div className="common-cont-icon">
            <FaRobot />
          </div>
          <div className="common-cont-text">
            <h1>{t('common.notfound_main')}</h1>
            <h3>{t('common.notfound_secondary')}</h3>
          </div>
          <div className="common-cont-btn">
            <Link to="/home">
              <button>{t('common.notfound_button')}</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
