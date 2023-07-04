import { useRef, useState, useEffect } from "react";
import { GPAData } from "./CourseworkData";
import i18next from "i18next";

export const CourseworkRow = (props) => {
  const [studentData, setStudentData] = useState(props.student);
  const [grade, setGrade] = useState(
    +studentData.classworkScore +
      +studentData.finalScore +
      +studentData.midtermScore
  );
  // eslint-disable-next-line
  const [userUX, setUserUX] = useState({
    error: false,
    errorMsg: "",
  });
  const midtermScoreRef = useRef();
  const classworkScoreRef = useRef();
  const finalScoreRef = useRef();

  useEffect(() => {
    classworkScoreRef.current.value = props.student.classworkScore;
    finalScoreRef.current.value = props.student.finalScore;
    midtermScoreRef.current.value = props.student.midtermScore;
    // eslint-disable-next-line
  }, []);

  const handleRowChange = (event) => {
    event.preventDefault();
    const classWork = +classworkScoreRef.current.value;
    const finalExam = +finalScoreRef.current.value;
    const midTerm = +midtermScoreRef.current.value;

    if (
      midTerm + classWork + finalExam > 100 ||
      classWork < 0 ||
      finalExam < 0 ||
      midTerm < 0
    ) {
      setUserUX({
        error: true,
        errorMsg: "sum of grades must be equal to the max grade",
      });
      setStudentData({
        ...studentData,
        classworkScore: classWork,
        finalScore: finalExam,
        midtermScore: midTerm,
        totalGrade: classWork + finalExam + midTerm,
        grade: "",
        gpa: "",
      });
      classworkScoreRef.current.value = "";
      finalScoreRef.current.value = "";
      midtermScoreRef.current.value = "";
      setGrade(0);
      return;
    } else {
      setUserUX({
        error: false,
        errorMsg: "",
      });
      // Function to calculate the GPA from GPAData
      const totalGrade = classWork + finalExam + midTerm;
      let gpaRange = null;
      for (let i = 0; i < GPAData.length; i++) {
        const range = GPAData[i];
        if (totalGrade === 100) {
          gpaRange = GPAData[0];
          break;
        } else if (
          range.gpaFrom <= (4 * totalGrade) / 100 &&
          range.gpaTo > (4 * totalGrade) / 100
        ) {
          gpaRange = range;
          break;
        }
      }
      setStudentData({
        ...studentData,
        classworkScore: classWork,
        finalScore: finalExam,
        midtermScore: midTerm,
        totalGrade: totalGrade,
        grade: gpaRange.grade,
        gpa: (4 * totalGrade) / 100,
      });
      setGrade(totalGrade);
    }
  };

  return (
    <tr>
      <td className="table-container-items">{props.order}</td>
      <td className="table-container-items">{studentData.nationalId}</td>
      <td className="table-container-items">
        {i18next.language === "en"
          ? studentData.englishName
          : studentData.arabicName}
      </td>
      <td className="table-container-items">
        <input
          className="form-control"
          type="number"
          name="classworkScore"
          ref={classworkScoreRef ? classworkScoreRef : 0}
          onChange={handleRowChange}
          style={{
            width: "60px",
            margin: "auto",
          }}
        />
      </td>
      <td className="table-container-items">
        <input
          className="form-control"
          type="number"
          name="midtermScore"
          ref={midtermScoreRef ? midtermScoreRef : 0}
          onChange={handleRowChange}
          style={{
            width: "60px",
            margin: "auto",
          }}
        />
      </td>
      <td className="table-container-items">
        <input
          className="form-control"
          type="number"
          name="finalScore"
          ref={finalScoreRef ? finalScoreRef : 0}
          required
          onChange={handleRowChange}
          style={{
            width: "60px",
            margin: "auto",
          }}
        />
      </td>
      <td className="table-container-items">{grade ? grade : 0}</td>
      <td className="table-container-items">{studentData.grade}</td>
      <td className="table-container-items">{studentData.gpa}</td>
    </tr>
  );
};
