import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ADMIN_URL } from "../shared/API";
import { useTranslation } from "react-i18next";
import { BiError } from "react-icons/bi";
import { FormButton } from "../components/buttons/Buttons";

export const ForgetPwd = () => {
  const { t } = useTranslation();
  const emailRef = useRef();
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });

  const handlePwdFrgt = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({ ...prev, loading: true, error: false }));
    axios
      .post(ADMIN_URL + "api/forgot_password", {
        email: emailRef.current.value,
      })
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX({
          loading: false,
          error: true,
          errorMsg: error.response.data.message,
        });
      });
  };

  return (
    <div className="container">
      <div className="common_cont">
        <div className="login_title">
          <h2>{t(`forgetpwd.title`)}</h2>
        </div>
        <form className="login_form" onSubmit={handlePwdFrgt}>
          <div>{t(`forgetpwd.instruction`)}</div>
          <div action="">
            <input
              type="email"
              placeholder={t(`forgetpwd.email`)}
              ref={emailRef}
              minLength={3}
              name="email"
              id="email"
              required
            ></input>
          </div>
          <div className="login_form_button">
            {userUX.loading ? (
              <FormButton type="loading" />
            ) : (
              <button>{t(`common.continue`)}</button>
            )}
          </div>
          <div>
            <Link to="/login">{t(`forgetpwd.back`)}</Link>
            {userUX.error && (
              <div>
                <span className="wrong" role="alert">
                  <BiError />
                  {userUX.errorMsg}
                </span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
