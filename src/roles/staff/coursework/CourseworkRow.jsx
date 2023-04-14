import { useRef, useState, useEffect } from "react";
import { GPAData } from "./CourseworkData";

export const CourseworkRow = (props) => {
  const [studentData, setStudentData] = useState(props.student);
  const [grade, setGrade] = useState(
    +studentData.classWork + +studentData.finalExam
  );
  const [userUX, setUserUX] = useState({
    error: false,
    errorMsg: "",
  });
  const classWorkRef = useRef();
  const finalExamRef = useRef();

  useEffect(() => {
    classWorkRef.current.value = props.student.classWork;
    finalExamRef.current.value = props.student.finalExam;
    // eslint-disable-next-line
  }, []);

  const handleRowChange = (event) => {
    event.preventDefault();
    const classWork = +classWorkRef.current.value;
    const finalExam = +finalExamRef.current.value;

    if (classWork + finalExam > 100 || classWork < 0 || finalExam < 0) {
      setUserUX({
        error: true,
        errorMsg: "sum of grades must be equal to the max grade",
      });
      setStudentData({
        ...studentData,
        classWork: classWork,
        finalExam: finalExam,
        totalGrade: classWork + finalExam,
        grade: "",
        gpa: "",
      });
      classWorkRef.current.value = "";
      finalExamRef.current.value = "";
      setGrade(0);
      return;
    } else {
      setUserUX({
        error: false,
        errorMsg: "",
      });
      // Function to calculate the GPA from GPAData
      const totalGrade = classWork + finalExam;
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
        classWork: classWork,
        finalExam: finalExam,
        totalGrade: totalGrade,
        grade: gpaRange.grade,
        gpa: (4 * totalGrade) / 100,
      });
      setGrade(totalGrade);
    }
  };

  return (
    <tr>
      <td className="table-container-items">{studentData.code}</td>
      <td className="table-container-items">{studentData.name}</td>
      <td>
        <input
          className="form-control"
          type="number"
          name="classWork"
          ref={classWorkRef ? classWorkRef : 0}
          onChange={handleRowChange}
        />
      </td>
      <td>
        <input
          className="form-control"
          type="number"
          name="finalExam"
          ref={finalExamRef ? finalExamRef : 0}
          required
          onChange={handleRowChange}
        />
      </td>
      <td className="table-container-items">
        <input
          className="form-control"
          type="number"
          name="maxGrade"
          value={grade ? grade : 0}
          readOnly
          disabled
        />
      </td>
      <td className="table-container-items">{studentData.grade}</td>
      <td className="table-container-items">{studentData.gpa}</td>
    </tr>
  );
};
