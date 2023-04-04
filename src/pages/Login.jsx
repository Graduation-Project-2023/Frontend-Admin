import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../shared/API";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { BiError } from "react-icons/bi";
import { FormButton } from "../components/buttons/Buttons";

export const Login = () => {
  const { t } = useTranslation();
  const emailRef = useRef();
  const pwdRef = useRef();
  const authContext = useAuth();
  const navigate = useNavigate();
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });

  useEffect(() => {
    if (authContext.isLoggedIn) {
      navigate(`/${authContext.role.toLowerCase()}`);
    }
    //eslint-disable-next-line
  }, [authContext.isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({ ...prev, loading: true, error: false }));
    const userCredentials = {
      email: emailRef.current.value,
      password: pwdRef.current.value,
    };
    axios
      .post(BASE_URL + "/auth/admin_login", userCredentials)
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({ ...prev, loading: false }));
        if (
          res.data.role === "ADMIN" ||
          res.data.role === "SUPER" ||
          res.data.role === "STAFF"
        ) {
          authContext.login(res.data.token, res.data.role, res.data.college);
          navigate(`/${res.data.role.toLowerCase()}`);
        } else {
          setUserUX({
            loading: false,
            error: true,
            errorMsg: t("common.invalidCred"),
          });
        }
      })
      .catch((error) => {
        setUserUX({
          loading: false,
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
            {userUX.loading ? (
              <FormButton type="loading" />
            ) : (
              <button>{t(`common.login`)}</button>
            )}
          </div>
          <Link to="/forgetpwd">{t(`login.forget`)}</Link>
          {userUX.error && (
            <div>
              <span className="wrong" role="alert">
                <BiError />
                {userUX.errorMsg}
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
