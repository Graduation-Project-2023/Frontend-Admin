import React from "react";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styles from "./RegisterationPortal.module.scss";
import { NoData } from "../../../components/NoData";

export const RegisterationPortal = () => {
  const { t } = useTranslation();

  const Levels = [
    {
      id: 1,
      title: "Level 1",
    },
    {
      id: 2,
      title: "Level 2",
    },
    {
      id: 3,
      title: "Level 3",
    },
    {
      id: 4,
      title: "Level 4",
    },
  ];
  const student = [
    // {
    //   id: 1,
    //   title: "bob",
    // },
    // {
    //   id: 2,
    //   title: "john",
    // },
    // {
    //   id: 3,
    //   title: "layla",
    // },
    // {
    //   id: 4,
    //   title: "yasmeen",
    // },
    // {
    //   id: 5,
    //   title: "malak",
    // },
    // {
    //   id: 6,
    //   title: "malak",
    // },
    // {
    //   id: 7,
    //   title: "malak",
    // },
    // {
    //   id: 8,
    //   title: "malak",
    // },
    // {
    //   id: 9,
    //   title: "malak",
    // },
    // {
    //   id: 10,
    //   title: "malak",
    // },
    // {
    //   id: 11,
    //   title: "malak",
    // },
    // {
    //   id: 12,
    //   title: "malak",
    // },
  ];

  return (
    <div className="container">
      <div className="registerationContainer">
        <h1>{t(`registeration.formhead`)}</h1>
        <div className="collapseSectionCard">
          <Accordion
            defaultActiveKey={["0"]}
            alwaysOpen
            className="collapseSection"
          >
            {Levels.length > 0 ? (
              Levels.map((item) => {
                return (
                  <Accordion.Item eventKey={item.id} key={item.id}>
                    <Accordion.Header>{item.title}</Accordion.Header>
                    <Accordion.Body>
                      <div className="registerationContainer-body">
                        <div
                          className={`registerationContainer-menu ${styles.studentList}`}
                        >
                          <h3>{t(`registeration.menu`)}</h3>
                          <div
                            className={`registerationContainer-menu-search ${styles.studentList_search}`}
                          >
                            <input
                              type="text"
                              placeholder={t("registeration.search")}
                            />
                          </div>

                          {student.length > 0 ? (
                            <div className="registerationContainer-menu-list">
                              {student.map((item) => (
                                <li key={item.id}>{item.title}</li>
                              ))}
                            </div>
                          ) : (
                            <NoData />
                          )}
                        </div>
                        <div className="registerationContainer-form">
                          <h3>{t(`registeration.form`)}</h3>
                          <form>
                            <div className="registerationContainer-form-inputs">
                              <div className="row mb-4">
                                <label className="col-sm-4 col-form-label">
                                  {t(`registeration.advisor`)}
                                </label>
                                <div className="col-sm-8">
                                  <input className="form-control" />
                                </div>
                              </div>
                              <div className="row mb-4">
                                <label className="col-sm-4 col-form-label">
                                  {t(`registeration.number`)}
                                </label>
                                <div className="col-sm-8">
                                  <input className="form-control" disabled />
                                </div>
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="form-card-button form-card-button-save"
                            >
                              {t(`common.save`)}
                            </button>
                            <button
                              type="reset"
                              className="form-card-button form-card-button-cancel"
                            >
                              {t(`common.cancel`)}
                            </button>
                          </form>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })
            ) : (
              <NoData />
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
