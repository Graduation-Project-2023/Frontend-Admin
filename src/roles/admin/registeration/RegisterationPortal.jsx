import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styles from "./RegisterationPortal.module.scss";
import { NoData } from "../../../components/UX/NoData";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ADMIN_URL } from "../../../shared/API";

export const RegisterationPortal = () => {
  const { t } = useTranslation();
  const [student, setStudent] = useState([]);
  const { programId } = useParams();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    axios
      .get(ADMIN_URL + `/programs/${programId}/levels`, config)
      .then((res) => {
        setLevels(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setUserUX((prev) => ({ ...prev, loading: true }));
    axios
      .get(ADMIN_URL + `/student/program/${authContext.program.id}`, config)

      .then((res) => {
        console.log(res);
        setStudent(res.data);
        setUserUX((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          loading: false,
          error: true,
          errorMsg: "erorr getting students",
        }));
      });
    // eslint-disable-next-line
  }, []);

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
            {levels.length > 0 ? (
              levels.map((item) => {
                return (
                  <Accordion.Item eventKey={item.id} key={item.id}>
                    <Accordion.Header>{item.englishName}</Accordion.Header>
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
