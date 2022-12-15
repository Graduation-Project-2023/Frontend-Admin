import React from "react";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FormCard } from "../../../../components/forms/FormCard";

export const RegisterationPortal = () => {
  const { t } = useTranslation();

  const Levels = [
    {
      id: 1,
      title: "Level 1",
    },
    {
      id: 2,
      title: "Level 1",
    },
    {
      id: 3,
      title: "Level 1",
    },
    {
      id: 4,
      title: "Level 1",
    },
  ];
  const student = [
    {
      id: 1,
      title: "bob",
    },
    {
      id: 2,
      title: "john",
    },
    {
      id: 3,
      title: "layla",
    },
    {
      id: 4,
      title: "yasmeen",
    },
    {
      id: 5,
      title: "malak",
    },
    {
      id: 6,
      title: "malak",
    },
    {
      id: 7,
      title: "malak",
    },
    {
      id: 8,
      title: "malak",
    },
    {
      id: 9,
      title: "malak",
    },
    {
      id: 10,
      title: "malak",
    },
    {
      id: 11,
      title: "malak",
    },
    {
      id: 12,
      title: "malak",
    },
  ];

  return (
    <div className="container">
      <div className="registerationContainer">
        <h1>{t(`registeration.formhead`)}</h1>

        <Accordion
          defaultActiveKey={["0"]}
          alwaysOpen
          className="collapseSection"
        >
          {Levels.map((item) => {
            return (
              <Accordion.Item eventKey={item.id} key={item.id}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body>
                  <div className="registerationContainer-body">
                    <div className="registerationContainer-menu">
                      <h3>{t(`registeration.menu`)}</h3>
                      <div className="registerationContainer-menu-search">
                        <input
                          type="text"
                          placeholder={t("registeration.search")}
                        />
                      </div>
                      <div className="registerationContainer-menu-list">
                        {student.map((item) => (
                          <li key={item.id}>{item.title}</li>
                        ))}
                      </div>
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
          })}
        </Accordion>
      </div>
    </div>
  );
};
