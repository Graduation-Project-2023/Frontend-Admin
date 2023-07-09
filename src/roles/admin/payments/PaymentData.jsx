import { useTranslation } from "react-i18next";
import { TransactionData } from "./TransactionData";

export const PaymentData = ({ billingData, data }) => {
  const paymentData = {
    ...data,
    source: data.source_data.pan,
    type: data.source_data.type,
    subType: data.source_data.sub_type,
    orderId: data.order.id,
  };
  const { t, i18n } = useTranslation();

  function formatTimestamp(timestamp, language) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = new Intl.DateTimeFormat(language, { month: "long" }).format(
      date
    );
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    let period;
    if (hours >= 12) {
      period = language === "ar" ? "مساءً" : "PM";
    } else {
      period = language === "ar" ? "صباحًا" : "AM";
    }

    let formattedHours = hours % 12;
    if (formattedHours === 0) {
      formattedHours = 12;
    }

    const formattedTimestamp = `${day} ${month} ${year}, ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    return formattedTimestamp;
  }

  if (billingData) {
    return Object.entries(data.billing_data).map(([key, value]) => (
      <div key={key}>
        <div className="lol1">{t(`payment.${key}`)}:</div>
        {key === "created_at" ? (
          <span>{formatTimestamp(value, i18n.language)}</span>
        ) : (
          <div className="lol2">
            {value === "true"
              ? t("payment.true")
              : value === "false"
              ? t("payment.false")
              : value === "NA"
              ? t("payment.NA")
              : value === ""
              ? t("payment.null")
              : value}
          </div>
        )}
      </div>
    ));
  } else
    return TransactionData.map((item) => (
      <div className="lol" key={item.id}>
        <div className="lol1">{t(item.label)}: </div>

        <div className="lol2">  
          {item.time
            ? formatTimestamp(paymentData[item.name], i18n.language)
            : item.enum
            ? t(`payment.${paymentData[item.name]}`)
            : paymentData[item.name] === "-"
            ? t("payment.null")
            : paymentData[item.name]}
        </div>
      </div>
    ));
};
