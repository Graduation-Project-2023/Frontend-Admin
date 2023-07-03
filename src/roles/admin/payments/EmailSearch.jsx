import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";

export const EmailSearch = ({
  emails,
  dropDownTitle,
  inputPlaceholder,
  handleListClick,
}) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [filteredMenu, setFilteredMenu] = useState([]);

  useEffect(() => {
    setFilteredMenu(emails);
  }, [emails]);

  useEffect(() => {
    setFilteredMenu(
      emails.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <Dropdown className="progCourses paymentSearch" autoClose={true}>
      <Dropdown.Toggle id="dropdown-autoclose-true">
        {dropDownTitle || t("common.studentEmails")}
      </Dropdown.Toggle>

      <Dropdown.Menu className="progCourses_menu">
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder={t(inputPlaceholder)}
          className="form-control"
        />
        <ul className="progCourses_menu_searchList">
          {filteredMenu?.map((item) => {
            return (
              <Dropdown.Item
                key={item}
                onClick={(event) => {
                  handleListClick(item);
                }}
              >
                <div>
                  <span>{item}</span>
                </div>
              </Dropdown.Item>
            );
          })}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};
