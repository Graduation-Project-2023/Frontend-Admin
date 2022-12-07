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
      <label className="col-sm-2 col-form-label">{t(props.label)}</label>
      <div className="col-sm-4">
        <Dropdown className="progCourses" autoClose={true}>
          <Dropdown.Toggle id="dropdown-autoclose-true">
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
                  ><div>
                   <span> {item.code} </span>
                    <span>{currentLanguageCode === "en"
                      ? item.englishName
                      : item.arabicName}</span>
                      </div>
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
