import { Table } from "../../../../components/Table/Table";
import { useTranslation } from "react-i18next";
import { FormCard } from "../../../../components/FormCard";

export const LevelHours = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <FormCard cardTitle={"levelHours.formhead"}>
        <form>
          <div className="row mb-4">
            <label className=" col-sm-2 col-form-label">
              {t(`levelHours.term`)}
            </label>
            <div className="col-sm-4 ">
              <select className="form-select">
                <option selected>{t(`levelHours.term`)}</option>
                <option>One</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t(`levelHours.level`)}
            </label>
            <div className="col-sm-4 ">
              <select className="form-select ">
                <option selected>{t(`levelHours.level`)}</option>
                <option>One</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t(`levelHours.min`)}
            </label>
            <div className="col-sm-4">
              <select className="form-select">
                <option selected>{t(`levelHours.min`)}</option>
                <option>One</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t(`levelHours.max`)}
            </label>
            <div className="col-sm-4">
              <select className="form-select">
                <option selected>{t(`levelHours.max`)}</option>
                <option>One</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t(`levelHours.max`)}
            </label>
            <div className="col-sm-4">
              <select className="form-select">
                <option selected>{t(`levelHours.max`)}</option>
                <option>One</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t(`levelHours.max`)}
            </label>
            <div className="col-sm-4">
              <select className="form-select">
                <option selected>{t(`levelHours.max`)}</option>
                <option>One</option>
              </select>
            </div>
          </div>
        </form>
      </FormCard>
      <Table
        tableTitle={"levelHours.tabletitle"}
        headerItems={[
          { id: 1, title: t(`levelHours.term`) },
          { id: 2, title: t(`levelHours.level`) },
          { id: 3, title: t(`levelHours.min`) },
          { id: 4, title: t(`levelHours.max`) },
        ]}
        rowItems={[
          { id: 1, title: "summer", level: 300, minHours: 30, maxHours: 60 },
          { id: 2, title: "first", level: 400, minHours: 20, maxHours: 90 },
          { id: 3, title: "summer", level: 200, minHours: 10, maxHours: 80 },
          { id: 4, title: "second", level: 500, minHours: 30, maxHours: 70 },
        ]}
        editableItems={true}
        deletableItems={true}
      />
    </div>
  );
};
