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
        title: "common.schoolSeat",
        name: "SeatId",
        type: "number",
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
        id: 5,
        splitRow: [
          {
            id: 1,
            title: "common.birthdate",
            name: "birthDate",
            type: "date",
          },
          {
            id: 2,
            title: "common.birthplace",
            name: "birthPlace",
            type: "text",
          },
        ],
      },

      {
        id: 6,
        splitRow: [
          {
            id: 1,
            title: "common.nationality",
            name: "Nationality",
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
      {
        id: 10,
        title: "common.nationalId",
        req: true,
        name: "nationalId",
        type: "number",
        row: true,
      },
      {
        id: 11,
        title: "common.martial",
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
            type: "number",
            row: true,
          },
          {
            id: 2,
            title: "common.homeNumber",
            name: "homePhone",
            type: "number",
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
        name: "guardianName ",
        type: "text",
        row: true,
      },
      {
        id: 2,
        title: "common.guardianAddress",
        name: "guardianAddress ",
        type: "textarea",
        row: true,
      },
      {
        id: 3,
        splitRow: [
          {
            id: 1,
            title: "common.guardianNationality",
            name: "guardianNationality ",
            type: "text",
            row: true,
          },
          {
            id: 2,
            title: "common.guardianPhone",
            name: "guardianPhone",
            type: "number",
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
            name: "PreviousQualification",
            type: "text",
            row: true,
          },
          {
            id: 2,
            title: "common.prevQualificationInstitute",
            name: "InstitutePreviousQualification",
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
        name: "TotalPreviousQualification",
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
  // render only when the gender is MALE
  {
    id: 4,
    title: "studentsData.section5",
    formData: [
      {
        id: 1,
        splitRow: [
          {
            id: 1,
            title: "Recruitment State ",
            name: "recruitmentState ",
            type: "text",
            row: true,
          },
          {
            id: 2,
            title: "Recruitment Number ",
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
            title: "Army Number ",
            name: "armyNumber ",
            type: "number",
            row: true,
          },
          {
            id: 2,
            title: "Recruitment Date ",
            name: "recruitmentDate",
            type: "date",
            row: true,
          },
        ],
      },
    ],
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
