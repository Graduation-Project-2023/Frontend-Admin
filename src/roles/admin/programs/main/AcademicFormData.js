export const AcademicFormData = [
  {
    id: 0,
    title: "academicMain.section1",
    formData: [
      {
        id: 1,
        title: "academicMain.ar_name",
        name: "arabicName",
        req: true,
        options: false,
        type: "text",
      },
      {
        id: 2,
        title: "academicMain.eng_name",
        name: "englishName",
        req: true,
        options: false,
        type: "text",
      },
      {
        id: 3,
        title: "academicMain.code",
        name: "programCode",
        req: true,
        options: false,
        type: "text",
      },
      {
        id: 4,
        title: "academicMain.edu_degree",
        name: "degree",
        options: [
          { id: 0, title: "select a program", value: null },
          { id: 1, title: "academicMain.degree_bachelor", value: "BACHELOR" },
          { id: 2, title: "academicMain.degree_diploma", value: "DIPLOMA" },
        ],
      },
      {
        id: 5,
        title: "academicMain.sys_type",
        name: "system",
        req: true,
        options: [
          { id: 0, title: "select a program", value: null },
          { id: 1, title: "academicMain.credit", value: "CREDIT" },
          { id: 2, title: "levelHours.level", value: "SCHOOLYEAR" },
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
        title: "academicMain.credit",
        name: "creditHours",
        req: true,
        credit: true,
        type: "number",
      },
      {
        id: 2,
        title: "academicMain.mandatory",
        name: "mandatoryHours",
        type: "number",
      },
      {
        id: 3,
        title: "academicMain.option",
        name: "optionalHours",
        credit: true,
        type: "number",
      },
      {
        id: 4,
        title: "academicMain.project",
        name: "projectQualifyingHours",
        type: "number",
      },
      {
        id: 5,
        title: "academicMain.compute",
        name: "allowedHours",
        options: [
          { id: 0, title: "select a program", value: null },
          { id: 1, title: "academicMain.c_gpa", value: "SEMESTER" },
          { id: 2, title: "academicMain.gpa", value: "CUMULATIVE" },
          { id: 3, title: "academicMain.s_gpa", value: "INCLUDESUMMER" },
        ],
      },
      {
        id: 6,
        title: "academicMain.prerequest",
        name: "prerequisiteProgramId",
        options: [
          { id: 0, title: "select a program", value: null },
          { id: 1, title: "academicMain.prerequest", value: "PRE1" },
          { id: 2, title: "academicMain.prerequest", value: "PRE2" },
        ],
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
          { id: 0, title: "select a program", value: null },
          { id: 1, title: "levelHours.level", value: "YEARFIXED" },
          { id: 2, title: "levelHours.term", value: "SEMESTERFIXED" },
          { id: 3, title: "academicMain.credit", value: "CREDITHOURS" },
          { id: 4, title: "portal.programs", value: "COURSES" },
        ],
      },
      {
        id: 2,
        title: "academicMain.summer_fees",
        name: "summerFeesType",
        req: true,
        options: [
          { id: 0, title: "select a program", value: null },
          { id: 1, title: "levelHours.level", value: "YEARFIXED" },
          { id: 2, title: "levelHours.term", value: "SEMESTERFIXED" },
          { id: 3, title: "academicMain.credit", value: "CREDITHOURS" },
          { id: 4, title: "portal.programs", value: "COURSES" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "academicMain.section4",
    formData: [
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
      {
        id: 3,
        title: "academicMain.failure",
        name: "failureGrade",
        type: "number",
      },
    ],
  },
];
