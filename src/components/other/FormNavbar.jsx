import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const FormNavbar = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <div className="container">
      <nav className="form-navbar">
        {props.headerData.map((item) => {
          if (location.pathname.split("/").pop() === item?.locationIndex) {
            return (
              <Link key={item.id} to={item.path} className="form-navbar-active">
                {t(item.title)}
              </Link>
            );
          } else {
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "form-navbar-active" : ""
                }
              >
                {t(item.title)}
              </NavLink>
            );
          }
        })}
      </nav>
    </div>
  );
};
