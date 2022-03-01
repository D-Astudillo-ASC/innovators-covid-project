import React, { useState, useEffect } from 'react';
import api from '../api';
<<<<<<< HEAD
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
=======
import ExamTable from '../components/ExamTable';
const ExamsData = () => {
>>>>>>> origin
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
<<<<<<< HEAD
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

=======
>>>>>>> origin
const Exams = () => {
  const data = ExamsData();
  return <ExamTable data={data} isAdmin={false} />;
};
export default Exams;
