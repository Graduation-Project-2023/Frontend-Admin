import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import cookies from "js-cookie";

// Component Props:
// listData: object {type: string ,data: array of objects}
// inputPlaceholder: object {state, message}
// error: object {state, message}

export const DropdownSearch = (props) => {
  const { t } = useTranslation();
  const [listData, setListData] = useState({ title: "", data: [] });
  const [searchValue, setSearchValue] = useState("");
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [userUX, setUserUX] = useState({ state: false, message: "" });
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    setListData(props.listData);
  }, [props.listData]);

  useEffect(() => {
    setFilteredMenu(props.listData.data);
  }, [props.listData.data]);

  useEffect(() => {
    setUserUX(props.userUX);
  }, [props.userUX]);

  useEffect(() => {
    setFilteredMenu(
      listData.data.filter(
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
    <Dropdown className="progCourses" autoClose={true}>
      <Dropdown.Toggle id="dropdown-autoclose-true">
        {listData?.type === "courseWithCode" &&
          (props.dropDownTitle?.id || t("courses.chooseCode"))}
        {listData?.type === "tableSelectCourse" &&
          (currentLanguageCode === "en"
            ? props.dropDownTitle?.englishName || t("common.select")
            : props.dropDownTitle?.arabicName || t("common.select"))}
        {(listData?.type === "selectCourse" || listData?.type === "") &&
          t("common.select")}
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
              <Dropdown.Item
                key={item.id ? item.id : item.code}
                onClick={(event) => {
                  props.handleListClick(item);
                }}
              >
                <div>
                  {listData?.type === "courseWithCode" && (
                    <span>{item.id}</span>
                  )}
                  {listData?.type === "selectCourse" && (
                    <span>{item.code}</span>
                  )}
                  <span>
                    {currentLanguageCode === "en"
                      ? item.englishName
                      : item.arabicName}
                  </span>
                </div>
              </Dropdown.Item>
            );
          })}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};
