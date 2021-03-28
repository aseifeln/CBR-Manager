import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Media, Button } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CookieChecker from '../components/CookieChecker';
import Modal from 'react-modal';
import { FieldInput } from "../components/MultiStepForm";
import { Formiz, useForm } from '@formiz/core';
import moment from 'moment';

function BaselineSurveyInfo(props) {

    const [ baselineSurvey, setBaselineSurvey ] = useState({});
    const [ baselineSurveyFound, setBaselineSurveyFound ] = useState(true);
    document.title = "Baseline Survey Details";

    useEffect(() => {
        axios.get('/baselineSurvey/' + props.match.params.id)
        .then(response => {
            setBaselineSurvey(response.data[0]);
            setBaselineSurveyFound(true);
        })
        .catch(error => {
            createSurvey();
            //console.log(error);
            //document.title = "Baseline survey not found";
        })
    },[])

    function createSurvey() {
        console.log("creating survey")
        setBaselineSurvey(
        {
              "Date": "01-01-21",
              "DateEdited":"01-01-21",
              "Worker":{
                 "WorkerId": "4e939a20-93a9-430e-aff1-bb1d66746ca2",
                 "FirstName": "Danica",
                 "LastName": "Walton"
               },
              "Client": {
                "ClientId": "1",
                "FirstName": "Filbert",
                "LastName": "Olayinka"
              },
              "SocialSurvey": {
                "ValuedCommunityMember" : "",
                "Independence" : "",
                "CommunityParticipation" : "",
                "DisabilityImpact" : "",
                "Discrimination" : "",
              },
              "ShelterSurvey": {
                "ShelterAccess" : "",
                "EssentialsAccess" : "",
              },
              "HealthSurvey": {
                "HealthStatus" : "",
                "RehabilitationAccess" : "",
                "RehabilitationAccessNeeded" : "",
                "AssistiveDevice" : "",
                "AssistiveDeviceWorking" : "",
                "AssistiveDeviceNeeded" : "",
                "AssistiveDeviceRequired" : "",
                "HealthServiceStatus" : "",
              },
              "EducationSurvey": {
                "SchoolState" : "",
                "CurrentGrade" : "",
                "NoSchoolReason" : "",
                "SchoolBefore" : "",
                "WantSchool" : "",
              },
              "NutritionSurvey": {
                "FoodStatus" : "",
                "MonthlyFoodAccess" : "",
                "ChildNutritionStatus" : "",
              },
              "LivelihoodSurvey": {
                "WorkStatus" : "",
                "WorkDescription" : "",
                "EmploymentType" : "",
                "FinancialNeedsMet" : "",
                "DisabilityImpact" : "",
                "WorkWanted" : "",
              },
              "EmpowermentSurvey": {
                "DisabilityOrganizationMember" : "",
                "DisabilityOrganizations" : "",
                "AwareDisabilityRights" : "",
                "Influential" : "",
              }

          });

          console.log(baselineSurvey)
      }

    if(!baselineSurveyFound) {

        return(
            <div>
                <h1>Baseline Survey Not Found</h1>
            </div>

        )
    }

    function DisplaySocialSurvey(props){
        console.log("function called ")
        console.log(props.socialSurvey)

        if (props.socialSurvey == null) {
            return;
        }

        return(
            <>
            <hr/>
            <Row>
                <Col>
                    <h3 className='font-weight-bold' style={{fontSize: '22px'}}>Social Survey</h3>
                </Col>
            </Row>
            <hr/>
            </>
        )
    }


    function DisplayShelterSurvey(props){
        if (props.shelterSurvey == null) {
            return;
        }

        return(
            <>
            <hr/>
            <Row>
                <Col>
                    <h3 className='font-weight-bold' style={{fontSize: '22px'}}>Shelter Survey</h3>
                </Col>
            </Row>
            <hr/>
            </>
        )
    }

    function DisplayHealthSurvey(props){
        if (props.healthSurvey == null) {
            return;
        }

        return(
            <>
            <hr/>
            <Row>
                <Col>
                    <h3 className='font-weight-bold' style={{fontSize: '22px'}}>displayHealthSurvey</h3>
                </Col>
            </Row>
            <hr/>
            </>
        )
    }

    function DisplayEducationSurvey(props){
        if (props.educationSurvey == null) {
            return;
        }

        return(
            <>
            <hr/>
            <Row>
                <Col>
                    <h3 className='font-weight-bold' style={{fontSize: '22px'}}>displayEducationSurvey</h3>
                </Col>
            </Row>
            <hr/>
            </>
        )
    }

    function DisplayNutritionSurvey (props){
        if (props.nutritionSurvey == null) {
            return;
        }

        return(
            <>
            <hr/>
            <Row>
                <Col>
                    <h3 className='font-weight-bold' style={{fontSize: '22px'}}>displayNutritionSurvey </h3>
                </Col>
            </Row>
            <hr/>
            </>
        )
    }

    function DisplayLivelihoodSurvey (props){
        if (props.livelihoodSurvey == null) {
            return;
        }

        return(
            <>
            <hr/>
            <Row>
                <Col>
                    <h3 className='font-weight-bold' style={{fontSize: '22px'}}>displayLivelihoodSurvey </h3>
                </Col>
            </Row>
            <hr/>
            </>
        )
    }

    function DisplayEmpowermentSurvey (props){
        if (props.empowermentSurvey == null) {
            return;
        }

        return(
            <>
            <hr/>
            <Row>
                <Col>
                    <h3 className='font-weight-bold' style={{fontSize: '22px'}}>displayEmpowermentSurvey </h3>
                </Col>
            </Row>
            <hr/>
            </>
        )
    }

    return(
        <Container>
            <div>
                <CookieChecker></CookieChecker>
                <Row>
                    <Col>
                        <Button tag={Link} to={'/client/'+ baselineSurvey.Client?.ClientId}>Back to Client</Button>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col><h1>Baseline Survey</h1></Col>
                </Row>
                <Row>
                    <Col><h5><b>Client Name: </b>{baselineSurvey.Client?.FirstName + ' ' + baselineSurvey.Client?.LastName}</h5></Col>
                </Row>
                <Row>
                    <Col><h5><b>Date: </b>{moment(baselineSurvey.Date).format('DD-MM-YYYY')}</h5></Col>
                </Row>
                <br/>
                <Row>
                    <Col><h1>Survey Details</h1></Col>
                </Row>

                <DisplaySocialSurvey title="Social Survey" socialSurvey={baselineSurvey.SocialSurvey}/>
                <DisplayShelterSurvey title="Shelter Survey" shelterSurvey={baselineSurvey.ShelterSurvey}/>
                <DisplayHealthSurvey title="Health Survey" healthSurvey={baselineSurvey.HealthSurvey}/>
                <DisplayEducationSurvey title="Education Survey" educationSurvey={baselineSurvey.EducationSurvey}/>
                <DisplayNutritionSurvey title="Nutrition Survey" nutritionSurvey={baselineSurvey.NutritionSurvey}/>
                <DisplayLivelihoodSurvey title="Livelihood Survey" livelihoodSurvey={baselineSurvey.LivelihoodSurvey}/>
                <DisplayEmpowermentSurvey title="Empowerment Survey" empowermentSurvey={baselineSurvey.EmpowermentSurvey}/>

            </div>
        </Container>
    );

}

export default BaselineSurveyInfo;