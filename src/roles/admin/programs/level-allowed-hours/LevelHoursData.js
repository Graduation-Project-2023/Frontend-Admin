export const LevelHoursData = [
  {
    id: 1,
    title: "levelHours.level",
    name: "level",
    levels: true,
    req: true,
    options: [{ id: 0, title: "common.select", value: null }],
    row: true,
  },
  {
    id: 2,
    splitRow: [
      {
        id: 1,
        title: "levelHours.term",
        name: "semester",
        req: true,
        options: [
          { id: 0, title: "common.select", value: null },
          { id: 1, title: "common.firstTerm", value: "FIRST" },
          { id: 2, title: "common.secondTerm", value: "SECOND" },
          { id: 3, title: "common.summerTerm", value: "SUMMER" },
        ],
      },
      {
        id: 2,
        title: "levelHours.min",
        name: "minHours",
        req: true,
        type: "number",
      },
    ],
  },
  {
    id: 3,
    splitRow: [
      {
        id: 1,
        title: "levelHours.max",
        name: "maxHours",
        req: true,
        type: "number",
      },
      {
        id: 2,
        title: "levelHours.maxCourses",
        name: "maxCourses",
        req: false,
        options: false,
        type: "number",
        row: true,
      },
    ],
  },
];
