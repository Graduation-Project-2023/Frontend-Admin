import { FormCard } from "../../../../components/FormCard";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { useTranslation } from "react-i18next";
import { Accordion } from "react-bootstrap";

export const AcademicMain = () => {
  const { t } = useTranslation();

  return (
    <SidebarContainer>
      <FormCard cardTitle={"academicMain.formhead"}>
        <form>
          <Accordion
            defaultActiveKey={["0"]}
            alwaysOpen
            className="collapseSection"
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>{t(`academicMain.section1`)}</Accordion.Header>
              <Accordion.Body>
                <div className="row mb-4">
                  <label className=" col-sm-2 col-form-label">
                    {t(`academicMain.ar_name`)}
                  </label>
                  <div className="col-sm-4 ">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.eng_name`)}
                  </label>
                  <div className="col-sm-4 ">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.code`)}
                  </label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.faculty`)}
                  </label>
                  <div className="col-sm-4">
                    <select className="form-select">
                      <option>{t(`adminNavbarkeys.text`)}</option>
                      <option>{t(`adminNavbarkeys.text`)}</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.edu_degree`)}
                  </label>
                  <div className="col-sm-4">
                    <select className="form-select">
                      <option>{t(`academicMain.edu_degree`)}</option>
                      <option>{t(`academicMain.edu_degree`)}</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.sys_type`)}
                  </label>
                  <div className="col-sm-4">
                    <select className="form-select">
                      <option>{t(`academicMain.credit`)}</option>
                      <option>{t(`levelHours.term`)}</option>
                      <option>{t(`levelHours.level`)}</option>
                    </select>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header> {t(`academicMain.section2`)}</Accordion.Header>
              <Accordion.Body>
                <div className="row mb-4">
                  <label className=" col-sm-2 col-form-label">
                    {t(`academicMain.credit`)}
                  </label>
                  <div className="col-sm-4 ">
                    <input type="number" className="form-control" />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.mandatory`)}
                  </label>
                  <div className="col-sm-4 ">
                    <input type="number" className="form-control" />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.option`)}
                  </label>
                  <div className="col-sm-4">
                    <input type="number" className="form-control" />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.project`)}
                  </label>
                  <div className="col-sm-4">
                    <input type="number" className="form-control" />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.compute`)}
                  </label>
                  <div className="col-sm-4">
                    <select className="form-select">
                      <option>{t(`academicMain.c_gpa`)}</option>
                      <option>{t(`academicMain.gpa`)}</option>
                      <option>{t(`academicMain.s_gpa`)}</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.prerequest`)}
                  </label>
                  <div className="col-sm-4">
                    <select className="form-select">
                      <option>{t(`academicMain.prerequest`)}</option>
                      <option>{t(`academicMain.prerequest`)}</option>
                    </select>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header> {t(`academicMain.section3`)}</Accordion.Header>
              <Accordion.Body>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.fees`)}
                  </label>
                  <div className="col-sm-4">
                    <select className="form-select">
                      <option>{t(`academicMain.credit`)}</option>
                      <option>{t(`levelHours.term`)}</option>
                      <option>{t(`levelHours.level`)}</option>
                      <option>{t(`portal.programs`)}</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.summer_fees`)}
                  </label>
                  <div className="col-sm-4">
                    <select className="form-select">
                      <option>{t(`academicMain.credit`)}</option>
                      <option>{t(`levelHours.term`)}</option>
                      <option>{t(`levelHours.level`)}</option>
                      <option>{t(`portal.programs`)}</option>
                    </select>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header> {t(`academicMain.section4`)}</Accordion.Header>
              <Accordion.Body>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.rate`)}
                  </label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label">
                    {t(`academicMain.trial`)}
                  </label>
                  <div className="col-sm-4">
                    <input type="number" className="form-control" />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </form>
      </FormCard>
    </SidebarContainer>
  );
};
