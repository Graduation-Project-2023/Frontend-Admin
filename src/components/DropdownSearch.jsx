import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import cookies from "js-cookie";

export const DropdownSearch = (props) => {
  const menuData = props.menuData;
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [filteredMenu, setFilteredMenu] = useState(menuData);
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    setFilteredMenu(
      menuData.filter(
        (item) =>
          item.code?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.englishName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.arabicName?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <>
      <label className="col-sm-1 col-form-label">{t(props.label)}</label>
      <div className="col-sm-5">
        <Dropdown className="progCourses">
          <Dropdown.Toggle id="dropdown-basic">
            {props.specialData?.code || t("choose a course code")}
          </Dropdown.Toggle>

          <Dropdown.Menu className="progCourses_menu">
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder={t(props.inputPlaceholder)}
              className="form-control"
            />
            <ul className="progCourses_menu_searchList">
              {filteredMenu.map((item) => {
                return (
                  <li
                    key={item.id}
                    onClick={(event) => {
                      props.handleListClick(item);
                    }}
                  >
                    {item.code} -
                    {currentLanguageCode === "en"
                      ? item.englishName
                      : item.arabicName}
                  </li>
                );
              })}
            </ul>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};
