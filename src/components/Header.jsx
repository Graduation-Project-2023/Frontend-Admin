import React from 'react'
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';




export const Header = () => {
  const { t } = useTranslation();

  return (
   
    <div className='headerpage'>{t("adminNavbarkeys.text")}</div>
       
  )
}
