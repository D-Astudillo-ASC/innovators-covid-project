import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Card, Row, Col, FloatingLabel} from 'react-bootstrap';


class DisplayExam extends Component{
    constructor(props) {
        super(props);
        this.state = {
               examPatientId: '',
               examId: '',
               imageUrl: '',
               keyFindings: '',
               brixiaScores: [],

               patientId: '',
               age: 0,
               sex: '',
               bmi: 0,
               zipcode: 0
          
        };
      }
     
      componentDidMount(){
         axios.get('http://localhost:3000/api/exam/'+this.props.match.params.id)
              .then(res =>{
                  console.log(res.data);
                this.setState({
                    examPatientId: res.patient_id,
                    examId: res.exam_Id,
                    imageUrl: res.image_url,
                    keyFindings: res.key_findings,
                    brixiaScores: res.brixia_scores,
                })
            
            })
            .catch(err => {
                console.log("Error form show exams details")
            })

        axios.get('http://localhost:3000/api/patient/'+this.state.examPatientId)
            .then(res =>{
                console.log(res.data);
              this.setState({
                patientId: res.patient_id,
                age: res.age,
                sex: res.sex,
                bmi: res.bmi,
                zipcode: res.zipcode
              })
          
          })
          .catch(err => {
              console.log("Error form show patients details")
          })

      }

      render(){
          const exams = this.state;
          return(
             <Row className="justify-content-md-center">
            <Col md="auto">
                 <h1>Patient Info</h1>

                <h1>Patient Id:</h1>
                <p>{exams.patientId}</p>

                <h1>Age:</h1>
                <p>{exams.age}</p>

                <h1>Sex:</h1>
                <p></p>

                <h1>BMI:</h1>
                <p>{exams.bmi}</p>

                <h1>Zipcode:</h1>
                <p>{exams.zipcode}</p>
            </Col>
            <Col md="auto">
                <h1>Exam Info</h1>

                <h1>Exam Id:</h1>
                <p>{exams.examId}</p>

                <h1>Img URL:</h1>
                <img src={exams.imageUrl}></img>

                <h1>Date:</h1>
                <p></p>

                <h1>Key Findings:</h1>
                <p>{exams.keyFindings}</p>

                <h1>Brixia Scores:</h1>
                <p>{exams.brixiaScores}</p>

            </Col>
            </Row>
         
          )
      }
}

export default DisplayExam;