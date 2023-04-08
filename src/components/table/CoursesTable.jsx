import React from "react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBackLine } from "react-icons/ri";

export const CoursesTable = (props) => {
  const { t } = useTranslation();
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    erroeMsg: "",
  });
  useEffect(() => {
    setUserUX(props.userUX);
  }, [props.userUX]);

  return (
    <div className="table-container">
      <h3>{t(props.tableTitle)}</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            {props.headerItems.map((item) => {
              return (
                <th key={item.id} className="table-container-header">
                  {item.title}
                </th>
              );
            })}
            <th className="table-container-header">{t(`common.edit`)}</th>
            <th className="table-container-header">{t(`common.delete`)}</th>
          </tr>
        </thead>
        {userUX.error && userUX.errorMsg}
        {userUX.loading ? (
          "loading...'"
        ) : (
          <tbody>
            <tr>
              <td className="table-container-items">Mark</td>

              <td className="table-container-items">
                <CiEdit
                  color="#858D97"
                  className="table-container-items-icon"
                />
              </td>
              <td className="table-container-items">
                <RiDeleteBackLine
                  color="#D65050"
                  className="table-container-items-icon"
                />
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
