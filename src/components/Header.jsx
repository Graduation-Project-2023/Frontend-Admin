import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";
import i18next from "i18next";
import cookies from "js-cookie";
import classNames from "classnames";
import { Dropdown } from "react-bootstrap";
import { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";

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

export const Header = () => {
  const { t } = useTranslation();
  const authContext = useAuth();

  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find(
    (lang) => lang.code === currentLanguageCode
  );

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("common.app_title");
  }, [currentLanguage, t]);

  return (
    <nav className="main-header">
      <div className="main-header-item">
        <FaRegUserCircle />
      </div>
      <div className="main-header-item">
        {t("header.uni")} {t("header.college")}
        {currentLanguageCode === "en"
          ? authContext.college.englishName
          : authContext.college.arabicName}
      </div>
      <div className="main-header-item">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {t("header.title")}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>{t("common.language")}</Dropdown.Item>
            {languages.map(({ code, name }) => (
              <Dropdown.Item key={code}>
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
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="dropdown">
          <ul className="dropdown-menu">
            <li>
              <span className="dropdown-item-text"></span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
