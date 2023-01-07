import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../shared/API";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

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

  useEffect(() => {
    if (authContext.isLoggedIn) {
      navigate("/admin");
    }
    //eslint-disable-next-line
  }, [authContext.isLoggedIn]);

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
        authContext.login(res.data.email, res.data.role);
        navigate("/admin");
      })
      .catch((error) => {
        setUserUX({
          submitLoading: false,
          error: true,
          errorMsg:
            error.response.status === 400
              ? t("common.invalidCred")
              : t("common.error"),
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
          {userUX.error && (
            <div className="alert alert-danger mt-2" role="alert">
              {userUX.errorMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
