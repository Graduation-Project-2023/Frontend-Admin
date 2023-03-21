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
        title: "common.nationalId",
        req: true,
        name: "nationalId",
        type: "string",
        row: true,
      },
      // {
      //   id: 4,
      //   title: "login.email",
      //   req: true,
      //   name: "email",
      //   type: "email",
      //   row: true,
      // },
      {
        id: 5,
        title: "login.password",
        req: true,
        name: "password",
        type: "password",
        row: true,
      },
      {
        id: 6,
        title: "common.schoolSeat",
        name: "SeatId",
        type: "number",
        row: true,
      },
      {
        id: 7,
        splitRow: [
          {
            id: 1,
            title: "common.gender",
            name: "gender",
            options: [
              { id: 0, title: "common.select", value: null },
              { id: 1, title: "common.gender_male", value: "MALE" },
              { id: 2, title: "common.gender_female", value: "FEMALE" },
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
        id: 8,
        splitRow: [
          {
            id: 1,
            title: "common.birthdate",
            name: "birthDate",
            type: "date",
          },
          {
            id: 2,
            title: "common.marital",
            name: "maritalStatus",
            options: [
              { id: 0, title: "common.select", value: null },
              { id: 1, title: "common.marital_single", value: "SINGLE" },
              { id: 2, title: "common.marital_married", value: "MARRIED" },
              { id: 3, title: "common.marital_separated", value: "SEPARATED" },
              { id: 4, title: "common.marital_widowed", value: "WIDOWED" },
            ],
          },
        ],
      },
      {
        id: 9,
        title: "common.birthplace",
        name: "birthPlace",
        type: "text",
        row: true,
      },
      {
        id: 10,
        splitRow: [
          {
            id: 1,
            title: "common.nationality",
            name: "nationality",
            type: "text",
          },
          {
            id: 2,
            title: "common.otherNationality",
            name: "otherNationality",
            type: "text",
          },
        ],
      },
    ],
  },
  {
    id: 1,
    title: "studentsData.section2",
    formData: [
      {
        id: 1,
        title: "common.address",
        name: "address",
        type: "textarea",
        row: true,
      },
      {
        id: 2,
        splitRow: [
          {
            id: 1,
            title: "common.phone",
            name: "contactPhone",
            type: "string",
            row: true,
          },
          {
            id: 2,
            title: "common.homeNumber",
            name: "homePhone",
            type: "string",
            row: true,
          },
        ],
      },
      {
        id: 3,
        title: "common.directorate",
        name: "directorate",
        type: "text",
        row: true,
      },
    ],
  },
  {
    id: 2,
    title: "studentsData.section3",
    formData: [
      {
        id: 1,
        title: "common.guardianName",
        name: "guardianName",
        type: "text",
        row: true,
      },
      {
        id: 2,
        title: "common.guardianAddress",
        name: "guardianAddress",
        type: "textarea",
        row: true,
      },
      {
        id: 3,
        splitRow: [
          {
            id: 1,
            title: "common.guardianNationality",
            name: "guardianNationality",
            type: "text",
            row: true,
          },
          {
            id: 2,
            title: "common.guardianPhone",
            name: "guardianPhone",
            type: "string",
            row: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "studentsData.section4",
    formData: [
      {
        id: 1,
        splitRow: [
          {
            id: 1,
            title: "common.prevQualification",
            name: "previousQualification",
            type: "text",
            row: true,
          },
          {
            id: 2,
            title: "common.prevQualificationInstitute",
            name: "institutePreviousQualification",
            type: "text",
            row: true,
          },
        ],
      },
      {
        id: 2,
        splitRow: [
          {
            id: 1,
            title: "common.enrollmentYear",
            name: "enrollmentYear",
            type: "date",
            row: true,
          },
          {
            id: 2,
            title: "common.enrollmentEndDate",
            name: "enrollmentYearEndDate",
            type: "date",
            row: true,
          },
        ],
      },
      {
        id: 3,
        title: "common.totalPrevQualification",
        name: "totalPreviousQualification",
        type: "number",
        row: true,
      },
      {
        id: 4,
        splitRow: [
          {
            id: 1,
            title: "common.schoolMarks",
            name: "schoolMarks",
            type: "number",
            row: true,
          },
          {
            id: 2,
            title: "common.schoolSeat",
            name: "schoolSeatId",
            type: "number",
            row: true,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "studentsData.section5",
    formData: [
      {
        id: 1,
        splitRow: [
          {
            id: 1,
            title: "common.recruitmentState",
            name: "recruitmentState",
            type: "text",
            row: true,
          },
          {
            id: 2,
            title: "common.recruitmentNumber",
            name: "recruitmentNumber",
            type: "number",
            row: true,
          },
        ],
      },
      {
        id: 2,
        splitRow: [
          {
            id: 1,
            title: "common.armyNumber",
            name: "armyNumber",
            type: "number",
            row: true,
          },
          {
            id: 2,
            title: "common.recruitmentDate",
            name: "recruitmentDate",
            type: "date",
            row: true,
          },
        ],
      },
    ],
    male: true,
  },
  {
    id: 5,
    title: "studentsData.section6",
    formData: [],
    addStudent: true,
  },
];
