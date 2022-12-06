import React from 'react'
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export const ControlSystem = () => {
  const { t } = useTranslation();
  
  const [values,setValues]=useState({classwork:"",midterm:"",final:"",maxGrade:""})
  const [classwork,setClasswork]=useState('')
  const [midterm,setMidterm]=useState('')
  const [final,setFinal]=useState('')
  const [maxGrade,setMaxGrade]=useState('')
  const onChange=(e)=>{
      let name=e.target.name;
      let value=e.target.value;
      const newValues = {
      ...values,
      [name]: value
  } 
  setValues(newValues)
  calcMax(newValues) 
  }
  const calcMax = (newValues) => {
  const { classwork,midterm,final} = newValues;
  const newMax = parseInt(classwork,10)+parseInt(midterm,10)+parseInt(final,10)
  setMaxGrade(newMax)
  } 
  
  
  return ( 
  <form>
         <div className="row mb-4">
            <label className="col-sm-1 col-form-label">
              {t("courses.class")}
            </label>
            <div className="col-sm-2">
          <input onChange={onChange} defaultValue={classwork} name='classwork' id="classwork" type="number"/>
          </div>
  
          <label className="col-sm-2 col-form-label">
              {t("courses.mid")}
            </label>
            <div className="col-sm-2">
          <input onChange={onChange} defaultValue={midterm} name="midterm"  id="midterm" type="number"/>
          </div>
  
          <label className="col-sm-2 col-form-label">
              {t("courses.final")}
            </label>
            <div className="col-sm-2">
          <input onChange={onChange} defaultValue={final} id="final" name="final" type="number"/>
          </div>
  
  
         </div>
         <div className="row mb-4">
            <label className="col-sm-1 col-form-label">{t("grades.max")}</label>
            <div className="col-sm-2">
            <input  disabled onChange={onChange} defaultValue={maxGrade} id="maxGrade" name="maxGrade" type="number"/>
            </div>
            </div>
      </form> );
  }