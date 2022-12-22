import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import cookies from "js-cookie";
import { AiOutlineClose } from "react-icons/ai";

// Reusable Components
import Modal from "react-bootstrap/Modal";

// Component Props:
// title: string
// error: object {state, message}
// searchable: boolean (if there is a search bar)
// list: {state, data, path}
// form: {state, children} (not a self-closing tag)
// message: { state, icon: tag, title, text, button, handleClick}

export const ModalPopup = (props) => {
  const listData = props.list?.data;
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const authContext = useAuth();
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    setFilteredData(props.list?.data);
  }, [props.list?.data]);

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
      {props.title && (
        <Modal.Header className="popup-header">
          <button className="popup-close" onClick={hideModal}>
            <AiOutlineClose />
          </button>
          <Modal.Title className="popup-title">{t(props.title)}</Modal.Title>
          {props.searchable && filteredData.length > 0 && (
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder={t("common.search")}
              className="popup-search form-control"
            />
          )}
        </Modal.Header>
      )}
      <Modal.Body>
        {!props.title && (
          <button
            className={`popup-close ${props.error ? "popup-close-error" : ""}`}
            onClick={hideModal}
          >
            <AiOutlineClose />
          </button>
        )}
        {props.list?.state &&
          (filteredData.length === 0 ? (
            props.error.state ? (
              <h1>there is an error</h1>
            ) : (
              <h1>list loading</h1>
            )
          ) : (
            <div className="popup-list">
              {filteredData.map((item) => {
                return (
                  <Link
                    key={item.id}
                    onClick={() => {
                      authContext.changeCollege(item);
                    }}
                    to={props.list.path}
                  >
                    {currentLanguageCode === "en"
                      ? item.englishName
                      : item.arabicName}
                  </Link>
                );
              })}
            </div>
          ))}
        {props.form?.state && <>{props.children}</>}
        {props.message?.state && (
          <div className="popup-msg">
            <div
              className={`popup-msg-icon ${
                props.error ? "popup-msg-icon-error" : ""
              }`}
            >
              {props.message.icon}
            </div>
            <h4 className="popup-msg-title">{t(props.message.title)}</h4>
            <h5 className="popup-msg-text">{t(props.message.text)}</h5>
            <button
              className={`popup-msg-button ${
                props.error ? "popup-msg-button-error" : ""
              }`}
              onClick={props.message.handleClick}
            >
              {t(props.message.button)}
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};
