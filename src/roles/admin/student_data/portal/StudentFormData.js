export const StudentFormData = [
  {
    id: 0,
    title: "studentsData.section1",
    formData: [
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
        type: "text",
        row: true,
      },
      {
        id: 3,
        title: "student code",
        name: "studentCode",
        type: "text",
        row: true,
      },
      {
        id: 4,
        splitRow: [
          {
            id: 1,
            title: "common.gender",
            name: "gender",
            options: [
              { id: 0, title: "common.select", value: null },
              { id: 1, title: "GENDER male", value: "MALE" },
              { id: 2, title: "gender female", value: "FEMALE" },
            ],
          },
          {
            id: 2,
            title: "common.religion",
            name: "religion",
            options: [
              { id: 0, title: "common.select", value: null },
              { id: 1, title: "common.religion_muslim", value: "MUSLIM" },
              { id: 2, title: "common.religion_christian", value: "CHRISTIAN" },
            ],
          },
        ],
      },
      {
        id: 5,
        splitRow: [
          {
            id: 1,
            title: "birthdate",
            name: "birthdate",
            type: "date",
          },
          {
            id: 2,
            title: "birthplace",
            name: "birthplace",
            type: "text",
          },
        ],
      },

      {
        id: 6,
        splitRow: [
          {
            id: 1,
            title: "nationality",
            name: "nationality",
            type: "text",
          },
          {
            id: 2,
            title: "secondNationality",
            name: "secondNationality",
            type: "text",
          },
        ],
      },
      {
        id: 10,
        title: "national id",
        req: true,
        name: "nationalId",
        type: "number",
        row: true,
      },
      {
        id: 11,
        title: "martial status",
        name: "martialStatus",
        type: "text",
        row: true,
      },
    ],
  },
  {
    id: 1,
    title: "studentsData.section2",
    formData: [
      {
        id: 1,
        title: "address",
        name: "address",
        type: "textarea",
        row: true,
      },
      {
        id: 2,
        splitRow: [
          {
            id: 1,
            title: "home phone number",
            name: "homeNumber",
            type: "number",
            row: true,
          },
          {
            id: 2,
            title: "mobile number",
            name: "mobileNumber",
            type: "number",
            row: true,
          },
        ],
      },
      {
        id: 3,
        title: "email",
        name: "email",
        type: "email",
        row: true,
      },
    ],
  },
  {
    id: 2,
    title: "studentsData.section3",
    formData: [],
  },
  {
    id: 3,
    title: "studentsData.section4",
    formData: [],
  },
  // render only when the gender is MALE
  {
    id: 4,
    title: "studentsData.section5",
    formData: [],
    male: true,
  },
  // place it in the portal file
  {
    id: 5,
    title: "studentsData.section6",
    formData: [],
    addStudent: true,
  },
];
