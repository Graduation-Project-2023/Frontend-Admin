import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

// Reusable Components
import { NoData } from "../UX/NoData";
import { NoSearch } from "../UX/NoSearch";
import { SpinnerLoader } from "../loaders/SpinnerLoader";

// Component Props:
// title: string
// listData: array of objects
// inputPlaceholder: string
// emptyPlaceholder: string
// userUX: object {loading, error, errorMsg}
// fixedFirstList: object {state, children}
// handleListClick: function

export const SearchContainer = (props) => {
  const listData = props.listData;
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState(listData);
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const { t } = useTranslation();

  useEffect(() => {
    setFilteredList(
      listData.filter(
        (item) =>
          item?.englishName
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item?.arabicName?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  useEffect(() => {
    setFilteredList(listData);
  }, [listData]);

  useEffect(() => {
    setUserUX(props.userUX);
  }, [props.userUX]);

  return (
    <div className="portal-body">
      {listData.length === 0 ? (
        userUX.loading ? (
          <h5 className="portal-title">{t(props.title)}</h5>
        ) : userUX.error ? (
          <h5 className="d-flex justify-content-center portal-title">
            {userUX.errorMsg}
          </h5>
        ) : (
          <NoData />
        )
      ) : (
        <h5 className="portal-title">{t(props.title)}</h5>
      )}

      {!userUX.loading && listData.length !== 0 && !userUX.error && (
        <div className="portal-search">
          <input
            type="text"
            className="form-control "
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder={t(props.inputPlaceholder)}
          />
        </div>
      )}

      <div className="portal-fixed">
        {props.fixedFirstList?.state && props.fixedFirstList?.children}

        {userUX.loading ? (
          <SpinnerLoader size={"80px"} heigth={"250px"} />
        ) : (
          <div className="portal-list">
            {filteredList.length === 0
              ? listData.length !== 0 && <NoSearch />
              : filteredList.map((item) => {
                  return (
                    <li
                      key={item.id}
                      onClick={(event) => {
                        props.handleListClick(item);
                      }}
                    >
                      {i18next.language === "en"
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
