export const LevelHoursData = [
  {
    id: 0,
    title: "levelHours.term",
    name: "level",
    req: true,
    options: [
      { id: 0, title: "common.select", value: null },
      { id: 1, title: "common.firstTerm", value: "FIRST" },
      { id: 2, title: "common.secondTerm", value: "SECOND" },
      { id: 3, title: "common.summerTerm", value: "SUMMER" },
    ],
  },
  {
    id: 1,
    title: "levelHours.level",
    name: "semester",
    req: true,
    options: [
      { id: 0, title: "common.select", value: null },
      { id: 1, title: "academicMain.degree_bachelor", value: "CREDIT" },
      { id: 2, title: "academicMain.degree_diploma", value: "SCHOOLYEAR" },
    ],
  },
  {
    id: 2,
    title: "levelHours.min",
    name: "minHours",
    req: true,
    options: false,
    type: "number",
  },
  {
    id: 3,
    title: "levelHours.max",
    name: "maxHours",
    req: true,
    options: false,
    type: "number",
  },
  {
    id: 4,
    title: "levelHours.maxCourses",
    name: "maxCourses",
    req: false,
    options: false,
    type: "number",
  },
];
