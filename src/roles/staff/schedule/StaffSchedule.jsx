import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { ADMIN_URL } from "../../../shared/API";
import styles from "../../admin/registeration/RegisterationPortal.module.scss";
import axios from "axios";

// Resuable Components
import { DayPeriodTable } from "../../../components/table/schedule/DayPeriodTable";

export const StaffSchedule = () => {
  const [tableData, setTableData] = useState([]);
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
          setTableData(res.data.courses.classes);
        }
        setUserUX({ loading: false, error: false, errorMsg: "" });
      })
      .catch((error) => {
        console.log(error);
        setUserUX({ loading: false, error: true, errorMsg: "error" });
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
      <div className={styles.tableCont} style={{ width: "100%" }}>
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
      </div>
    </div>
  );
};
