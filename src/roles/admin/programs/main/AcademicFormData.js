export const AcademicFormData = [
  {
    id: 0,
    title: "academicMain.section1",
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
        req: true,
        type: "text",
        row: true,
      },
      {
        id: 3,
        splitRow: [
          {
            id: 1,
            title: "academicMain.code",
            name: "programCode",
            req: true,
            type: "text",
          },
          {
            id: 2,
            title: "academicMain.edu_degree",
            name: "degree",
            options: [
              { id: 0, title: "common.select", value: null },
              {
                id: 1,
                title: "academicMain.degree_bachelor",
                value: "BACHELOR",
              },
              { id: 2, title: "academicMain.degree_diploma", value: "DIPLOMA" },
            ],
          },
        ],
      },
      {
        id: 4,
        splitRow: [
          {
            id: 1,
            title: "academicMain.sys_type",
            name: "system",
            req: true,
            options: [
              { id: 0, title: "common.select", value: null },
              { id: 1, title: "academicMain.credit", value: "CREDIT" },
              { id: 2, title: "levelHours.level", value: "SCHOOLYEAR" },
            ],
          },
          {
            id: 2,
            title: "academicMain.has_summer_semester",
            name: "hasSummerSemester",
            req: true,
            options: [
              { id: 1, title: "common.choice_no", value: false },
              { id: 2, title: "common.choice_yes", value: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    title: "academicMain.section2",
    formData: [
      {
        id: 1,
        credit: true,
        splitRow: [
          {
            id: 1,
            title: "academicMain.credit",
            name: "creditHours",
            req: true,
            type: "number",
          },
          {
            id: 2,
            title: "academicMain.mandatory",
            name: "mandatoryHours",
            type: "number",
          },
        ],
      },
      {
        id: 2,
        credit: true,
        splitRow: [
          {
            id: 1,
            title: "academicMain.option",
            name: "optionalHours",
            type: "number",
          },
          {
            id: 2,
            title: "academicMain.project",
            name: "projectQualifyingHours",
            type: "number",
          },
        ],
      },
      {
        id: 3,
        title: "academicMain.compute",
        name: "allowedHrs",
        options: [
          { id: 0, title: "common.select", value: null },
          { id: 1, title: "academicMain.c_gpa", value: "SEMESTER" },
          { id: 2, title: "academicMain.gpa", value: "CUMULATIVE" },
          { id: 3, title: "academicMain.s_gpa", value: "INCLUDESUMMER" },
          {
            id: 4,
            title: "academicMain.semester_fixed",
            value: "SEMESTERFIXED",
          },
        ],
        row: true,
      },
      {
        id: 4,
        title: "academicMain.prerequest",
        name: "prerequisiteProgramId",
        prerequisites: true,
        row: true,
      },
    ],
  },
  {
    id: 2,
    title: "academicMain.section3",
    formData: [
      {
        id: 1,
        title: "academicMain.fees",
        name: "feesType",
        req: true,
        options: [
          { id: 0, title: "common.select", value: null },
          { id: 1, title: "levelHours.level", value: "YEARFIXED" },
          { id: 2, title: "levelHours.term", value: "SEMESTERFIXED" },
          { id: 3, title: "academicMain.credit", value: "CREDITHOURS" },
          { id: 4, title: "portal.programs", value: "COURSES" },
        ],
        row: true,
      },
      {
        id: 2,
        title: "academicMain.summer_fees",
        name: "summerFeesType",
        req: true,
        options: [
          { id: 0, title: "common.select", value: null },
          { id: 1, title: "levelHours.level", value: "YEARFIXED" },
          { id: 2, title: "levelHours.term", value: "SEMESTERFIXED" },
          { id: 3, title: "academicMain.credit", value: "CREDITHOURS" },
          { id: 4, title: "portal.programs", value: "COURSES" },
        ],
        row: true,
        summer: true,
      },
    ],
  },
  {
    id: 3,
    title: "academicMain.section4",
    formData: [
      {
        id: 1,
        splitRow: [
          {
            id: 1,
            title: "academicMain.rate",
            name: "gradeLowering",
            type: "number",
          },
          {
            id: 2,
            title: "academicMain.trial",
            name: "attemptsToLowerGrade",
            type: "number",
          },
        ],
      },
      {
        id: 2,
        splitRow: [
          {
            id: 1,
            title: "academicMain.failure",
            name: "failureGrade",
            type: "number",
          },
          {
            id: 2,
            title: "grades.max",
            name: "maxGrade",
            req: true,
            type: "number",
          },
        ],
      },
    ],
  },
];