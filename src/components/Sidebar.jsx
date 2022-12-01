import { useTranslation } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import cookies from "js-cookie";

export const Sidebar = (props) => {
  const sidebarData = props.sideData;
  const currentLanguageCode = cookies.get("i18next") || "en";
  const { t } = useTranslation();
  return (
    <nav className="sidebar">
      <div className="sidebar-title">
        <h2>{t(props.sidebarTitle)}</h2>
        <div className="sidebar-title-options">{props.options}</div>
      </div>
      <div className="sidebar-list">
        <ul>
          {sidebarData.map((item) => {
            return (
              <li key={item.id}>
                {props.activeNav ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "sidebar-list-active" : ""
                    }
                  >
                    {props.backendData
                      ? `${
                          currentLanguageCode === "en"
                            ? item.englishName
                            : item.arabicName
                        }`
                      : `${t(item.title)}`}
                  </NavLink>
                ) : (
                  <Link to={item.path}>
                    {props.backendData
                      ? `${
                          currentLanguageCode === "en"
                            ? item.englishName
                            : item.arabicName
                        }`
                      : `${t(item.title)}`}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
