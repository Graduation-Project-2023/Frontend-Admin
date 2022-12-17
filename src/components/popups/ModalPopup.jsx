import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import cookies from "js-cookie";
import Modal from "react-bootstrap/Modal";

export const ModalPopup = (props) => {
  const listData = props.popupList?.data;
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const authContext = useAuth();
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    setFilteredData(props.popupList?.data);
  }, [props.popupList?.data]);

  useEffect(() => {
    if (props.searchable) {
      setFilteredData(
        listData.filter(
          (item) =>
            item.englishName
              ?.toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item.arabicName?.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
    // eslint-disable-next-line
  }, [searchValue]);

  const hideModal = () => {
    props.closeModal();
  };

  return (
    <Modal show={true} onHide={hideModal} className="popup">
      <Modal.Header className="popup_header">
        <Modal.Title className="popup_title">{t(props.title)}</Modal.Title>
        <button className="popup_close" onClick={hideModal}>
          X
        </button>
        {props.searchable && (
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder={t("common.search")}
          />
        )}
      </Modal.Header>
      <Modal.Body>
        {props.popupList?.state && (
          <div className="popup_list">
            {filteredData.map((item) => {
              return (
                <Link
                  key={item.id}
                  onClick={() => {
                    authContext.changeCollege(item);
                  }}
                  to={props.popupList.path}
                >
                  {currentLanguageCode === "en"
                    ? item.englishName
                    : item.arabicName}
                </Link>
              );
            })}
          </div>
        )}
        {props.child && <>{props.children}</>}
      </Modal.Body>
    </Modal>
  );
};
