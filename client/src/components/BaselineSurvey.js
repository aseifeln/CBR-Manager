import React, {useContext, useEffect,useState} from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import {Table} from 'reactstrap';
import axios from 'axios';

function BaselineSurvey(props){

    const [ baselineSurvey, setBaselineSurvey ] = useState({});
    const [ baselineSurveyFound, setBaselineSurveyFound ] = useState(false);

    const [ surveyType, setSurveyType ] = useState(props.surveyType);

    useEffect(() => {
        console.log("in baseline: ", surveyType)
        axios.get('baselineSurvey/' + props.clientId)
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
        setBaselineSurvey(
            {
              "Date": "01-01-21",
              "DateEdited":"01-01-21",
              "Client": {
                "ClientId": "1",
                "FirstName": "Filbert",
                "LastName": "Olayinka"
              },
              "SocialSurvey": {
                  "ValuedCommunityMember" : null,
                  "Independence" : true,
                  "CommunityParticipation" : false,
                  "DisabilityImpact" : false,
                  "Discrimination" : true,
              },
              "ShelterSurvey": {
                "ShelterAccess" : true,
                "EssentialsAccess" : true,
              },
              "HealthSurvey": {
                  "HealthStatus" : "Good",
                  "RehabilitationAccess" : true,
                  "RehabilitationAccessNeeded" : false,
                  "AssistiveDevice" : true,
                  "AssistiveDeviceWorking" : true,
                  "AssistiveDeviceNeeded" : false,
                  "AssistiveDeviceRequired" : "N/A",
                  "HealthServiceStatus" : "5",
              },
              "EducationSurvey": {
                "SchoolState" : true,
                "CurrentGrade" : "5",
                "NoSchoolReason" : null,
                "SchoolBefore" : true,
                "WantSchool" : true,
              },
              "NutritionSurvey": {
                  "FoodStatus" : "Adequate",
                  "MonthlyFoodAccess" : true,
                  "ChildNutritionStatus" : "N/A",
              },
              "LivelihoodSurvey": {
                  "WorkStatus" : false,
                  "WorkDescription" : "",
                  "EmploymentType" : "",
                  "FinancialNeedsMet" : false,
                  "DisabilityImpact" : true,
                  "WorkWanted" : true,
              },
              "EmpowermentSurvey": {
                  "DisabilityOrganizationMember" : true,
                  "DisabilityOrganizations" : "Disability Org1, Org 2, Organizaion 3",
                  "AwareDisabilityRights" : true,
                  "Influential" : false,
              }
          });
    }

    function InsertYesOrNoImg(props) {
        if (props.bool == undefined) {
            return (<td>--</td>);
        }
        if (props.bool) {
            //image: https://www.flaticon.com/free-icon/check-mark_1722017
            return (<td> <img src="/checkmark.png" style={{width:22}}/> </td>)
        }
        return (<td> <img src="/redX.png" style={{width:22}}/> </td>);
    }

    function InsertSpecificSurvey() {
        console.log("in baseline: ", surveyType)
        switch(surveyType) {
            case 'Health':
                return HealthSurvey();
            case 'Social':
                return SocialSurvey();
            case 'Education':
                return EducationSurvey();
            case 'Livelihood':
                return LivelihoodSurvey();
            case 'Food/Nutrition':
                return NutritionSurvey();
            case 'Empowerment':
                return EmpowermentSurvey();
            case 'Shelter/Care':
                return ShelterSurvey();
        }
        return null;
    }

    function HealthSurvey() {
        const {HealthSurvey} = baselineSurvey;
        return(
            <div>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Inquiry</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>General Health</td>
                      <td>{HealthSurvey?.HealthStatus ? HealthSurvey.HealthStatus : "--"}</td>
                    </tr>
                    <tr>
                      <td>Current access to rehabilitation services</td>
                      <InsertYesOrNoImg bool={HealthSurvey?.RehabilitationAccess}/>
                    </tr>
                    <tr>
                      <td>Need for access to rehabilitation services</td>
                      <InsertYesOrNoImg bool={HealthSurvey?.RehabilitationAccessNeeded}/>
                    </tr>
                    <tr>
                      <td>Has assistive device</td>
                      <InsertYesOrNoImg bool={HealthSurvey?.AssistiveDevice}/>
                    </tr>
                    <tr>
                      <td>Assistive device working</td>
                      <InsertYesOrNoImg bool={HealthSurvey?.AssistiveDeviceWorking}/>
                    </tr>
                    <tr>
                      <td>Assistive device needed</td>
                      <InsertYesOrNoImg bool={HealthSurvey?.AssistiveDeviceNeeded}/>
                    </tr>
                    <tr>
                      <td>Which assistive device needed</td>
                      <td> {HealthSurvey?.AssistiveDeviceRequired ? HealthSurvey.AssistiveDeviceRequired : "--"}</td>
                    </tr>
                    <tr>
                      <td>Satisfaction with current health services</td>
                      <td>{HealthSurvey?.HealthServiceStatus ? HealthSurvey.HealthServiceStatus : "--" }</td>
                    </tr>
                  </tbody>
                </Table>
            </div>
        );
    }

    function SocialSurvey() {
        const {SocialSurvey} = baselineSurvey;
        return(
            <div>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Inquiry</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Feel valued as a community member</td>
                        <InsertYesOrNoImg bool={SocialSurvey?.ValuedCommunityMember}/>
                    </tr>
                    <tr>
                      <td>Feel independent</td>
                        <InsertYesOrNoImg bool={SocialSurvey?.Independence}/>
                    </tr>
                    <tr>
                      <td>Able to participate in community/social events</td>
                        <InsertYesOrNoImg bool={SocialSurvey?.CommunityParticipation}/>
                    </tr>
                    <tr>
                      <td>Does disability affect ability to interact socially?</td>
                      <InsertYesOrNoImg bool={SocialSurvey?.DisabilityImpact}/>
                    </tr>
                    <tr>
                      <td>Experienced discrimination because of your disability</td>
                      <InsertYesOrNoImg bool={SocialSurvey?.Discrimination}/>
                    </tr>
                  </tbody>
                </Table>
            </div>
        );
    }

    function EducationSurvey() {
        const {EducationSurvey} = baselineSurvey;
        return(
            <div>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Inquiry</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Goes to school</td>
                      <InsertYesOrNoImg bool={EducationSurvey?.SchoolState}/>
                    </tr>
                    <tr>
                      <td>Current Grade</td>
                      <td>{EducationSurvey?.CurrentGrade ? EducationSurvey.CurrentGrade : "--"}</td>
                    </tr>
                    <tr>
                      <td>Reason for not attending school</td>
                      <td>{EducationSurvey?.NoSchoolReason ? EducationSurvey.NoSchoolReason : "--"}</td>
                    </tr>
                    <tr>
                      <td>Has every attended school</td>
                      <InsertYesOrNoImg bool={EducationSurvey?.SchoolBefore}/>
                    </tr>
                    <tr>
                      <td>Want to go to school</td>
                      <InsertYesOrNoImg bool={EducationSurvey?.WantSchool}/>
                    </tr>
                  </tbody>
                </Table>
            </div>
        );
    }

    function LivelihoodSurvey() {
        const {Livelihood} = baselineSurvey;
        return(
            <div>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Inquiry</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Currently working</td>
                      <InsertYesOrNoImg bool={LivelihoodSurvey?.WorkStatus}/>
                    </tr>
                    <tr>
                      <td>What do you do?</td>
                      <td>{LivelihoodSurvey?.WorkDescription ? LivelihoodSurvey.WorkDescription : "--"}</td>
                    </tr>
                    <tr>
                      <td>Employed or self-employed</td>
                      <td>{LivelihoodSurvey?.EmploymentType ? LivelihoodSurvey.EmploymentType : "--"}</td>
                    </tr>
                    <tr>
                      <td>Does this meet financial needs</td>
                      <InsertYesOrNoImg bool={LivelihoodSurvey?.FinancialNeedsMet}/>
                    </tr>
                    <tr>
                      <td>Does your disability affect ability to work</td>
                      <InsertYesOrNoImg bool={LivelihoodSurvey?.DisabilityImpact}/>
                    </tr>
                    <tr>
                      <td>Want work</td>
                      <InsertYesOrNoImg bool={LivelihoodSurvey?.WorkWanted}/>
                    </tr>
                  </tbody>
                </Table>
            </div>
        );
    }

    function NutritionSurvey() {
        const {NutritionSurvey} = baselineSurvey;
        return(
            <div>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Inquiry</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Food security level</td>
                      <td>{NutritionSurvey?.FoodStatus ? NutritionSurvey.FoodStatus : "--"}</td>
                    </tr>
                    <tr>
                      <td>Enough food every month</td>
                      <InsertYesOrNoImg bool={NutritionSurvey?.MonthlyFoodAccess}/>
                    </tr>
                    <tr>
                      <td>If child, nutrition status</td>
                      <td>{NutritionSurvey?.ChildNutritionStatus ? NutritionSurvey.ChildNutritionStatus : "--"}</td>

                    </tr>
                  </tbody>
                </Table>
            </div>
        );
    }

    function EmpowermentSurvey() {
        const {EmpowermentSurvey} = baselineSurvey;
        return(
            <div>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Inquiry</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Is a member of a disability organization</td>
                      <InsertYesOrNoImg bool={EmpowermentSurvey?.DisabilityOrganizationMember}/>
                    </tr>
                    <tr>
                      <td>List of organizations</td>
                      <td>{EmpowermentSurvey?.DisabilityOrganizations ? EmpowermentSurvey.DisabilityOrganizations : "--"}</td>
                    </tr>
                    <tr>
                      <td>Aware of rights</td>
                      <InsertYesOrNoImg bool={EmpowermentSurvey?.AwareDisabilityRights}/>
                    </tr>
                    <tr>
                      <td>Feel able to influence people around</td>
                      <InsertYesOrNoImg bool={EmpowermentSurvey?.Influential}/>
                    </tr>
                  </tbody>
                </Table>
            </div>
        );
    }

    function ShelterSurvey() {
        const {ShelterSurvey} = baselineSurvey;
        return(
            <div>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Inquiry</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Adequate shelter</td>
                      <InsertYesOrNoImg bool={ShelterSurvey?.ShelterAccess}/>
                    </tr>
                    <tr>
                      <td>Access to essential household items</td>
                      <InsertYesOrNoImg bool={ShelterSurvey?.EssentialsAccess}/>
                    </tr>
                  </tbody>
                </Table>
            </div>
        );
    }

    return (
        <div>
            <Row>
                <Col><h4>Baseline Survey</h4></Col>
            </Row>
            <InsertSpecificSurvey/>
        </div>
    );

}

export default BaselineSurvey;