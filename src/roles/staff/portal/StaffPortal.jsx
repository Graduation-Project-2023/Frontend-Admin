import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
import { FaBookReader, FaAddressBook, FaTable, FaBook } from "react-icons/fa";
import arab from "./arab.png";
import eng from "./eng.png";

export const StaffPortal = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  let arabStyle = {
    backgroundImage: "url(" + arab + ")",
    backgroundSize: "contain",
  };
  let engStyle = {
    backgroundImage: "url(" + eng + ")",
    backgroundSize: "contain",
  };

  return (
    <div className="container">
      <div className="staffcont">
        <div
          className="staffcont-upperhalf"
          style={i18n.language === "ar" ? arabStyle : engStyle}
        >
          <div className="staffcont-upperhalf-text">
            <h1>{t(`staff.welcome1`)}</h1>
            <h2>{t(`staff.welcome2`)}</h2>
            <h3>{t(`staff.welcome3`)}</h3>
          </div>
        </div>
        <div className="staffcont-lowerhalf">
          <div
            className="staffcont-lowerhalf-card"
            onClick={() => {
              navigate("students_info");
            }}
          >
            <span>
              <FaAddressBook style={{ fontSize: "2vw" }} />
            </span>
            <h5>{t(`staff.transcript`)}</h5>
          </div>
          <div
            className="staffcont-lowerhalf-card"
            onClick={() => {
              navigate("coursework");
            }}
          >
            <span>
              <FaBookReader style={{ fontSize: "2vw" }} />
            </span>
            <h5>{t(`staff.grades`)}</h5>
          </div>
          <div
            className="staffcont-lowerhalf-card"
            onClick={() => {
              navigate("schedule");
            }}
          >
            <span>
              <FaTable style={{ fontSize: "2vw" }} />
            </span>
            <h5>{t(`staff.schedule`)}</h5>
          </div>
          <div
            className="staffcont-lowerhalf-card"
            onClick={() => {
              navigate("mcq");
            }}
          >
            <span>
              <FaBook style={{ fontSize: "2vw" }} />
            </span>
            <h5>{t(`staff.bank`)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
