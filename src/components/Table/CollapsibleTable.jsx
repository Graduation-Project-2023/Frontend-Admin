import React from "react";
import { FormCard } from "../FormCard";
import { useTranslation } from "react-i18next";
import Accordion from 'react-bootstrap/Accordion';


export const CollapsibleTable = (props) => {
  const headerItems = props.headerItems;
  const rowItems = props.rowItems;
  const collapseLevel=props.collapseLevel

  return (
    <>
    <FormCard cardTitle={"helllllllo"}>
    <form>
       < div className="row mb-4">
    <label className="col-sm-2 col-form-label">{"testttt"}</label>
    <div className="col-sm-5">
    <input/>
      </div>
    </div>
    
      <button
          type="submit"
          className="form-card-button form-card-button-save"
        >
          `common.save`
        </button>
      
      </form>
    </FormCard>

    <Accordion defaultActiveKey={['0']} alwaysOpen className="collapseTable">
      {collapseLevel.map((item) => {
                return (
      <Accordion.Item eventKey={item.id} key={item.id}>
        <Accordion.Header>{item.arabicName} {item.level}</Accordion.Header>
        <Accordion.Body> 
        
      <form className="collapsetable">
        <table className="table">
          <thead>
            <tr>
            {headerItems.map((item) => {
                return (
                  <th key={item.id} className="collapsetable-header">
                    {item.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
          {rowItems.map((item) => {
              return (
            <tr key={item.id} >
            <td className="collapsetable-items">{item.code}</td>
            <td className="collapsetable-items">{item.englishName}</td>
            <td className="collapsetable-items">{item.arabicName}</td>
            </tr>
              );
          })}
          </tbody>
          </table>
            </form>
            
        </Accordion.Body>
        </Accordion.Item>
                );
              })}
      </Accordion>
  </>
  );
};
