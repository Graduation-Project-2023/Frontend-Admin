import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";
import cookies from "js-cookie";
import { useAuth } from "../../../../hooks/useAuth";
import { FormCard } from "../../../../components/forms/FormCard";

export const CoursesRegisteration = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const currentLanguageCode = cookies.get("i18next") || "en";
  const authContext = useAuth();

  useEffect(() => {
    axios
      .get(BASE_URL + `/courses?college_id=${authContext.college.id}`)
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredCourses(
      courses.filter((item) => {
        return item.arabicName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      })
    );
    // eslint-disable-next-line
  }, [searchValue]);

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
        <FormCard>
          <Accordion
            defaultActiveKey="0"
            alwaysOpen
            className="collapseSection"
          >
            {Levels.map((item) => {
              return (
                <Accordion.Item
                  eventKey={Levels.length === 1 ? "0" : `${item.id}`}
                  key={item.id}
                >
                  <Accordion.Header>{item.title}</Accordion.Header>
                  <Accordion.Body>
                    <div className="portal-body">
                      <h5 className="portal-title">
                        {t("adminNavbarkeys.choose")}
                      </h5>
                      <div className="portal-search">
                        <input
                          type="text"
                          className="form-control "
                          onChange={(e) => setSearchValue(e.target.value)}
                          value={searchValue}
                          placeholder={t("courses.name")}
                        />
                      </div>
                      <div className="portal-list">
                        {filteredCourses.map((item) => {
                          return (
                            <li key={item.id}>
                              {currentLanguageCode === "en"
                                ? item.englishName
                                : item.arabicName}
                            </li>
                          );
                        })}
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </FormCard>
      </FormNavbarContainer>
    </div>
  );
};
