import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18next from "i18next";
import cookies from "js-cookie";
import classNames from "classnames";
import logo from "../shared/images/header-logo.jpeg";
import { Dropdown } from "react-bootstrap";

const languages = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
  },
];

export const NOOOOOO = () => {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find(
    (lang) => lang.code === currentLanguageCode
  );
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("common.app_title");
  }, [currentLanguage, t]);

  return (
    <div className="navpage">
      <nav className="navbar navbar-expand-lg bg-light navpage">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse header"
            id="navbarTogglerDemo01"
          >
            <div className="navbar-brand">
              <img className="header-logo" src={logo} alt="logo" />
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle header-items"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("header.registeration")}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Action
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle header-items"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("header.about")}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Action
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle header-items"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("header.academic")}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Action
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="header-language">
              <div className="language-select-root">
                <div className="dropdown">
                  <button
                    className=" dropdown-toggle header-language-button"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {t("header.title")}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <span className="dropdown-item-text">
                        {t("header.language")}
                      </span>
                    </li>
                    {languages.map(({ code, name }) => (
                      <li key={code}>
                        <span
                          className={classNames("dropdown-item", {
                            disabled: currentLanguageCode === code,
                          })}
                          onClick={() => {
                            i18next.changeLanguage(code);
                          }}
                        >
                          {name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="header-login">
              <Link className="header-login-title" to="/login">
                {t("common.login")}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
