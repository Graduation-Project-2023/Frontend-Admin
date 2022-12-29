export const CourseRegisterData = [
  {
    id: 1,
    title: "common.ar_name",
    name: "arabicName",
    disabled: true,
    type: "text",
    row: true,
  },
  {
    id: 2,
    title: "common.eng_name",
    name: "englishName",
    disabled: true,
    type: "text",
    row: true,
  },
  {
    id: 3,
    splitRow: [
      {
        id: 1,
        title: "courses.code",
        name: "code",
        disabled: true,
        type: "text",
      },
      {
        id: 2,
        title: "courses.hours",
        name: "creditHours",
        disabled: true,
        type: "number",
      },
    ],
  },
  { id: 5, levels: true },
  { id: 6, prof: true },

  {
    id: 7,
    splitRow: [
      {
        id: 1,
        title: "courses.lecture",
        name: "lectureHrs",
        req: true,
        type: "number",
      },
      {
        id: 2,
        title: "courses.lectures",
        name: "lectureCount",
        type: "number",
      },
    ],
  },
  { id: 8, lectureGroups: true },
  {
    id: 9,
    splitRow: [
      {
        id: 1,
        title: "courses.section",
        name: "sectionHrs",
        type: "number",
      },
      {
        id: 2,
        title: "courses.sections",
        name: "sectionCount",
        type: "number",
      },
    ],
  },
  {
    id: 10,
    splitRow: [
      {
        id: 1,
        title: "courses.lab",
        name: "labHrs",
        type: "number",
      },
      {
        id: 2,
        title: "courses.labs",
        name: "labCount",
        type: "number",
      },
    ],
  },
];
