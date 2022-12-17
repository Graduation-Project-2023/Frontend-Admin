import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaPlusCircle } from "react-icons/fa";
import cookies from "js-cookie";

export const SearchContainer = (props) => {
  const listData = props.listData;
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState(listData);
  const currentLanguageCode = cookies.get("i18next") || "en";
  const { t } = useTranslation();

  useEffect(() => {
    setFilteredList(
      listData.filter(
        (item) =>
          item.englishName.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.arabicName.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  useEffect(() => {
    setFilteredList(listData);
    // eslint-disable-next-line
  }, [listData]);
  return (
    <div className="portal-body">
      {!props.listLoading && filteredList.length === 0 ? (
        <h5 className="d-flex justify-content-center portal-title">
          {t(props.emptyListPlaceholder)}
        </h5>
      ) : (
        <h5 className="portal-title">{t(props.title)}</h5>
      )}

      {!props.listLoading &&
        (filteredList.length === 0 ? (
          ""
        ) : (
          <div className="portal-search">
            <input
              type="text"
              className="form-control "
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder={t(props.placeholder)}
            />
          </div>
        ))}

      <div className="portal-fixed">
        {props.fixedFirstList?.state && (
          <li
            onClick={(event) => {
              props.fixedFirstList.handleClick();
            }}
          >
            {t(props.fixedFirstList.title)}
            <FaPlusCircle style={{ margin: "10px" }} />
          </li>
        )}
        {props.listLoading ? (
          <div>list with search loading component</div>
        ) : (
          <div className="portal-list">
            {filteredList.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={(event) => {
                    props.handleListClick(item);
                  }}
                >
                  {currentLanguageCode === "en"
                    ? item.englishName
                    : item.arabicName}
                </li>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
