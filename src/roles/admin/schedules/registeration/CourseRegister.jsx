import { useEffect, useState } from "react";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";
import { Accordion } from "react-bootstrap";
import { useAuth } from "../../../../hooks/useAuth";
import cookies from "js-cookie";

export const CourseRegister = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const authContext = useAuth();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    axios
      .get(BASE_URL + `/courses?college_id=${authContext.college.id}`)
      .then((res) => {
        setCourses(res.data);
      });
  }, []);

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
    {
      id: 5,
      title: "Level 5",
    },
  ];

  return (
    <div className="container">
      <FormNavbarContainer>
        <div className="registerationContainer-body">
          <div className="registerationContainer-menu">
            <h3>{t(`adminNavbar.academic`)}</h3>
            <div className="registerationContainer-menu-search">
              <input type="text" placeholder={t("courses.name")} />
            </div>

            <Accordion
              defaultActiveKey="0"
              alwaysOpen
              className="registerationContainer-menu-collapse"
            >
              {Levels.map((item) => (
                <Accordion.Item
                  eventKey={item.id}
                  key={item.id}
                  className="registerationContainer-menu-collapse-item"
                >
                  <Accordion.Header>{item.title}</Accordion.Header>

                  <Accordion.Body
                    className="registerationContainer-menu-list"
                    style={{ padding: "0" }}
                  >
                    {courses.map((item) => (
                      <li key={item.id}>
                        {currentLanguageCode === "en"
                          ? item.englishName
                          : item.arabicName}
                      </li>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
          <div className="registerationContainer-form">
            <h3>Physics</h3>
            <form>
              <div className="registerationContainer-form-inputs">
                <div className="row mb-4">
                  <label className="col-sm-4 col-form-label">
                    {t(`courses.name`)}
                  </label>
                  <div className="col-sm-8">
                    <input className="form-control" />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-4 col-form-label">
                    {t(`courses.code`)}
                  </label>
                  <div className="col-sm-8">
                    <input className="form-control" />
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
      </FormNavbarContainer>
    </div>
  );
};
