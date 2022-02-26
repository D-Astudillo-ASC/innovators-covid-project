import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { useTable } from 'react-table';
import api from '../api';
import MaUTable from '@material-ui/core/Table';
import { CssBaseline, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;

  @media screen and (max-width: 420px) {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
`;

const Delete = styled.a`
  color: red;
  text-decoration: none; 
`;

const Update = styled.a`
  color: blue;
  text-decoration: none; 
`;

const Table = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow data-row-item-id={row.values._id} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

const ExamData = () => {
  let [exams, setExams] = useState([]);
  useEffect(() => {
    api
      .getAllExams()
      .then(res => {
        //console.log(res.data);
        // const examData = res.data;
        //console.log(res.data);
        //setExams([...res.data]);
        return res.data;
      })
      .then(examData => {
        examData.forEach(exam => {
          api
            .getPatient(exam.patient_Id)
            .then(patient => {
              const patientData = patient.data[0];
              exam['age'] = patientData['AGE'];
              exam['sex'] = patientData['SEX'];
              exam['latest_bmi'] = patientData['LATEST_BMI'];
              //console.log(exam);
            })
            .catch(patientError => {
              console.log(`Error getting patient data: ${patientError}`);
            });
        });
        //let examsPatArr = Promise.all(examsPatPromises);
        setExams(examData);
      })
      .catch(err => {
        console.log(`Error getting all exams: ${err}`);
      });
  }, []);
  return exams;
  // <ul>
  //   {exams.map(exam => (
  //     <li key={`exam-${exam._id}`}>{exam.patient_Id}</li>
  //   ))}
  // </ul>;
};
const columns = [
  {
    Header: 'Patient ID',
    accessor: 'patient_Id',
    // // filterable: true,
    Cell: props => {
      const { original } = props.cell.row;
      return (
        <Link to="DisplayPatientInfo">
          <span data-item-id={original.name}>{props.value}</span>
        </Link>
      );
    },
  },
  {
    Header: 'Exam ID',
    accessor: 'exam_Id',
    // filterable: true,
    Cell: props => {
      const { original } = props.cell.row;
      return (
        <Link to="/DisplayExam">
          <span data-name={original.name}>{props.value}</span>
        </Link>
      );
    },
  },

  {
    Header: 'Image',
    // accessor: 'daysOfWeek',
    // // filterable: true,
    // Cell: props => {
    //   const { daysOfWeek } = props.cell.row.original;
    //   let daysToDisplay = '';
    //   if (daysOfWeek && typeof daysOfWeek === 'object') {
    //     for (const day in daysOfWeek) {
    //       daysToDisplay =
    //         daysToDisplay === '' ? daysOfWeek[day] : `${daysToDisplay}, ${daysOfWeek[day]}`;
    //     }
    //   }
    //   return (
    //     <span
    //       data-daysofweek={daysOfWeek && JSON.stringify(daysOfWeek)}
    //       data-daysofweek-by-id={props.value}>
    //       {daysToDisplay || '-'}
    //     </span>
    //   );
    // },
  },
  {
    Header: 'Key Findings',
    accessor: 'key_findings',
    Cell: props => {
      const { original } = props.cell.row;
      return <span data-timeframe={original.name}>{props.value || '-'}</span>;
    },
  },
  {
    Header: 'Brixia Score',
    accessor: 'priority',
    // filterable: true,
    Cell: props => {
      const { original } = props.cell.row;
      return <span data-priority={original.priority}>{props.value}</span>;
    },
  },
  {
    Header: 'Age',
    accessor: 'age',
    Cell: props => {
      const { original } = props.cell.row;
      return <span data-name={original.name}>{props.value}</span>;
    },
  },
  {
    Header: 'Sex',
    accessor: 'sex',
    Cell: props => {
      const { original } = props.cell.row;
      return <span data-name={original.name}>{props.value}</span>;
    },
  },
  {
    Header: 'BMI',
    accessor: 'latest_bmi',
    Cell: props => {
      const { original } = props.cell.row;
      console.log('Bmi props');
      console.log(props);
      // console.log(props.cell.row);

      return <span data-name={original.name}>{props.value}</span>;
    },
  },
  {
    Header: 'Zip Code',
    accessor: 'zip',
    Cell: props => {
      const { original } = props.cell.row;
      // console.log(props.cell);
      console.log(props.cell.row.original['patient_Id']);
      return <span data-name={original.name}>{props.value}</span>;
    },

  },
  {
    // MOVE TO ADMIN 
    Header: 'Admin Privileges',
    Accessor: (str) => 'delete', 
    Cell: props => { 
    return <span><Update href= "UpdateExam.js"> Update </Update>
          {/* <Delete onClick ={() => {deleteExam(props.values["patient_Id"], props.values['exam_Id']);}}> Delete </Delete> </span> */}
          <Delete onClick ={() => {
            // prompt to confrim delete then make api call to get rid of row
            api.deleteExam({EXAM_ID: props.cell.row.original['exam_Id'], PATIENT_ID: props.cell.row.original['patient_Id']}).then(() => {});
            props.cell.row = undefined; 
            // constd ataCopy = [...Exams]; 
            // dataCopy.splice(props.index, 1);
            // setExams(dataCopy); 
            // console.log(dataCopy);
              // let exams = this.state.exams([]);
              // exams.splice(exams.index, 1);
              // this.setState({exams})
            }}> Delete </Delete> </span>
        }
      }
];

const Exams = () => {
  const data = ExamData();
  // console.log('data');
  // console.log(data);
  return (
    <Wrapper>
      {(data || []).length > 0 ? ( // defeats the purpose of using `isLoading` prop?
        <>
          <CssBaseline />
          <Table data={data} columns={columns} />
        </>
      ) : (
        `No items to render... :(`
      )}
      {/* {(items || []).length > 0 ? (
      <CssBaseline />
      <Table data={ExamData()} columns={columns} />
      ) : ("")} */}
      {/* <CssBaseline />
      <Table data={ExamData()} columns={columns} /> */}
    </Wrapper>

    //   <Wrapper>
    //     <CssBaseline />
    //     {/* {(items || []).length > 0 ? ( */}
    //     {(data || []).length > 0 ? (
    //       // <Table data={items} columns={columns} />
    //       <Table data={data} columns={columns} />
    //     ) : (
    //       `No items to render... :(`
    //     )}
    //   </Wrapper>
  );
};
export default Exams;
