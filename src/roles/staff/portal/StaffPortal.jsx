import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
import { FaBookReader, FaAddressBook, FaTable, FaBook } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import img1 from "./img1.png";
import img2 from "./img2.png";

export const StaffPortal = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  let arabimg = {};
  let engimg = { transform: "rotateY(180deg)" };

  const tabs = [
    {
      name: t(`staff.chat`),
      icon: <IoChatbubblesOutline style={{ fontSize: "2vw" }} />,
      link: "chat",
    },
    {
      name: t(`staff.bank`),
      icon: <FaBook style={{ fontSize: "2vw" }} />,
      link: "mcq",
    },
    {
      name: t(`staff.transcript`),
      icon: <FaAddressBook style={{ fontSize: "2vw" }} />,
      link: "students_info",
    },
    {
      name: t(`staff.grades`),
      icon: <FaBookReader style={{ fontSize: "2vw" }} />,
      link: "coursework",
    },
    {
      name: t(`staff.schedule`),
      icon: <FaTable style={{ fontSize: "2vw" }} />,
      link: "schedule",
    },
  ];

  return (
    <div className="container">
      <div className="staffcont">
        <div className="staffcont-upperhalf">
          <div className="staffcont-upperhalf-img">
            <img
              src={img1}
              style={i18n.language === "ar" ? arabimg : engimg}
              alt="welcome"
            />
            <img
              src={img2}
              style={i18n.language === "ar" ? arabimg : engimg}
              alt="welcome"
            />
          </div>
          <div className="staffcont-upperhalf-text">
            <h1>{t(`staff.welcome1`)}</h1>
            <h2>{t(`staff.welcome2`)}</h2>
            <h3>{t(`staff.welcome3`)}</h3>
          </div>
        </div>
        <div className="staffcont-lowerhalf">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className="staffcont-lowerhalf-card"
              onClick={() => {
                navigate(tab.link);
              }}
            >
              <span>{tab.icon}</span>
              <h5>{tab.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
