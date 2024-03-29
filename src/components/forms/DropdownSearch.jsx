import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Dropdown from "react-bootstrap/Dropdown";
import { SpinnerLoader } from "../loaders/SpinnerLoader";

// Component Props:
// listData: object {type: string ,data: array of objects}
// inputPlaceholder: string
// userUX: object {loading, error, errorMsg}

export const DropdownSearch = (props) => {
  const { t } = useTranslation();
  const [listData, setListData] = useState({ title: "", data: [] });
  const [searchValue, setSearchValue] = useState("");
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });

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
          (i18next.language === "en"
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
          {listData.data.length === 0 ? (
            userUX.loading ? (
              <SpinnerLoader size={"80px"} heigth={"250px"} />
            ) : (
              userUX.error && (
                <h5 className="d-flex justify-content-center portal-title">
                  {t(userUX.errorMsg)}
                </h5>
              )
            )
          ) : (
            filteredMenu.map((item) => {
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
                      <span>{item?.code || item?.programCode}</span>
                    )}
                    <span>
                      {i18next.language === "en"
                        ? item.englishName
                        : item.arabicName}
                    </span>
                  </div>
                </Dropdown.Item>
              );
            })
          )}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};
