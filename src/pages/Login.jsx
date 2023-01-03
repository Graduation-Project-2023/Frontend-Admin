import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../shared/API";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

export const Login = () => {
  const { t } = useTranslation();
  const emailRef = useRef();
  const pwdRef = useRef();
  const authContext = useAuth();
  const navigate = useNavigate();
  const [userUX, setUserUX] = useState({
    submitLoading: false,
    error: false,
    errorMsg: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({ ...prev, submitLoading: true, error: false }));
    const userCredentials = {
      email: emailRef.current.value,
      password: pwdRef.current.value,
    };
    axios
      .post(BASE_URL + "/auth/admin_login", userCredentials)
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({ ...prev, submitLoading: false }));
        authContext.login("ssss", "ADMIN");
        navigate("/admin_portal");
      })
      .catch((error) => {
        setUserUX({
          submitLoading: false,
          error: true,
          errorMsg: "hhhhhhhhhhh",
        });
        console.log(error);
      });
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
            />
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
            />
          </div>
          <div className="login_form_button">
            {userUX.submitLoading ? (
              <h1>LOADING</h1>
            ) : (
              <button>{t(`common.login`)}</button>
            )}
          </div>
          <Link to="/forgetpwd">{t(`login.forget`)}</Link>
          {userUX.error && <h1>errorrrrrrrrrrrr</h1>}
        </form>
      </div>
    </div>
  );
};
