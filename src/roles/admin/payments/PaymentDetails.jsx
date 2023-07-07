import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import { ADMIN_URL } from "../../../shared/API";

// Components
import Nav from "react-bootstrap/Nav";
import { AiOutlineClose } from "react-icons/ai";
import { PaymentData } from "./PaymentData";
import { PaymentModal } from "./PaymentModal";

export const PaymentDetails = ({ payment, handleVoidRefund }) => {
  const [details, setDetails] = useState(true);
  const [modal, setModal] = useState({ state: false, type: "" });
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const { t } = useTranslation();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  const handleTypeSelection = () => {
    setUserUX({
      loading: true,
      error: false,
      errorMsg: "",
    });
    const data = {
      transactionId: payment.id,
      refundAmount: payment.amount,
    };
    if (data.type !== "refund") {
      delete data.refundAmount;
    }
    axios
      .post(ADMIN_URL + `/payments/${modal.type}`, data, config)
      .then((res) => {
        console.log(res.data);
        setUserUX({
          loading: false,
          error: false,
          errorMsg: "",
        });
        setModal({ state: false, type: "" });
        handleVoidRefund();
      })
      .catch((err) => {
        setUserUX({
          loading: false,
          error: true,
          errorMsg: "error.common",
        });
      });
  };

  return (
    <div>
      {/* <hr /> */}
      <div className="d-flex justify-content-between align-items-center" id="dfj">
        <h3 className="dfj_h3">
          {t("payment.transactionId")} <span className="payid">({payment.id})</span>
        </h3>
        <div className="dfj_buttons">
          <button
            className="btn btn-primary" id="dfj_btn1"
            onClick={() => {
              setModal({
                state: true,
                type: "void",
              });
            }}
          >
            {t("payment.void")}
          </button>
          <button
            className="btn btn-danger" id="dfj_btn2"
            onClick={() => {
              setModal({
                state: true,
                type: "refund",
              });
            }}
          >
            {t("payment.refund")}
          </button>
          <button className="btn btn-danger" id="dfj_btn3" onClick={handleVoidRefund}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
      <div>
        <Nav variant="underline" defaultActiveKey="transaction" className="navpaydet"> 
          <Nav.Item>
            <Nav.Link className="navpaydet_link"
              eventKey="transaction"
              onClick={() => {
                setDetails(true);
              }}
            >
              {t("payment.transactionDetails")}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="billing"
              onClick={() => {
                setDetails(false);
              }}
            >
              {t("payment.billingData")}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="pd">
        {details ? (
          <PaymentData data={payment} />
        ) : (
          <PaymentData billingData={true} data={payment} />
        )}
      </div>
      {modal.state && (
        <PaymentModal
          type={modal.type}
          transactionId={payment.id}
          handleTypeSelection={handleTypeSelection}
          closeModal={() => {
            setModal({ state: false, type: "" });
          }}
          userUX={userUX}
        />
      )}
    </div>
  );
};
