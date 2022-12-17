import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

// Reusable Components
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { DropdownSearch } from "../../../../components/forms/DropdownSearch";

export const TablePopup = (props) => {
  const cellData = props.cellData;
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(cellData);
    props.submit();
  };
  return (
    <ModalPopup
      title={props.title}
      closeModal={() => {
        props.close();
      }}
      child={true}
    >
      <form
        onSubmit={(event) => {
          handleFormSubmit(event);
        }}
      >
        <div class="row">
          <div class="form-group col-md-6">
            <label>{t(`el yooom`)}</label>
            <input
              type="text"
              class="form-control"
              name="day"
              value={t(cellData.cellData.day)}
              disabled
              readOnly
            />
          </div>
          <div class="form-group col-md-6">
            <label>{t(`el mkaan`)}</label>
            <select name="place" class="form-select">
              <option value="1">{t(`el mkaan`)}</option>
              <option value="2">{t(`el mkaan`)}</option>
              <option value="3">{t(`el mkaan`)}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-6">
            <DropdownSearch
              name={{ arabicName: "da esm el mada" }}
              menuData={[]}
              label={"esm mada"}
              inputPlaceholder={"ektb esm el mada"}
            />
            <label>{t(`el yooom`)}</label>
            <input
              type="text"
              class="form-control"
              name="day"
              value={t(cellData.cellData.day)}
              disabled
              readOnly
            />
          </div>
          <div class="form-group col-md-6">
            <label>{t(`el mkaan`)}</label>
            <select name="place" class="form-select">
              <option value="1">{t(`el mkaan`)}</option>
              <option value="2">{t(`el mkaan`)}</option>
              <option value="3">{t(`el mkaan`)}</option>
            </select>
          </div>
        </div>
        <div
          className="btn btn-primary"
          // onClick={TestingAddSubject}
        >
          <button type="submit">Add Subject Here</button>
        </div>
      </form>
    </ModalPopup>
  );
};
