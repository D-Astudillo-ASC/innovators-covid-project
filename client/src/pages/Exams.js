import React, { useState, useEffect } from 'react';
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
        setExams(res.data);
      })
      .catch(err => {
        console.log(`Error getting all exams: ${err}`);
      });
  }, []);
  return exams;
};
const columns = [
  {
    Header: 'Patient ID',
    accessor: 'patient_Id',
    // // filterable: true,
    Cell: props => {
      const { original } = props.cell.row;
      return <span data-item-id={original.name}>{props.value}</span>;
    },
  },
  {
    Header: 'Exam ID',
    accessor: 'exam_Id',
    Cell: props => {
      const { original } = props.cell.row;
      return <span data-name={original.name}>{props.value}</span>;
    },
  },
  {
    Header: 'Image',
    accessor: 'png_filename',
    Cell: props => {
      return (
        <img
          style={{ height: '80px', width: '80px' }}
          src={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${props.value}`}
        />
      );
    },
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
      return <span data-name={original.name}>{props.value}</span>;
    },
  },
];
const Exams = () => {
  const data = ExamData();
  return (
    <Wrapper>
      <CssBaseline />
      <Table data={data} columns={columns} />
    </Wrapper>
  );
};
export default Exams;
