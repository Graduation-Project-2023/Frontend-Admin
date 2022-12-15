import { Accordion } from "react-bootstrap";
import { StudentFormData } from "./StudentFormData";
import { FormCard } from "../../../../components/forms/FormCard";
import { useTranslation } from "react-i18next";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";

export const StudentDataPortal = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <FormNavbarContainer>
        <div className="collapseSectionCard">
          <form>
            <Accordion
              defaultActiveKey={["0"]}
              alwaysOpen
              className="collapseSection"
            >
              {StudentFormData.map((item) => {
                return (
                  <Accordion.Item eventKey={item.id} key={item.id}>
                    <Accordion.Header>{t(item.title)}</Accordion.Header>
                    <Accordion.Body>hellooooooo</Accordion.Body>
                  </Accordion.Item>
                );
              })}
              <button
                type="submit"
                className="form-card-button form-card-button-save"
              >
                {t(`common.save`)}
              </button>
              <button
                type="reset"
                className="form-card-button form-card-button-cancel"
              >
                {t(`common.cancel`)}
              </button>
            </Accordion>
          </form>
        </div>
      </FormNavbarContainer>
    </div>
  );
};
