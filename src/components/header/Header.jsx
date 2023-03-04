import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import i18next from "i18next";
import classNames from "classnames";
import axios from "axios";
import { BASE_URL, ADMIN_URL } from "../../shared/API";

// Reusable Components
import { ModalPopup } from "../popups/ModalPopup";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { BiWorld } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const languages = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
  },
];

export const Header = () => {
  const [colleges, setColleges] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [userUX, setUserUX] = useState({
    colleges: { loading: false, error: false, errorMsg: "" },
    programs: { loading: false, error: false, errorMsg: "" },
    logout: { loading: false, error: false, errorMsg: "" },
  });
  const [showModal, setShowModal] = useState({
    colleges: false,
    programs: false,
  });
  const location = useLocation();
  const { t } = useTranslation();
  const authContext = useAuth();
  const currentLanguage = languages.find(
    (lang) => lang.code === i18next.language
  );

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("common.app_title");
  }, [currentLanguage, t]);

  const handleLogout = () => {
    setUserUX((prev) => ({
      ...prev,
      logout: { loading: true, error: false, errorMsg: "" },
    }));
    axios
      .post(BASE_URL + "/auth/logout")
      .then((res) => {
        console.log(res);
        authContext.logout();
        setUserUX((prev) => ({
          ...prev,
          logout: { loading: false, error: false, errorMsg: "" },
        }));
      })
      .catch((error) => {
        setUserUX((prev) => ({
          ...prev,
          logout: {
            loading: false,
            error: true,
            errorMsg: error.response.data.message,
          },
        }));
        console.log(error);
      });
  };

  const getColleges = () => {
    setUserUX((prev) => ({
      ...prev,
      colleges: { loading: true, error: false, errorMsg: "" },
    }));
    setShowModal({ colleges: true, programs: false });

    axios
      .get(ADMIN_URL + "/colleges")
      .then((res) => {
        console.log(res.data);
        setUserUX((prev) => ({
          ...prev,
          colleges: { loading: false, error: false, errorMsg: "" },
        }));
        setColleges(res.data);
        setShowModal((prev) => ({ ...prev, colleges: true }));
      })
      .catch((error) => {
        setUserUX((prev) => ({
          ...prev,
          colleges: {
            loading: false,
            error: true,
            errorMsg: "colleges error",
          },
        }));
        console.log(error);
      });
  };

  const getPrograms = () => {
    setUserUX((prev) => ({
      ...prev,
      programs: { loading: true, error: false, errorMsg: "" },
    }));
    setShowModal({ colleges: false, programs: true });

    axios
      .get(ADMIN_URL + `/programs?college_id=${authContext.college?.id}`)
      .then((res) => {
        console.log(res.data);
        setUserUX((prev) => ({
          ...prev,
          programs: { loading: false, error: false, errorMsg: "" },
        }));
        setPrograms(res.data);
        setShowModal((prev) => ({ ...prev, programs: true }));
      })
      .catch((error) => {
        setUserUX((prev) => ({
          ...prev,
          programs: {
            loading: false,
            error: true,
            errorMsg: "programs error",
          },
        }));
        console.log(error);
      });
  };

  return (
    <>
      <nav className="main-header">
        <div className="main-header-item">
          {authContext.isLoggedIn && (
            <Dropdown>
              <Dropdown.Toggle>
                <CgProfile size={30} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <DropdownItem>{t("header.profile")}</DropdownItem>
                <DropdownItem onClick={getPrograms}>
                  {t("header.changeProgram")}
                </DropdownItem>
                <DropdownItem onClick={getColleges}>
                  {t("header.changeCollege")}
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  {t("header.changeTerm")}
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  {t("common.logout")}
                </DropdownItem>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <div className="main-header-item">
          {t("header.uni")}
          {authContext.college?.id && ` - `}
          {i18next.language === "en"
            ? authContext.college?.englishName
            : authContext.college?.arabicName}
        </div>
        <div className="main-header-item">
          {authContext.isLoggedIn && (
            <Dropdown>
              <Dropdown.Toggle>
                <BiWorld size={30} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>{t("common.language")}</Dropdown.Item>
                {languages.map(({ code, name }) => (
                  <Dropdown.Item key={code}>
                    <span
                      className={classNames("dropdown-item", {
                        disabled: i18next.language === code,
                      })}
                      onClick={() => {
                        i18next.changeLanguage(code);
                      }}
                    >
                      {name}
                    </span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </nav>
      {/* Change College Modal */}
      {showModal.colleges && (
        <ModalPopup
          error={{
            state: userUX.colleges.error,
            message: userUX.colleges.errorMsg,
          }}
          contextValue={"COLLEGE"}
          title={"header.changeCollege"}
          searchable={true}
          list={{
            state: true,
            data: colleges,
            path: "admin/academic_programs",
          }}
          closeModal={() => {
            setShowModal({ colleges: false, programs: false });
          }}
        />
      )}
      {/* Change Program Modal */}
      {showModal.programs && (
        <ModalPopup
          error={{
            state: userUX.programs.error,
            message: userUX.programs.errorMsg,
          }}
          title={"header.changeProgram"}
          contextValue={"PROGRAM"}
          searchable={true}
          list={{ state: true, data: programs, path: location.pathname }}
          closeModal={() => {
            setShowModal({ colleges: false, programs: false });
          }}
        />
      )}
    </>
  );
};
