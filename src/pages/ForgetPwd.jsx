import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../shared/API";
import { useTranslation } from "react-i18next";
import { Navbar } from "../common/Navbar";
import styles from "./styles/Login.module.scss";

export const ForgetPwd = () => {
  const { t } = useTranslation();
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);

  const handlePwdFrgt = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(BASE_URL + "api/forgot_password", {
        email: emailRef.current.value,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className={styles.common_cont}>
          <div className={styles.login_title}>
            <h2>{t(`forgetpwd.title`)}</h2>
          </div>
          <form className={styles.login_form} onSubmit={handlePwdFrgt}>
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
            <div className={styles.login_form_button}>
              {loading ? (
                <button disabled>
                  <span className={styles.small_loader}></span>
                </button>
              ) : (
                <button>{t(`forgetpwd.done`)}</button>
              )}
            </div>
            <div>
              <Link to="/login">{t(`forgetpwd.back`)}</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
