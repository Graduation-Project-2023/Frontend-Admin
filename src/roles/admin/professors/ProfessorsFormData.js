export const ProfessorsFormData = [
  {
    id: 0,
    title: "login.email",
    req: true,
    name: "email",
    type: "email",
    row: true,
  },
  {
    id: 1,
    title: "login.password",
    req: true,
    name: "password",
    type: "password",
    row: true,
  },
  {
    id: 2,
    title: "common.ar_name",
    name: "arabicName",
    req: true,
    type: "text",
    row: true,
  },
  {
    id: 3,
    title: "common.eng_name",
    name: "englishName",
    req: true,
    type: "text",
    row: true,
  },
  {
    id: 4,
    title: "professor.department",
    name: "departmentId",
    req: true,
    type: "text",
    row: true,
  },
  {
    id: 5,
    splitRow: [
      {
        id: 1,
        title: "professor.position",
        name: "position",
        req: true,
        options: [
          { id: 0, title: "professor.permenant", value: "permenant" },
          { id: 1, title: "professor.delegated", value: "delegated" },
        ],
      },
      {
        id: 2,
        title: "professor.title",
        name: "title",
        type: "text",
        req: true,
      },
    ],
  },
];
