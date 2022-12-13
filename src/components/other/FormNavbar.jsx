import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const FormNavbar = (props) => {
  const { t } = useTranslation();
  return (
    <nav className="form-navbar">
      {props.headerData.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) => (isActive ? "form-navbar-active" : "")}
        >
          {t(item.title)}
        </NavLink>
      ))}
    </nav>
  );
};
