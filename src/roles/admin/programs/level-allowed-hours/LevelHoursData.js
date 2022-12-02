const LevelHoursData = [
  {
    id: 0,
    title: "levelHours.term",
    name: "semester",
    req: true,
    options: [
      { id: 1, title: "academicMain.first", value: "FIRST" },
      { id: 2, title: "levelHours.second", value: "SECOND" },
      { id: 3, title: "levelHours.summer", value: "SUMMER" },
    ],
  },
  {
    id: 1,
    title: "levelHours.level",
    name: "englishName",
    req: true,
    options: [
      { id: 1, title: "academicMain.degree_bachelor", value: "BACHELOR" },
      { id: 2, title: "academicMain.degree_diploma", value: "DIPLOMA" },
    ],
  },
  {
    id: 2,
    title: "levelHours.min",
    name: "minHours",
    req: true,
    options: false,
    type: "number",
  },
  {
    id: 3,
    title: "levelHours.max",
    name: "maxHours",
    req: true,
    options: false,
    type: "number",
  },
  {
    id: 4,
    title: "levelHours.maxCourses",
    name: "maxCourses",
    req: false,
    options: false,
    type: "number",
  },
];
