import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../shared/API";
import { useTranslation } from "react-i18next";

export const ResetPwd = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useParams();
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [userUX, setUserUX] = useState({
    submitLoading: false,
    error: false,
    errorMsg: "",
  });
  const [pwd, setPwd] = useState(false);
  const [error, setError]= useState({
    password:"",
    confirmPassword:"",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter the Password";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match";
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handlePwdReset = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({ ...prev, submitLoading: true, error: false }));
    axios
      .post(BASE_URL + "api/reset_password/" + token, {
        password: input.password,
        confpassword: input.confirmPassword,
      })
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({ ...prev, submitLoading: false }));
        setPwd(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
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
          <h2>{t(`resetpwd.reset_btn`)}</h2>
        </div>
        <form className="login_form" onSubmit={handlePwdReset}>
          <div action="">
            <input
              type="password"
              placeholder={t(`resetpwd.new_password`)}
              name="password"
              id="password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
            {error.password && <div className="err">{error.password}</div>}
          </div>
          <div action="">
            <input
              type="password"
              placeholder={t(`resetpwd.confirm_password`)}
              name="confirmPassword"
              id="confirmPassword"
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
              required
            ></input>
            {error.confirmPassword && (
              <div className="err">{error.confirmPassword}</div>
            )}
          </div>
          <div className="login_form_button">
            {userUX.submitLoading ? (
              <h1>LOADING</h1>
            ) : (
              <button>{t(`resetpwd.reset_btn`)}</button>
            )}
          </div>
          {pwd && (
            <div>
              Password changed successfuly you will be redirected to the login
              page...
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
