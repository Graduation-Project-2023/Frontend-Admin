let tableBody = [];

let tableDays = [
  "",
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];

for (let x = 1; x < 8; x++) {
  let tableCells = [];

  for (let y = 1; y < 21; y++) {
    tableCells.push({
      period: y,
    });
  }

  tableBody.push({
    id: x,
    day: tableDays[x],
    cells: tableCells,
  });
}

const tableHeader = [
  { period: 0, time: "" },
  { period: 1, time: "8:00 - 8:30" },
  { period: 2, time: "8:30 - 9:00" },
  { period: 3, time: "9:00 - 9:30" },
  { period: 4, time: "9:30 - 10:00" },
  { period: 5, time: "10:00 - 10:30" },
  { period: 6, time: "10:30 - 11:00" },
  { period: 7, time: "11:00 - 11:30" },
  { period: 8, time: "11:30 - 12:00" },
  { period: 9, time: "12:00 - 12:30" },
  { period: 10, time: "12:30 - 1:00" },
  { period: 11, time: "1:00 - 1:30" },
  { period: 12, time: "1:30 - 2:00" },
  { period: 13, time: "2:00 - 2:30" },
  { period: 14, time: "2:30 - 3:00" },
  { period: 15, time: "3:00 - 3:30" },
  { period: 16, time: "3:30 - 4:00" },
  { period: 17, time: "4:00 - 4:30" },
  { period: 18, time: "4:30 - 5:00" },
  { period: 19, time: "5:00 - 5:30" },
  { period: 20, time: "5:30 - 6:00" },
];

const Days = [
  { id: 1, title: "saturday", value: "SATURDAY" },
  { id: 2, title: "sunday", value: "SUNDAY" },
  { id: 3, title: "monday", value: "MONDAY" },
  { id: 4, title: "tuesday", value: "TUESDAY" },
  { id: 5, title: "wednesday", value: "WEDNESDAY" },
  { id: 6, title: "thursday", value: "THURSDAY" },
  { id: 7, title: "friday", value: "FRIDAY" },
];

export const ScheduleTableDays = Days;
export const ScheduleTableBody = tableBody;
export const ScheduleTableHeader = tableHeader;