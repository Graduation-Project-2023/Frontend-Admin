import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import styles from "../../../admin/student_data/portal/StudentDataPortal.module.scss";

// Reusable Components
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { BanksSidebar } from "../components/BanksSidebar";
import { FormInput } from "../../../../components/forms/FormInput";
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { BsFillPersonCheckFill } from "react-icons/bs";

export const Banks = () => {
  const [modal, setModal] = useState(false);
  const [bankInfo, setBankInfo] = useState({});
  const [userUX, setUserUX] = useState({
    info: { loading: false, error: false, errorMsg: "" },
    form: { loading: false, delete: false, error: false },
  });
  const { bankId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  const BankFormData = [
    {
      id: 0,
      title: "mcq.code",
      name: "id",
      req: true,
      type: "text",
      row: true,
    },
    {
      id: 1,
      title: "common.ar_name",
      name: "arabicName",
      req: true,
      type: "text",
      row: true,
    },
    {
      id: 2,
      title: "common.eng_name",
      name: "englishName",
      req: true,
      type: "text",
      row: true,
    },
  ];

  useEffect(() => {
    if (bankId !== "add" && bankId !== undefined) {
      setUserUX((prev) => ({
        ...prev,
        info: { loading: true, error: false, errorMsg: "" },
      }));
      // GET request to get bank info
      axios
        .get(ADMIN_URL + `/bank/${bankId}`, config)
        .then((res) => {
          console.log(res);
          setBankInfo(res.data);
          setUserUX((prev) => ({
            ...prev,
            info: { loading: false, error: false, errorMsg: "" },
          }));
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            info: {
              loading: true,
              error: true,
              errorMsg: "Error fetching bank info...",
            },
          }));
        });
    } else {
      setBankInfo({});
    }
    // eslint-disable-next-line
  }, [bankId]);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    const newBankData = { ...bankInfo };
    newBankData[fieldName] = fieldValue;
    setBankInfo(newBankData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newBank = {
      ...bankInfo,
      id: bankInfo.id.replace(/\s/g, ""),
    };
    setUserUX((prev) => ({
      ...prev,
      form: {
        loading: true,
        delete: false,
        error: false,
      },
    }));
    // Condition to check whether it's adding a new bank or updating the current
    bankId !== "add" && bankId !== undefined
      ? // PUT request to update the current MCQ bank
        axios
          .put(ADMIN_URL + `/bank/${bankId}`, newBank, config)
          .then((res) => {
            setBankInfo(res.data);
            setModal(true);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: false,
              },
            }));
          })
          .catch((error) => {
            console.log(error);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: true,
              },
            }));
          })
      : // POST request to create a new MCQ bank
        axios
          .post(ADMIN_URL + `/bank`, newBank, config)
          .then((res) => {
            console.log(res);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: false,
              },
            }));
          })
          .catch((error) => {
            console.log(error);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: true,
              },
            }));
          });
  };

  const handleBankDelete = (e) => {
    e.preventDefault();
    // DELETE request to delete the current MCQ bank
    setUserUX((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        delete: true,
        error: false,
      },
    }));
    axios
      .delete(ADMIN_URL + `/bank/${bankInfo.id}`, config)
      .then((res) => {
        console.log(res);
        setModal(true);
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            delete: false,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            delete: false,
            error: true,
          },
        }));
      });
  };

  const closeModal = () => {
    navigate("/staff/mcq/banks");
    setModal(false);
  };

  return (
    <FormNavbarContainer>
      <div className={styles.studentBody}>
        <BanksSidebar bankId={bankId} navRoute={"/staff/mcq/banks/"} />
        <div className="mcq-cont">
          <div className="mcq-cont-header">
            {bankId === undefined || bankId === "add"
              ? t("mcq.addBank")
              : t("mcq.editBank")}
          </div>
          <form
            onSubmit={(event) => {
              handleFormSubmit(event);
            }}
          >
            {BankFormData.map((data) => {
              if (
                data.name === "id" &&
                bankId !== "add" &&
                bankId !== undefined
              ) {
                return (
                  <FormInput
                    inputData={{ ...data, disabled: true }}
                    handleEditFormChange={handleEditFormChange}
                    valueData={bankInfo}
                    key={data.id}
                    loading={userUX.info.loading}
                  />
                );
              } else {
                return (
                  <FormInput
                    inputData={data}
                    handleEditFormChange={handleEditFormChange}
                    valueData={bankInfo}
                    key={data.id}
                    loading={userUX.info.loading}
                  />
                );
              }
            })}
            <button
              type="submit"
              className="form-card-button form-card-button-save"
            >
              {userUX.form.loading ? (
                <span className="loader"></span>
              ) : bankId !== "add" && bankId !== undefined ? (
                t(`common.save`)
              ) : (
                t(`common.add`)
              )}
            </button>
            <button
              type="reset"
              className="form-card-button form-card-button-cancel"
              disabled={userUX.form.loading || userUX.form.delete}
            >
              {t(`common.cancel`)}
            </button>

            {bankId !== "add" && bankId !== undefined && (
              <button
                className="form-card-button form-card-button-delete"
                onClick={handleBankDelete}
                disabled={userUX.form.loading || userUX.form.delete}
              >
                {userUX.form.delete ? (
                  <span className="loader"></span>
                ) : (
                  t(`common.delete`)
                )}
              </button>
            )}
            {(userUX.form.error || userUX.info.error) && (
              <div className="alert alert-danger" role="alert">
                {t("error.common")}
              </div>
            )}
          </form>
        </div>
        {modal && (
          <ModalPopup
            message={{
              state: true,
              icon: <BsFillPersonCheckFill />,
              title: "popup.success",
              text: "popup.message_success",
              button: "common.save",
              handleClick: closeModal,
            }}
            closeModal={closeModal}
          />
        )}
      </div>
    </FormNavbarContainer>
  );
};
