import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

export const Popup = (props) => {
  const [show, setShow] = useState(false);
  //   const [searchValue, setSearchValue] = useState("");
  //   const [filteredMenu, setFilteredMenu] = useState([]);
  const { t } = useTranslation();
  //   useEffect(() => {
  //     setFilteredMenu(props.menuData);
  //   }, [props.menuData]);
  //   useEffect(() => {
  //     setFilteredMenu(
  //       props.menuData.filter(
  //         (item) =>
  //           item.englishName?.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           item.arabicName?.toLowerCase().includes(searchValue.toLowerCase())
  //       )
  //     );
  //     // eslint-disable-next-line
  //   }, [searchValue]);

  return (
    <>
      <div
        className={props.className}
        onClick={() => {
          setShow(true);
        }}
      >
        {t(props.button)}
      </div>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        className="popup"
      >
        <Modal.Header className="popup_header">
          <Modal.Title className="popup_title">{t(props.title)}</Modal.Title>
          <button
            onClick={() => {
              setShow(false);
            }}
          >
            X
          </button>
          {props.searchItems && (
            <input
              type="text"
              //   onChange={(e) => setSearchValue(e.target.value)}
              //   value={searchValue}
              placeholder={t("common.search")}
            />
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="popup_list">{props.children}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};
