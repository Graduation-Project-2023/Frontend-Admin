export const QuizFormData = [
  {
    id: 1,
    title: "common.eng_name",
    name: "englishName",
    type: "text",
    row: true,
  },
  {
    id: 2,
    title: "common.ar_name",
    name: "arabicName",
    type: "text",
    row: true,
  },
  {
    id: 3,
    title: "common.description",
    name: "description",
    type: "textarea",
    row: true,
  },
  {
    id: 4,
    splitRow: [
      {
        id: 1,
        title: "common.givenTime",
        name: "givenTime",
        type: "number",
      },
      {
        id: 2,
        title: "common.totalMarks",
        name: "totalMarks",
        req: true,
        type: "number",
      },
    ],
  },
];
