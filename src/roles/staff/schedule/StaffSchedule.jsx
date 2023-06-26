import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { ADMIN_URL } from "../../../shared/API";
import styles from "../../admin/registeration/RegisterationPortal.module.scss";
import axios from "axios";

// Resuable Components
import { DayPeriodTable } from "../../../components/table/schedule/DayPeriodTable";
import { SpinnerLoader } from "../../../components/loaders/SpinnerLoader";
import { Alert } from "react-bootstrap";
import { ScheduleData } from "../StaffData";

export const StaffSchedule = () => {
  const [tableData, setTableData] = useState([]);
  const { t } = useTranslation();
  // eslint-disable-next-line
  const [cells, setCells] = useState({ occupied: [], available: [] });
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setUserUX({ loading: true, error: false, errorMsg: "" });

    // GET request to get professor schedule by professor id
    axios
      .get(
        ADMIN_URL +
          `/schedules
          `,
        config
      )
      .then((res) => {
        console.log(res);
        if (res.data === null) {
          setTableData([]);
        } else {
          setTableData(ScheduleData);
        }
        setUserUX({ loading: false, error: false, errorMsg: "" });
      })
      .catch((error) => {
        console.log(error);
        setUserUX({ loading: false, error: true, errorMsg: "error.common" });
      });

    // eslint-disable-next-line
  }, []);

  const handleCellsSetter = (occupiedCells, availableCells) => {
    setCells((current) => {
      return {
        ...current,
        occupied: occupiedCells,
        available: availableCells,
      };
    });
  };

  return (
    <div className="container">
      <div className="portal-body">
        <h5 className="portal-title">{t("staff.schedule")}</h5>{" "}
        <hr className="mb-3" />
        <div className={styles.tableCont} style={{ width: "100%" }}>
          {userUX.loading ? (
            <SpinnerLoader size={"80px"} heigth={"250px"} />
          ) : userUX.error ? (
            <Alert variant="danger">{t(userUX.errorMsg)}</Alert>
          ) : (
            <DayPeriodTable
              cellsSetter={handleCellsSetter}
              tableData={tableData}
              saveTableData={() => {}}
              occupiedCellClick={() => {}}
              emptyCellClick={() => {}}
              readOnly={true}
              userUX={userUX}
              noButtons={true}
              prof={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};
