import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const HeaderNavbar = (props) => {
  const navData = props.data;
  const { t } = useTranslation();
  return (
    <nav className="header-navbar">
      <ul className="header-navbar-list">
        {navData.map((item) => {
          return (
            <li key={item.id}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "header-navbar-list-active" : ""
                }
                to={item.path}
              >
                {({ isActive }) =>
                  isActive ? t(`${item.title}`) : t(`${item.keyword}`)
                }
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
