import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import i18next from "i18next";
import classNames from "classnames";

// Reusable Components
import { Dropdown } from "react-bootstrap";
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
  const currentLanguage = languages.find(
    (lang) => lang.code === i18next.language
  );

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("common.app_title");
  }, [currentLanguage, t]);

  return (
    <nav className="main-header">
      <div className="main-header-item">
        {authContext.isLoggedIn && (
          <>
            {/* <FaRegUserCircle /> */}
            <button
              className="btn btn-primary"
              onClick={() => {
                authContext.logout();
              }}
            >
              {t("common.logout")}
            </button>
          </>
        )}
      </div>
      <div className="main-header-item">
        {t("header.uni")}
        {authContext.college?.id && ` - `}
        {i18next.language === "en"
          ? authContext.college?.englishName
          : authContext.college?.arabicName}
      </div>
      <div className="main-header-item">
        {authContext.isLoggedIn && (
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {t("header.title")}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>{t("common.language")}</Dropdown.Item>
              {languages.map(({ code, name }) => (
                <Dropdown.Item key={code}>
                  <span
                    className={classNames("dropdown-item", {
                      disabled: i18next.language === code,
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
        )}
      </div>
    </nav>
  );
};
