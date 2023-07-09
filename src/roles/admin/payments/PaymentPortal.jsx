import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";

// Reusable Components
import { EmailSearch } from "./EmailSearch";
import { NoData } from "../../../components/UX/NoData";
import { SpinnerLoader } from "../../../components/loaders/SpinnerLoader";
import { PaymentTable } from "./PaymentTable";
import { PaymentDetails } from "./PaymentDetails";
import { Alert } from "react-bootstrap";

export const PaymentPortal = () => {
  const [students, setStudents] = useState({
    emails: [],
    studentEmail: "",
  });
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [paymentData, setPaymentData] = useState({});
  const [userUX, setUserUX] = useState({
    payments: { loading: false, error: false, errorMsg: "" },
    paymentData: { loading: false, error: false, errorMsg: "" },
  });
  const { t } = useTranslation();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      payments: { ...prev.payments, loading: true },
    }));
    // GET request to get payments by program id
    axios
      .get(ADMIN_URL + `/payments/all_trxs`, config)
      .then((res) => {
        console.log(res);
        setPayments(res.data);
        setFilteredPayments(res.data);
        console.log([...new Set(res.data.map((item) => item.student))]);
        setStudents({
          emails: [...new Set(res.data.map((item) => item.student))],
          studentEmail: "",
        });
        setUserUX((prev) => ({
          ...prev,
          payments: { ...prev.payments, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          payments: {
            loading: false,
            error: true,
            errorMsg: "error.common",
          },
        }));
      });
    // eslint-disable-next-line
  }, [authContext.college.id]);

  useEffect(() => {
    if (students.studentEmail !== "") {
      setFilteredPayments(
        payments.filter((item) => item.student === students.studentEmail)
      );
    } else {
      setFilteredPayments(payments);
    }
    // eslint-disable-next-line
  }, [students.studentEmail]);

  const handleStudentSelection = (email) => {
    setStudents((prev) => ({ ...prev, studentEmail: email }));
  };

  const handleTransactionSelection = (id) => {
    setUserUX((prev) => ({
      ...prev,
      paymentData: { ...prev.paymentData, loading: true },
    }));
    // GET request to get payment data by transaction id
    axios
      .get(ADMIN_URL + `/payments/trx/${id}`, config)
      .then((res) => {
        console.log(res);
        setPaymentData(res.data);
        setUserUX((prev) => ({
          ...prev,
          paymentData: { ...prev.paymentData, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          paymentData: {
            loading: false,
            error: true,
            errorMsg: "error.common",
          },
        }));
      });
  };

  return (
    <div className="container">
      <div className="registerationContainer">
        <h1
          style={{
            color: "#3d7dca",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "2.5rem",
            lineHeight: "3rem",
          }}
        >
          {t(`adminNavbar.payment`)}
        </h1>
        <div className="collapseSectionCard">
          {!(students.emails.length === 0 || students.emails.length === 1) && (
            <EmailSearch
              emails={students.emails}
              dropDownTitle={students.studentEmail}
              inputPlaceholder={"common.searchByEmail"}
              handleListClick={handleStudentSelection}
            />
          )}
          {userUX.payments.loading ? (
            <SpinnerLoader size={100} />
          ) : userUX.payments.error ? (
            <Alert variant="error">{t(userUX.payments.errorMsg)}</Alert>
          ) : filteredPayments.length === 0 ? (
            <NoData />
          ) : (
            <div className="table-responsive">
              <PaymentTable
                payments={filteredPayments}
                handleTransactionSelection={handleTransactionSelection}
              />
            </div>
          )}
          {paymentData.id && (
            <PaymentDetails
              payment={paymentData}
              handleVoidRefund={() => {
                setPaymentData({});
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
