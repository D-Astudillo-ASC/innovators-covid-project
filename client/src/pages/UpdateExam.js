import React, { Component } from 'react';
import axios from 'axios';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Row, Col, FloatingLabel } from 'react-bootstrap';

class UpdateExam extends Component {
  constructor(props) {
    super(props);
    this.onChangeExamId = this.onChangeExamId.bind(this);
    this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
    this.onChangeXrayType = this.onChangeXrayType.bind(this);
    this.onChangeKeyFindings = this.onChangeKeyFindings.bind(this);
    this.onChangeBrixiaScores = this.onChangeBrixiaScores.bind(this);
    this.onChangePatientId = this.onChangePatientId.bind(this);
    this.onChangePatientAge = this.onChangePatientAge.bind(this);
    this.onChangePatientSex = this.onChangePatientSex.bind(this);
    this.onChangePatientBmi = this.onChangePatientBmi.bind(this);
    this.onChangePatientZipcode = this.onChangePatientZipcode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      examPatientId: '',
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
      axios
        .get('http://localhost:3000/api/exam' + this.props.match.params.id)
        .then(response => {
          api.getExam({ patient_Id: patient_Id, exam_Id: exam_Id }).then(res => {
            this.setState({
              examPatientId: response.data.examPatientId,
              examId: response.data.examId,
              imageUrl: response.data.imageUrl,
              keyFindings: response.data.keyFindings,
              brixiaScores: response.data.brixiaScores,
            });
          });
        })
        .catch(err => {
          console.log(`Error getting exam info: ${err}`);
        });
      axios
        .get('http://localhost:3000/api/patient' + this.props.match.params.id)
        .then(response => {
          let patient = response.data;
          api.getPatByPatientId({ PATIENT_ID: patient_Id }).then(res => {
            this.setState({
              patientId: patient['PATIENT_ID'],
              age: patient['AGE'],
              sex: patient['SEX'],
              latest_bmi: patient['LATEST_BMI'],
              zip: patient['ZIP'],
            });
          });
        })
        .catch(err => {
          console.log(`Error getting patient info: ${err}`);
        });
    }
  }

  /**   onChangeExamPatientId(e){
     this.setState({examPatientId: e.target.value});
  }**/

  onChangeExamId(e) {
    this.setState({ examId: e.target.value });
  }

  onChangeImageUrl(e) {
    this.setState({ imageUrl: e.target.value });
  }

  onChangeXrayType(e) {
    this.setState({ xrayType: e.target.value });
  }

  onChangeKeyFindings(e) {
    this.setState({ keyFindings: e.target.value });
  }

  onChangeBrixiaScores(e) {
    this.setState({ brixiaScores: e.target.value.split(',') });
  }

  onChangePatientId(e) {
    this.setState({ patientId: e.target.value });
  }

  onChangePatientAge(e) {
    this.setState({ age: parseInt(e.target.value) });
  }

  onChangePatientSex(e) {
    this.setState({ sex: e.target.value });
  }

  onChangePatientBmi(e) {
    this.setState({ latest_bmi: e.target.value });
  }

  onChangePatientZipcode(e) {
    this.setState({ zip: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    alert('Form Submitted!');
    console.log(`Form submitted`);
    console.log(this.state.examPatientId);
    console.log(this.state.examId);
    console.log(this.state.imageUrl);
    console.log(this.state.keyFindings);
    console.log(this.state.brixiaScores);

    const exams = {
      examPatientId: this.state.patientId,
      examId: this.state.examId,
      imageUrl: this.state.imageUrl,
      keyFindings: this.state.keyFindings,
      brixiaScores: this.state.brixiaScores,
    };

    const patients = {
      patientId: this.state.patientId,
      age: this.state.age,
      sex: this.state.sex,
      latest_bmi: this.state.latest_bmi,
      zipcode: this.state.zipcode,
    };

    axios
      .post('http://localhost:3000/api/exam' + this.props.match.params.id, exams)
      .then(res => console.log(res.data));

    axios
      .post('http://localhost:3000/api/patient' + this.props.match.params.id, patients)
      .then(res => console.log(res.data));

    this.props.history.push('/');
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Patient Info</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Patient Id:</Form.Label>
              <input
                type="text"
                className="form-control"
                value={this.state.patientId}
                onChange={this.onChangePatientId}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Age:</Form.Label>
              <input
                type="number"
                className="form-control"
                value={this.state.age}
                onChange={this.onChangePatientAge}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Sex:</Form.Label>
              <input
                type="text"
                className="form-control"
                value={this.state.sex}
                onChange={this.onChangePatientSex}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>BMI:</Form.Label>
              <input
                type="number"
                className="form-control"
                value={this.state.bmi}
                onChange={this.onChangePatientBmi}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Zipcode:</Form.Label>
              <input
                type="Number"
                className="form-control"
                value={this.state.zipcode}
                onChange={this.onChangePatientZipcode}
              />
            </Form.Group>
          </Col>
          <Col md="auto">
            <h1>Exam Info</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Exam Id:</Form.Label>
              <input
                type="text"
                className="form-control"
                value={this.state.examId}
                onChange={this.onChangeExamId}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Img URL:</Form.Label>
              <input
                type="text"
                className="form-control"
                value={this.state.imageUrl}
                onChange={this.onChangeImageUrl}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date:</Form.Label>
              <input type="text" className="form-control" />
            </Form.Group>

            <Form.Label>Key Findings:</Form.Label>
            <FloatingLabel controlId="floatingTextarea2" label="Key Findings">
              <input
                className="form-control"
                as="textarea"
                placeholder="Write key findings here"
                style={{ height: '100px' }}
                value={this.state.keyFindings}
                onChange={this.onChangeKeyFindings}
              />
            </FloatingLabel>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Brixia Scores:</Form.Label>
              <input
                type="text"
                className="form-control"
                value={this.state.brixiaScores}
                onChange={this.onChangeBrixiaScores}
              />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg">
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default UpdateExam;
