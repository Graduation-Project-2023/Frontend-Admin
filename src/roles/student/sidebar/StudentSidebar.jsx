import profile from "../../../shared/images/profile.jpeg";
import { NavLink } from "react-router-dom";
import styles from "./StudentSidebar.module.scss";

export const StudentSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_data}>
        <img src={profile} alt="profile" />
        <div>
          <h5>اسم الطالب كامل</h5>
          <h6>الشعبة</h6>
        </div>
      </div>
      <div className={styles.sidebar_list}>
        <li>
          <NavLink to="/student_portal">Home</NavLink>
        </li>
        <li>
          <NavLink to="/student_portal/payment">Payment</NavLink>
        </li>
        <li>
          <NavLink> البيانات الاساسية</NavLink>
        </li>
        <li>
          <NavLink> البيانات الاساسية</NavLink>
        </li>
        <li>
          <NavLink> البيانات الاساسية</NavLink>
        </li>
        <li>
          <NavLink> البيانات الاساسية</NavLink>
        </li>
        <li>
          <NavLink> البيانات الاساسية</NavLink>
        </li>
      </div>
    </div>
  );
};
