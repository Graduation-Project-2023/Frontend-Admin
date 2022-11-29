import { Table } from "../../../../components/Table";
import styles from "./LevelHours.module.scss";

export const LevelHours = () => {
  return (
    <div>
      hello
      <Table
        headerItems={[
          { id: 1, title: "hello" },
          { id: 2, title: "byeee" },
          { id: 3, title: "min" },
          { id: 4, title: "max" },
        ]}
        rowItems={[
          { id: 1, title: "el sefe", level: 300, minHours: 30, maxHours: 60 },
          { id: 2, title: "first", level: 400, minHours: 20, maxHours: 90 },
          { id: 3, title: "el sefe", level: 700, minHours: 10, maxHours: 80 },
          { id: 4, title: "second", level: 600, minHours: 30, maxHours: 70 },
        ]}
        editableItems={true}
        deletableItems={true}
      />
    </div>
  );
};
