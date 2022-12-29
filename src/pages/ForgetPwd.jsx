import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../shared/API";
import { useTranslation } from "react-i18next";

export const ForgetPwd = () => {
  const { t } = useTranslation();
  const emailRef = useRef();
  const [userUX, setUserUX] = useState({
    submitLoading: false,
    error: false,
    errorMsg: "",
  });


  const handlePwdFrgt = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({ ...prev, submitLoading: true, error: false }));
    axios
      .post(BASE_URL + "api/forgot_password", {
        email: emailRef.current.value,
      })
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({ ...prev, submitLoading: false }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX({
          submitLoading: false,
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
            {userUX.submitLoading ? (
              <h1>LOADING</h1>
            ) : (
              <button>{t(`common.done`)}</button>
            )}
          </div>
          <div>
            <Link to="/login">{t(`forgetpwd.back`)}</Link>
            {userUX.error && <h1>errorrrrrrrr</h1>}
          </div>
        </form>
      </div>
    </div>
  );
};
