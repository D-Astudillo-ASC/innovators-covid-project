import React, { Component } from 'react';
// import axios from 'axios';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Row, Col, FloatingLabel } from 'react-bootstrap';

class DisplayExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examId: '',
      imageUrl: '',
      keyFindings: '',
      brixiaScores: [],

      patientId: '',
      age: 0,
      sex: '',
      latest_bmi: 0,
      zip: 0,
    };
  }

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      const { patient_Id, exam_Id } = this.props.location.state;
      api
        .getPatByPatientId({ PATIENT_ID: patient_Id })
        .then(res => {
          let patient = res.data;
          this.setState(
            {
              patientId: patient['PATIENT_ID'],
              age: patient['AGE'],
              sex: patient['SEX'],
              latest_bmi: patient['LATEST_BMI'],
              zip: patient['ZIP'],
            },
            () => {
              api
                .getExam({ patient_Id: patient_Id, exam_Id: exam_Id })
                .then(res => {
                  let exam = res.data[0];
                  this.setState({
                    examId: exam['exam_Id'],
                    imageUrl: `https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${exam['png_filename']}`,
                    keyFindings: exam['key_findings'],
                    brixiaScores: '1,2,3,4',
                  });
                })
                .catch(err => {
                  console.log(`Error getting exam info: ${err}`);
                });
            },
          );
        })
        .catch(err => {
          console.log(`Error getting patient info: ${err}`);
        });
    }
  }

  render() {
    const {
      patientId,
      age,
      sex,
      latest_bmi,
      zip,
      examId,
      imageUrl,
      keyFindings,
      brixiaScores,
    } = this.state;

    return (
      <>
        {this.props.location.state === undefined ? (
          <Row className="justify-content-md-center"> Exam Not Found </Row>
        ) : (
          <Row className="justify-content-md-center">
            <Col md="auto">
              <h1>Patient Info</h1>

              {/* <h1>Patient Id:</h1> */}
              <Form.Label>Patient Id:</Form.Label>

              <p>{patientId}</p>

              {/* <h1>Age:</h1> */}
              <Form.Label>Age: </Form.Label>
              <p>{age}</p>

              {/* <h1>Sex:</h1> */}
              <Form.Label>Sex:</Form.Label>
              <p>{sex}</p>

              {/* <h1>BMI:</h1> */}
              <Form.Label>BMI:</Form.Label>
              <p>{latest_bmi}</p>

              {/* <h1>Zipcode:</h1> */}
              <Form.Label>Zipcode:</Form.Label>
              <p>{zip}</p>
            </Col>
            <Col md="auto">
              <h1>Exam Info</h1>

              {/* <h1>Exam Id:</h1> */}
              <Form.Label>Exam Id:</Form.Label>
              <p>{examId}</p>

              {/* <h1>Img URL:</h1> */}
              <Form.Label>Exam Image</Form.Label>
              <p>
                <img src={imageUrl || ''} style={{ height: '150px', width: '150px' }}></img>
              </p>
              {/* <h1>Date:</h1> */}
              <Form.Label>Date:</Form.Label>
              <p></p>

              {/* <h1>Key Findings:</h1> */}
              <Form.Label>Key Findings:</Form.Label>
              <p>{keyFindings}</p>

              {/* <h1>Brixia Scores:</h1> */}
              <Form.Label>Brixia Scores:</Form.Label>
              <p>{brixiaScores}</p>
            </Col>
          </Row>
        )}
      </>
    );
  }
}

export default DisplayExam;
