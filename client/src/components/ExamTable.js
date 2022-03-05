import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTable } from 'react-table';
import MaUTable from '@material-ui/core/Table';
import { CssBaseline, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import api from '../api';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
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

const ExamTable = ({ data, isAdmin }) => {
  const columns = [
    {
      Header: 'Patient ID',
      accessor: 'patient_Id',
      // // filterable: true,
      Cell: props => {
        const { original } = props.cell.row;
        return (
          <Link to={{ pathname: '/Patient/', state: { PATIENT_ID: props.value } }}>
            <span data-item-id={original.name}>{props.value}</span>
          </Link>
        );
      },
    },
    {
      Header: 'Exam ID',
      accessor: 'exam_Id',
      Cell: props => {
        const { original } = props.cell.row;
        let patient_Id = props.cell.row.cells[0].value;
        let exam_Id = props.cell.row.cells[1].value;
        return (
          <Link
            to={{ pathname: '/DisplayExam', state: { patient_Id: patient_Id, exam_Id: exam_Id } }}>
            <span data-name={original.name}>{props.value}</span>
          </Link>
        );
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
      Header: 'Brixia Scores',
      Cell: props => {
        const { original } = props.cell.row;
        return <span data-timeframe={original.name}>{'1,2,3,4'}</span>;
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
    {
      Header: 'Zip Code',
      accessor: 'zip',
      Cell: props => {
        const { original } = props.cell.row;
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
              // return window.confirm('Are you sure you want to delete the Exam for this patient?')
              // console.log(props.cell)
              
              console.log(data)
              data.splice(props.cell, 1)
              console.log(data)
              api.deleteExam({EXAM_ID: props.cell.row.original['exam_Id'], PATIENT_ID: props.cell.row.original['patient_Id']}).then(() => {props.cell.row = undefined;});
              }}> Delete </Delete> </span>
          } 
        }
  ];

  if ({isAdmin}.isAdmin == true) { 
  return (
    <Wrapper>
      <CssBaseline />
      <Table data={data} columns={columns} />
    </Wrapper>
  );
}

if ({isAdmin}.isAdmin == false) { 
  return (
    <Wrapper>
      <CssBaseline />
      <Table data={data} columns={columns.slice(0,9)} />
    </Wrapper>
  );
} 
};


export default ExamTable;