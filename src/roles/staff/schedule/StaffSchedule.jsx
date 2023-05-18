import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { ADMIN_URL } from "../../../shared/API";
import styles from "../../admin/registeration/RegisterationPortal.module.scss";
import axios from "axios";

// Resuable Components
import { DayPeriodTable } from "../../../components/table/schedule/DayPeriodTable";

export const StaffSchedule = () => {
  const [tableData, setTableData] = useState([
    {
      id: "af83952b-dabe-4b43-a3dd-f2a451752480",
      tableId: "48845b55-9ba5-4598-8270-4c9ce4c08439",
      courseInstanceId: "3f0e35f9-5ecb-4477-847d-5ccb5e8eca44",
      englishName: "English",
      arabicName: "لغة انجليزية",
      classType: "LAB",
      startPeriod: 1,
      endPeriod: 4,
      day: "MONDAY",
    },
    {
      id: "e2e89365-51d7-4939-aad1-64ad4e4153c2",
      tableId: "48845b55-9ba5-4598-8270-4c9ce4c08439",
      courseInstanceId: "3f0e35f9-5ecb-4477-847d-5ccb5e8eca44",
      englishName: "English",
      arabicName: "لغة انجليزية",
      classType: "LAB",
      startPeriod: 2,
      endPeriod: 5,
      day: "WEDNESDAY",
    },
  ]);
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

  // useEffect(() => {
  //   setUserUX({ loading: true, error: false, errorMsg: "" });

  //   // GET request to get professor schedule by professor id
  //   axios
  //     .get(
  //       ADMIN_URL +
  //         `/view/table?studentId="studentIDIDD"&semesterId=decc46ba-7d4b-11ed-a1eb-0242ac120002
  //         `,
  //       config
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data === null) {
  //         setTableData([]);
  //       } else {
  //         setTableData(res.data.classes);
  //       }
  //       setUserUX({ loading: false, error: false, errorMsg: "" });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setUserUX({ loading: false, error: true, errorMsg: "error" });
  //     });

  //   // eslint-disable-next-line
  // }, []);

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
        />
      </div>
    </div>
  );
};
