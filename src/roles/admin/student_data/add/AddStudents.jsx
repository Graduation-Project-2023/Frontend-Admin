import { useState } from "react";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import styles from "./AddStudents.module.scss";
import { useRef} from "react";
import {TbFileUpload} from 'react-icons/tb';
import {MdErrorOutline} from 'react-icons/md';
import {BsFillPersonCheckFill} from 'react-icons/bs';
import { StudentsWrongData } from "./StudentsWrongData";
 

export const AddStudents = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();
  
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    console.log(event.dataTransfer.files)
  }; 

  /*if (files) return (
    <div className="uploads">
      <ul>
        {Array.from(files).map((file, idx) => <li key= {idx}>{file.name}</li> ) }
      </ul>

    </div>
  )
*/
  
  const [error, setError] = useState({
    state: false,
    errorMessage: "",
    success: true,
    table: false,
  });

  return (

    <FormNavbarContainer>
      {!files && (
      <div className={styles.addform}>
        <div className={styles.dashform}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        >
         <div className={styles.dashform_icon}> <TbFileUpload/></div>
          <h4 className={styles.dashform_text}>قم بسحب وافلات ملفات ال CSV</h4>
          <input
          type="file"
          multiple
          onChange={(event) => setFiles(event.target.files)}
          hidden
          ref ={inputRef}
          />
        </div>
      </div>
      )}
     

      {/*  success modal */}
      {error. success && (
        <ModalPopup
          child={true}
          closeModal={() => {
            setError({ success: false });
          }}
        >
          <div className={styles.successMessage}>
          <div className={styles.successMessage_icon}> <BsFillPersonCheckFill/> </div>
          <h4 className={styles.successMessage_text}>تم بنجاح</h4>
          <h5 className={styles.successMessage_txt} >كل شئ يبدو على ما يرام,من فضلك اضغط على "حفظ" للمتابعة.</h5>
          <button className={styles.successMessage_btn}>حفظ</button>
          </div>
          
        </ModalPopup>
      )}

       {/* Error modal */}
       {error.state && (
        <ModalPopup
          child={true}
          closeModal={() => {
            setError({ state: false });
          }}
        >
          <div className={styles.errorMessage}>
          <div className={styles.errorMessage_icon}> <MdErrorOutline/> </div>
          <h4 className={styles.errorMessage_text}>عفوا..!</h4>
          <h5 className={styles.errorMessage_txt} >يبدو ان هناك خطأ منه من فضلك حاول مرة اخرى</h5>
          <button className={styles.errorMessage_btn}>متابعة</button>
          </div>
          
        </ModalPopup>
      )}

      <div></div>

       {/* Table */}
       {error.table && (
        <table className={styles.tableHead}
          child={true}
          closeModal={() => {
            setError({ table: false });
          }}
        >
       
         <thead>
          <tr  >
            <th className={styles.tableHead_title}>الاسم</th>
            <th className={styles.tableHead_title}>الرقم القومى</th>
          </tr>
         </thead>
         <tbody>
         {
              StudentsWrongData.map((value, key) => {
                return(
                  <tr key= {key}>
                    <td className={styles.tableHead_data}>{value.name}</td>
                    <td className={styles.tableHead_error}>{value.nationalId}</td>
                  </tr>
                )
              })
            }
         </tbody>
          
        </table>
)}

     
   <div className={styles.ohhh}></div>       

    </FormNavbarContainer>
  );
};
