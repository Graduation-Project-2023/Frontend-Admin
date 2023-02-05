export const DepartmentsFormData = [
  {
    id: 1,
    title: "departments.ar_name",
    name: "arabicName",
    req: true,
    type: "text",
    row: true,
  },
  {
    id: 2,
    title: "departments.eng_name",
    name: "englishName",
    req: true,
    type: "text",
    row: true,
  },
  {
    id: 3,
    title: "academicMain.sys_type",
    name: "system",
    req: true,
    row: true,
    options: [
      { id: 0, title: "common.select", value: null },
      { id: 1, title: "academicMain.credit", value: "CREDIT" },
      { id: 2, title: "levelHours.level", value: "SCHOOLYEAR" },
    ],
  },
];
