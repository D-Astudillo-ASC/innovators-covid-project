import React, { useState, useEffect } from 'react';
import api from '../api';
import ExamTable from '../components/ExamTable';
const ExamsData = () => {
  let [exams, setExams] = useState([]);
  useEffect(() => {
    api
      .getAllExams()
      .then(res => {
        setExams(res.data);
      })
      .catch(err => {
        console.log(`Error getting all exams: ${err}`);
      });
  }, []);
  return exams;
};
const Exams = () => {
  const data = ExamsData();
  return <ExamTable data={data} isAdmin={true}/>;
};
export default Exams;