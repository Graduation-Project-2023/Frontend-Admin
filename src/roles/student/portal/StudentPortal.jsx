import styles from "./StudentPortal.module.scss";

export const StudentPortal = () => {
  return (
    <div className={styles.portal}>
      <div className={styles.portal_card}>
        <h2 className={styles.portal_card_title}>بيانات شخصية</h2>
        <div className={styles.portal_card_line}></div>
        <div className={styles.portal_data}>
          <div className={styles.portal_data_text}>
            <span className={styles.portal_data_text_title}>
              الاسم باللغة العربية:
            </span>
            <span className={styles.portal_data_text_data}>
              جيمس بوند ويليام ذا ثيرد
            </span>
          </div>
          <div className={styles.portal_data_text}>
            <span className={styles.portal_data_text_title}>
              الاسم باللغة الانجليزية:
            </span>
            <span className={styles.portal_data_text_data}>
              james bond william the third
            </span>
          </div>
          <div className={styles.portal_data_text}>
            <span className={styles.portal_data_text_title}>
              تاريخ الميلاد:
            </span>
            <span className={styles.portal_data_text_data}> 01/01/2000</span>
          </div>
          <div className={styles.portal_data_text}>
            <span className={styles.portal_data_text_title}>الديانه:</span>
            <span className={styles.portal_data_text_data}>مسيحى</span>
          </div>
          <div className={styles.portal_data_text}>
            <span className={styles.portal_data_text_title}>
              الرقم القومي / جواز السفر:
            </span>
            <span className={styles.portal_data_text_data}>30001652438011</span>
          </div>
          <div className={styles.portal_data_text}>
            <span className={styles.portal_data_text_title}>محل الميلاد:</span>
            <span className={styles.portal_data_text_data}>الاسماعيلية</span>
          </div>
          <div className={styles.portal_data_text}>
            <span className={styles.portal_data_text_title}>النوع:</span>
            <span className={styles.portal_data_text_data}>ذكر</span>
          </div>
        </div>
      </div>
    </div>
  );
};
