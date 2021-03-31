import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CookieChecker from '../../components/CookieChecker';
import axios from 'axios';
import { UserContext } from '../../components/UserContext';
import Modal from 'react-modal';
import MapWithMarker  from '../../components/MapWithMarker';

function VisitInfo(props) {

    const [ visit, setVisit ] = useState({});
    const [ visitFound, setVisitFound ] = useState(false);
    const [ modelOpen, setModalOpen ] = useState(false);
    const context = useContext(UserContext);
    document.title = "Visit Details";

    // Reference: https://www.npmjs.com/package/react-modal
    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    useEffect(() => {

        axios.get('/visits/' + props.match.params.id)
        .then(response => {
            setVisit(response.data[0]);
            setVisitFound(true);
        })
        .catch(error => {
            console.log(error);
            document.title = "Visit not found";
        })
    },[])

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    function deleteVisit(event) {
        event.preventDefault();

        axios.delete('/visits/delete/' + props.match.params.id)
            .then(response => {
                closeModal();
                window.location.replace('/client/'+ visit.Client?.ClientId);
            })
            .catch(err => {
                console.log(err);
                closeModal();
                alert("Something went wrong when deleting the visit")
            })
    }

    if(!visitFound){

        return(
            <div>
                <h1>Visit Not Found</h1>
            </div>
            
        )
    }
    return(
        <div>
            <CookieChecker></CookieChecker>
            <Container>
                <Row>
                    <Col>
                        <Button tag={Link} to={'/client/'+ visit.Client?.ClientId}>Back to Client</Button>
                    </Col>
                    {(context.Role === 'Admin') ? (
                        <Col>
                        <Button onClick={openModal} style={{float: 'right'}}>Delete</Button>
                        <Modal
                         isOpen={modelOpen}
                         onRequestClose={closeModal}
                         style={customStyles}
                        >
                            <Container>
                                <Row>
                                    <Col>Are you sure you want to delete this visit?</Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col><Button color="success" onClick={deleteVisit}>Yes</Button></Col>
                                    <Col><Button color="danger" style={{float: 'right'}} onClick={closeModal}>No</Button></Col>
                                </Row>                           
                            </Container>
                        </Modal>
                    </Col>
                    ): ""}
                </Row>
            </Container>
            <br/>
            <Container>
                <Row>
                    <Col><h1>Summary:</h1></Col>
                </Row>
                <Row>
                    <Col>
                        {visit.Client ? (
                            <h5><b>Client Name: </b>{visit.Client?.FirstName + ' ' + visit.Client?.LastName}</h5>
                        ) : ""}
                        {visit.Worker ? (
                            <h5><b>Worker Name: </b>{visit.Worker?.FirstName + ' ' + visit.Worker?.LastName}</h5>
                        ) : ""}
                        <h5><b>Visit Purpose: </b>{visit.VisitPurpose}</h5>
                        <h5><b>Visit Date: </b>{visit.Date}</h5>
                        <h5><b>Location: </b>{visit.Location}</h5>
                        <h5><b>Village Number: </b>{visit.VillageNumber}</h5>
                    </Col>
                    {(visit.GPSLocation) ? (
                        <Col>
                            <h5><b>GPS Location</b></h5>
                            <MapWithMarker
                                loadingElement={<div style={{ height: '75%' }} />}
                                containerElement={<div style={{ height: '250px', width: '300px' }} />}
                                mapElement={<div style={{ height: '90%' }} />}
                                location={JSON.parse(visit.GPSLocation)}
                            />
                        </Col>
                    ) : ("")}
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