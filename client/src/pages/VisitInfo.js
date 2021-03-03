import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';


function VisitInfo(props) {

    const [ visit, setVisit ] = useState({});


    useEffect(() => {

        //TODO: Send a request to retrieve the visit info from the database
        setVisit({
            "VisitId": 1,
            "ClientId": 1,
            "VisitPurpose": "CBR",
            "Date": "2021/02/25",
            "Location": "BidiBidi Zone 1",
            "VillageNumber": 3,
            "HealthForm": {
                "Prosthetic": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Orthotic": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "WheelchairRepair": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "HealthCenterReferral": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Advice": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Advocacy": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Encouragement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "GoalMet": "Ongoing",
                "ConcludedOutcome": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            },
            "EducationForm":{
                "Advice": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Advocacy": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "OrganizationReferral": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Encouragement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "GoalMet": "Concluded",
                "ConcludedOutcome": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            },
            "SocialForm":{
                "Advice": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Advocacy": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "OrganizationReferral": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Encouragement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "GoalMet": "Concluded",
                "ConcludedOutcome": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            },
            "Client":{
                "FirstName": "Joseph",
                "LastName": "Ochaya"
            },
            "Worker":{
                "FirstName": "Moses",
                "LastName": "Waiswa"
            }
        })
    }, [])

    //{visit.Client.FirstName + ' ' + visit.Client.LastName}
    return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <Button tag={Link} to={'/client/'+ visit.ClientId}>Back</Button>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col><h1>Summary:</h1></Col>
                </Row>
                {visit.Client ? 
                <Row>
                    <Col><h5><b>Client Name: </b>{visit.Client.FirstName + ' ' + visit.Client.LastName}</h5></Col>
                </Row>
                  : ""}
                {visit.Worker ?
                <Row>
                    <Col><h5><b>Worker Name: </b>{visit.Worker.FirstName + ' ' + visit.Worker.LastName}</h5></Col>
                </Row>
                  : ""}
                <Row>
                    <Col><h5><b>Visit Purpose: </b>{visit.VisitPurpose}</h5></Col>
                </Row>
                <Row>
                    <Col><h5><b>Visit Date: </b>{visit.Date}</h5></Col>
                </Row>
                <Row>
                    <Col><h5><b>Location: </b>{visit.Location}</h5></Col>
                </Row>
                <Row>
                    <Col><h5><b>Village Number: </b>{visit.VillageNumber}</h5></Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col><h1>Visit Details:</h1></Col>
                </Row>
            </Container>
            {visit.HealthForm !== null ?
            <Container>
                <Row>
                    <Col><h2>Health</h2></Col>
                </Row>
                <ListGroup>
                    {visit.HealthForm?.Wheelchair ?
                    <ListGroupItem><b>Wheelchair: </b><br/>{visit.HealthForm.Wheelchair}</ListGroupItem>
                    : ""}
                    {visit.HealthForm?.Prosthetic ?
                    <ListGroupItem><b>Prosthetic: </b><br/>{visit.HealthForm.Prosthetic}</ListGroupItem>
                    : ""}
                    {visit.HealthForm?.Orthotic ?
                    <ListGroupItem><b>Orthotic: </b><br/>{visit.HealthForm.Orthotic}</ListGroupItem>
                    : ""}
                    {visit.HealthForm?.WheelchairRepair ? 
                    <ListGroupItem><b>Wheelchair Repair: </b><br/>{visit.HealthForm.WheelchairRepair}</ListGroupItem>
                    : ""}
                    {visit.HealthForm?.HealthCenterReferral ? 
                    <ListGroupItem><b>Health Centre Referral: </b><br/>{visit.HealthForm.HealthCenterReferral}</ListGroupItem>
                    : ""}
                    {visit.HealthForm?.Advice ? 
                    <ListGroupItem><b>Advice: </b><br/>{visit.HealthForm.Advice}</ListGroupItem>
                    : ""}
                    {visit.HealthForm?.Advocacy ?
                    <ListGroupItem><b>Advocacy: </b><br/>{visit.HealthForm.Advocacy}</ListGroupItem>
                    : ""}
                    {visit.HealthForm?.Encouragement ?
                    <ListGroupItem><b>Encouragement: </b><br/>{visit.HealthForm.Encouragement}</ListGroupItem>
                    : ""}
                    {visit.HealthForm?.GoalMet ?
                    <ListGroupItem><b>Goal Met? </b><br/>{visit.HealthForm.GoalMet}</ListGroupItem>
                    : ""}
                    {visit.HealthForm?.GoalMet === "Concluded" ?
                    <ListGroupItem><b>Concluded Outcome</b><br/>{visit.HealthForm.ConcludedOutcome}</ListGroupItem>
                    : ""}
                </ListGroup>
            </Container>
            : ""}
            <br/>
            {visit.EducationForm !== null ? 
            <Container>
                <Row>
                    <Col><h2>Education</h2></Col>
                </Row>
                <ListGroup>
                    {visit.EducationForm?.Advice ?
                    <ListGroupItem><b>Advice: </b><br/>{visit.EducationForm.Advice}</ListGroupItem>
                    : ""}
                    {visit.EducationForm?.Advocacy ?
                    <ListGroupItem><b>Advocacy: </b><br/>{visit.EducationForm.Advocacy}</ListGroupItem>
                    : ""}
                    {visit.EducationForm?.Encouragement ?
                    <ListGroupItem><b>Encouragement: </b><br/>{visit.EducationForm.Encouragement}</ListGroupItem>
                    : ""}
                    {visit.EducationForm?.OrganizationReferral ?
                    <ListGroupItem><b>Organization Referral: </b><br/>{visit.EducationForm.OrganizationReferral}</ListGroupItem>
                    : ""}
                    {visit.EducationForm?.GoalMet ?
                    <ListGroupItem><b>Goal Met? </b><br/>{visit.EducationForm.GoalMet}</ListGroupItem>
                    : ""}
                    {visit.EducationForm?.GoalMet === "Concluded" ?
                    <ListGroupItem><b>Concluded Outcome</b><br/>{visit.EducationForm.ConcludedOutcome}</ListGroupItem>
                    : ""}
                </ListGroup>
            </Container>
            : ""}
            <br/>
            {visit.SocialForm !== null ?
            <Container>
                <Row>
                    <Col><h2>Social</h2></Col>
                </Row>
                <ListGroup>
                    {visit.SocialForm?.Advice ?
                    <ListGroupItem><b>Advice: </b><br/>{visit.SocialForm.Advice}</ListGroupItem>
                    : ""}
                    {visit.SocialForm?.Advocacy ?
                    <ListGroupItem><b>Advocacy: </b><br/>{visit.SocialForm.Advocacy}</ListGroupItem>
                    : ""}
                    {visit.SocialForm?.Encouragement ?
                    <ListGroupItem><b>Encouragement: </b><br/>{visit.SocialForm.Encouragement}</ListGroupItem>
                    : ""}
                    {visit.SocialForm?.OrganizationReferral ?
                    <ListGroupItem><b>Organization Referral: </b><br/>{visit.SocialForm.OrganizationReferral}</ListGroupItem>
                    : ""}
                    {visit.SocialForm?.GoalMet ?
                    <ListGroupItem><b>Goal Met? </b><br/>{visit.SocialForm.GoalMet}</ListGroupItem>
                    : ""}
                    {visit.SocialForm?.GoalMet === "Concluded" ?
                    <ListGroupItem><b>Concluded Outcome</b><br/>{visit.SocialForm.ConcludedOutcome}</ListGroupItem>
                    : ""}
                </ListGroup>
            </Container>
            : ""}
        </div>
    )
}

export default VisitInfo;