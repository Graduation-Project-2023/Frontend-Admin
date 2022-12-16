export const AcademicLevelsData = [
  {
    id: 1,
    title: "common.ar_name",
    name: "arabicName",
    req: true,
    type: "text",
    row: true,
  },
  {
    id: 2,
    title: "common.eng_name",
    name: "englishName",
    req: true,
    type: "text",
    row: true,
  },
  {
    id: 3,
    splitRow: [
      {
        id: 1,
        title: "levels.level",
        name: "level",
        req: true,
        type: "number",
      },
      {
        id: 2,
        title: "levels.qualify",
        name: "qualifyingHrs",
        type: "number",
      },
    ],
  },
];
