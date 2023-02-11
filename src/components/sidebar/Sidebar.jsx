import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import i18next from "i18next";
import { NoData } from "../UX/NoData";
import { NoSearch } from "../UX/NoSearch";

export const Sidebar = (props) => {
  const sidebarData = props.sideData;
  const [searchValue, setSearchValue] = useState("");
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [userUX, setUserUX] = useState({
    loading: true,
    error: true,
    errorMsg: "",
  });
  const { t } = useTranslation();

  useEffect(() => {
    setFilteredMenu(props.sideData);
  }, [props.sideData]);

  useEffect(() => {
    setUserUX(props.userUX);
  }, [props.userUX]);

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
      <ul className="sidebar-list">
        {filteredMenu.length === 0 ? (
          userUX.loading ? (
            <h1>list is loading</h1>
          ) : userUX.error ? (
            <h1>{userUX.errorMsg}</h1>
          ) : sidebarData.length === 0 ? (
            <NoData />
          ) : (
            <NoSearch />
          )
        ) : (
          filteredMenu.map((item) => {
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
                          i18next.language === "en"
                            ? item.englishName
                            : item.arabicName
                        }`
                      : `${t(item.title)}`}
                  </NavLink>
                ) : (
                  <Link to={item.path}>
                    {props.backendData
                      ? `${
                          i18next.language === "en"
                            ? item.englishName
                            : item.arabicName
                        }`
                      : `${t(item.title)}`}
                  </Link>
                )}
              </li>
            );
          })
        )}
      </ul>
    </nav>
  );
};
