export const AcademicGradesData = [
  {
    id: 1,
    splitRow: [
      {
        id: 1,
        title: "grades.grade",
        name: "name",
        req: true,
        type: "text",
      },
      {
        id: 2,
        title: "common.gpaFrom",
        name: "gpa",
        req: true,
        type: "number",
      },
    ],
  },
  {
    id: 2,
    splitRow: [
      {
        id: 1,
        title: "grades.from",
        name: "startsFrom",
        req: true,
        type: "number",
      },
      {
        id: 2,
        title: "grades.to",
        name: "endsAt",
        req: true,
        type: "number",
      },
    ],
  },
  {
    id: 3,
    title: "grades.equivalent",
    name: "equivalent",
    req: true,
    type: "text",
    row: true,
  },
];
