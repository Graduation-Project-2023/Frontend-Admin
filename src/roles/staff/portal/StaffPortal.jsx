import { useTranslation } from "react-i18next";
import React, {useState ,useEffect } from "react";
import arab from "./arab.png";
import eng from "./eng.png";
import { FaBookReader ,FaAddressBook ,FaTable ,FaBook} from "react-icons/fa";

export const StaffPortal = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  let arabStyle = {backgroundImage: "url(" + arab + ")"};
  let engStyle = {backgroundImage: "url(" + eng + ")"};


  return <div className="container">
    <div className="staffcont">
      <div className="staffcont-upperhalf" style={ i18n.language === "ar" ? arabStyle : engStyle}> 
        <div className="staffcont-upperhalf-text">
          <h1>{t(`staff.welcome1`)}</h1>
           <h2>{t(`staff.welcome2`)}</h2>
           <h3>{t(`staff.welcome3`)}</h3>
        </div>
      </div>
      <div className="staffcont-lowerhalf">
        <div className="staffcont-lowerhalf-card">
            <span><FaAddressBook style={{fontSize: '2vw'}}/></span>
            <h5>{t(`staff.transcript`)}</h5>
        </div>
        <div className="staffcont-lowerhalf-card">
          <span><FaBookReader style={{fontSize: '2vw'}}/></span>
          <h5>{t(`staff.grades`)}</h5>
        </div>
        <div className="staffcont-lowerhalf-card">
          <span><FaTable style={{fontSize: '2vw'}}/></span>
          <h5>{t(`staff.schedule`)}</h5>
        </div>
        <div className="staffcont-lowerhalf-card">
          <span>< FaBook style={{fontSize: '2vw'}}/></span>
          <h5>{t(`staff.bank`)}</h5>  
        </div>
      </div>
    </div>
  </div>;
};
