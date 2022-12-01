import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../shared/API";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const Login = () => {
  const { t } = useTranslation();
  const emailRef = useRef();
  const pwdRef = useRef();
  const authContext = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    authContext.login("ssss", "ADMIN", {
      id: 12,
      arabicName: "الهندسة",
      englishName: "Engineering",
    });
    navigate("/admin_portal");
    // axios
    //   .post(BASE_URL + "api/login", {
    //     email: emailRef.current.value,
    //     password: pwdRef.current.value,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setLoading(false);
    //     authContext.login("ssss", "STUDENT");
    //     navigate("/student_portal");
    //     // authContext.login(res.data.token, res.data.role);
    //     // if (res.data.role === "STUDENT") {
    //     //   navigate("/sutdent_portal");
    //     // } else if (res.data.role === "STAFF") {
    //     //   navigate("/staff_portal");
    //     // } else if (res.data.role === "ADMIN") {
    //     //   navigate("/admin_portal");
    //     // }
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log(error);
    //   });
  };

  return (
    <div className="container">
      <div className="common_cont">
        <div className="login_title">
          <h2>{t(`common.login`)}</h2>
        </div>
        <form className="login_form" onSubmit={handleLogin}>
          <div action="">
            <input
              type="email"
              placeholder={t(`login.email`)}
              ref={emailRef}
              minLength={3}
              name="email"
              id="email"
              required
            ></input>
          </div>
          <div action="">
            <input
              type="password"
              placeholder={t(`login.password`)}
              ref={pwdRef}
              minLength={8}
              name="password"
              id="password"
              required
            ></input>
          </div>
          <div className="login_form_button">
            {loading ? (
              <button disabled>
                <span className="small_loader"></span>
              </button>
            ) : (
              <button>{t(`common.login`)}</button>
            )}
          </div>
          <Link to="/forgetpwd">{t(`login.forget`)}</Link>
        </form>
      </div>
    </div>
  );
};
