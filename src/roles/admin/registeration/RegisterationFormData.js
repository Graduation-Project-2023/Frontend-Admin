export const RegisterationFormData = [
  {
    id: 0,
    splitRow: [
      {
        id: 1,
        title: "common.ar_name",
        name: "arabicName",
        type: "text",
        req: true,
      },
      {
        id: 2,
        title: "common.eng_name",
        name: "englishName",
        type: "text",
      },
    ],
  },
  {
    id: 1,
    splitRow: [
      {
        id: 1,
        title: "common.schoolSeat",
        name: "seatId",
        type: "number",
        req: true,
      },
      {
        id: 2,
        title: "levels.level",
        name: "level",
        type: "text",
      },
    ],
  },
  {
    id: 2,
    splitRow: [
      //   {
      //     id: 1,
      //     title: "academicMain.c_gpa",
      //     name: "gpa",
      //     type: "text",
      //   },
      {
        id: 2,
        title: "academicMain.credit",
        name: "creditHrs",
        type: "text",
        req: true,
      },
    ],
  },
];
