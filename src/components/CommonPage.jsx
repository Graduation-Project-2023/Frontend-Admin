import styles from "./styles/CommonPage.module.scss";

export const CommonPage = (props) => {
  return (
    <div className="container">
      <div className={styles.common_cont}>
        <div className={styles.common_cont_icon}>{props.icon}</div>
        <div className={styles.common_cont_text}>
          <h2>{props.mainText}</h2>
          <h3>{props.secondaryText}</h3>
        </div>
        {props.loader && (
          <div className={styles.common_cont_bar}>
            <div className={styles.common_cont_bar_box}>
              <div className={styles.common_cont_bar_box_line}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
