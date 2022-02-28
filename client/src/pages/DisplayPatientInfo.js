import React, { useState, useEffect } from 'react';
import ExamTable from '../components/ExamTable';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';

const ExamData = patient_Id => {
  let [exams, setExams] = useState([]);
  useEffect(() => {
    api
      .getExamsByPatientId({ patient_Id: patient_Id })
      .then(res => {
        setExams(res.data);
      })
      .catch(err => {
        console.log(`Error getting all exams: ${err}`);
      });
  }, []);
  return exams;
};
const DisplayPatientInfo = props => {
  let component;
  if (props.location.state !== undefined) {
    let patient_Id = props.location.state.PATIENT_ID;
    let examData = ExamData(patient_Id);
    console.log(examData);
    component = (
      <>
        <Row className="justify-content-md-center"> Patient Details </Row>
        <Row className="justify-content-md-center">{`Patient ID: ${patient_Id}`}</Row>
        <Row className="justify-content-md-center">{`Number of Exams: ${examData.length}`}</Row>
        <ExamTable data={examData} isAdmin={false} />
      </>
    );
  } else {
    component = <Row className="justify-content-md-center"> Patient Not Found </Row>;
  }

  return component;
};

export default DisplayPatientInfo;
