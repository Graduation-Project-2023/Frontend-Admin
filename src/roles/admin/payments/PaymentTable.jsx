import { useTranslation } from "react-i18next";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

export const PaymentTable = ({ payments, handleTransactionSelection }) => {
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

  return (
    <table className="table table-striped" id="tts">
      <thead>
        <tr>
          <th scope="col">{t("payment.transactionId")}</th>
          <th scope="col">{t("payment.studentEmail")}</th>
          <th scope="col">{t("payment.amount")}</th>
          <th scope="col">{t("payment.orderId")}</th>
          <th scope="col">{t("payment.date")}</th>
          <th scope="col">{t("payment.isRefunded")}</th>
          <th scope="col">{t("payment.isVoid")}</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr
            key={payment.id}
            onClick={() => {
              handleTransactionSelection(payment.id);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <td>{payment.id}</td>
            <td>{payment.student}</td>
            <td>{payment.amount}</td>
            <td>{payment.order_id}</td>
            <td>{formatTimestamp(payment.date, i18n.language)}</td>
            <td>
              {payment.isRefunded ? <AiOutlineCheck /> : <AiOutlineClose />}
            </td>
            <td>
              {payment.isVoided ? <AiOutlineCheck /> : <AiOutlineClose />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
