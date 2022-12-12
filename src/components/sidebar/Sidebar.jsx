import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import cookies from "js-cookie";

export const Sidebar = (props) => {
  const sidebarData = props.sideData;
  const [searchValue, setSearchValue] = useState("");
  const [filteredMenu, setFilteredMenu] = useState([]);
  const currentLanguageCode = cookies.get("i18next") || "en";
  const { t } = useTranslation();

  useEffect(() => {
    setFilteredMenu(props.sideData);
  }, [props.sideData]);

  useEffect(() => {
    setFilteredMenu(
      sidebarData.filter(
        (item) =>
          item.id?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.code?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.englishName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.arabicName?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <nav className="sidebar">
      <div className="sidebar-title">
        <h2>{t(props.sidebarTitle)}</h2>
        <div className="sidebar-title-options">{props.options}</div>
      </div>

      {props.searchable && (
        <div className="sidebar-search">
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder={t(props.inputPlaceholder)}
          />
        </div>
      )}
      <div className="sidebar-list">
        {filteredMenu.map((item) => {
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
      </div>
    </nav>
  );
};
