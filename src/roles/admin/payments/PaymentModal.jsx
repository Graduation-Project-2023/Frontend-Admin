import { useTranslation } from "react-i18next";

// Components
import { Modal, Button } from "react-bootstrap";

export const PaymentModal = ({
  closeModal,
  handleTypeSelection,
  type,
  userUX,
}) => {
  const { t } = useTranslation();
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>{t(`payment.${type}`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t(`payment.${type}Msg`)}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleTypeSelection}
          disabled={userUX.loading}
        >
          {t("common.save")}
        </Button>
        <Button
          variant="secondary"
          onClick={closeModal}
          disabled={userUX.loading}
        >
          {t("common.close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
