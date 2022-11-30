import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const Sidebar = (props) => {
  const sidebarData = props.sideData;
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
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "sidebar-list-active" : ""
                  }
                >
                  {t(item.title)}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
