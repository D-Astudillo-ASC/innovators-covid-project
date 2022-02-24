import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Exams } from '../pages';

class DisplayExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: {
        patientId: '',
        examId: '',
        imageImg: '',
        xrayType: '',
        keyFindings: '',
        brixiaScores: [],
      },
      patients: {
        patientId: '',
        age: 0,
        sex: '',
        bmi: 0,
        zipcode: 0,
      },
    };
  }

  render() {
    return (
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Form>
            <h1>Patient Info</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Patient Id:</Form.Label>
              {/* const patentId = localStorage.getItem.('patientId') */}
              {/* <Form.Control type={document.getElementById().value} /> */}
              {/* <Form.Control type="text" /> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Age:</Form.Label>
              {/* <Form.Control type="text" /> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Sex:</Form.Label>
              {/* <Form.Control type="text" />  */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>BMI:</Form.Label>
              {/* <Form.Control type="text" />  */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Zipcode:</Form.Label>
              {/* <Form.Control type="text" /> */}
            </Form.Group>
          </Form>
        </Col>
        <Col md="auto">
          <Form>
            <h1>Exam Info</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Exam Id:</Form.Label>
              {/* <Form.Control type="text" /> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Img URL:</Form.Label>
              {/* <Form.Control type="text" /> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date:</Form.Label>
              {/* <Form.Control type="text" /> */}
            </Form.Group>

            <Form.Label>Key Findings:</Form.Label>
            {/* <FloatingLabel controlId="floatingTextarea2" label="Key Findings"> */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Control
                as="textarea"
                placeholder="Write key findings here"
                style={{ height: '100px' }}
              /> */}
              {/* </FloatingLabel> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Brixia Scores:</Form.Label>
              {/* <Form.Control type="text" /> */}
            </Form.Group>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default DisplayExam;
