import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Row, Col, Media, Card, Collapse, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import NotFoundPage from './404';

function ClientInfo(props) {

    const [ client, setClient ] = useState({});
    const [ visits, setVisits ] = useState([]);
    const [ clientFound, setClientFound ] = useState(false);

    const [showHealthInfo, setShowHealthInfo] = useState(true);
    const [showEmpowermentInfo, setShowEmpowermentInfo] = useState(false);
    const [showEducationInfo, setShowEducationInfo] = useState(false);
    const [showFoodNutritionInfo, setShowFoodNutritionInfo] = useState(false);
    const [showLivelihoodInfo, setShowLivelihoodInfo] = useState(false);
    const [showShelterCareInfo, setShowShelterCareInfo] = useState(false);
    const [showSocialInfo, setShowSocialInfo] = useState(false);
    
    const areaFontSize = {fontSize: "20px", fontWeight: "bold"};
    const areaInfo = {fontSize: "18px", display: "inline", fontWeight: "bold"};

    useEffect(() => {
        // Send request to backend to retrieve client info data

        axios.get('/clients/' + props.match.params.id)
            .then(response => {
                setClient(response.data);
                setClientFound(true);
                document.title = "Client | " + response.data.FirstName + ' ' + response.data.LastName;
            })
            .catch(error => {
                console.log(error);
                document.title = "Client not found"
            })

        // TODO: Send GET Request to backend to retrieve all visits associated with this client
        // Mock visit data
        setVisits(
            [{
                "id": 1
            }, {
                "id": 2
            }, {
                "id": 3
            }]
        )
    }, [])

    {/* TODO: Will need to figure out a better way to tell users a client isn't found,
        as right now will still render this component briefly even for existing clients*/}
    if (!clientFound)
    {
        return (
            <NotFoundPage/>
        )
    }
    
    return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Name: {client.FirstName + ' ' + client.LastName}</h1>
                    </Col>
                    <Col>
                        <Link to={"/client/" + props.match.params.id} className="float-right">Edit Client Info</Link>
                    </Col>
                </Row>
            </Container>
            <Container>
            <Row>
                <Col>
                    <div className="text-center">
                        {/* Reference: https://stackoverflow.com/questions/42395034/how-to-display-binary-data-as-image-in-react */}
                        <Media src={`data:image/jpeg;base64,${client.Photo}`} object alt="Profile Image" className="rounded-circle rounded" style={{height: "200px", width: "200px"}}/>
                    </div>
                </Col>
                <Col>
                    <h3 className="font-weight-bold" style={{fontSize: "18px"}}>Personal Info:</h3>
                    <ul class="list-unstyled">
                        <li>- Location: {client.Location}</li>
                        <li>- Age: {client.Age}</li>
                        <li>- Gender: {client.Gender}</li>
                        <li>- Disability: {client.DisabilityType}</li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col align="center">
                    <Link to={"/visit/new/" + props.match.params.id}>
                        <Button variant="primary" size="md">
                            New Visit +
                        </Button>
                    </Link>
                </Col>
            </Row>
            </Container>
            <br/>
            <Container>
                <Card>
                    <CardHeader onClick={() => setShowHealthInfo((showHealthInfo) ? false : true)}>
                        <h2 style={areaFontSize}>Health</h2>
                    </CardHeader>
                    <Collapse isOpen={showHealthInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.HealthStatus}<br/>
                            <div style={areaInfo}>Goal:</div> {client.HealthGoal}<br/>
                            <div style={areaInfo}>Related Visits:</div> <br/>
                            &nbsp; Click on a date to view more info or edit: <br/>
                            <ul>
                                {visits.map(({id}) => (
                                    <li><Link to={"/"}>Visit {id}</Link></li>
                                ))}
                            </ul>
                            <div style={areaInfo}>More Details:</div> {client.HealthDesc}<br/>
                            {/* Unsure if this is required */}
                            {/* Referral Details: {client.healthReferral}<br/> */}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowEducationInfo((showEducationInfo) ? false : true)}>
                        <h2 style={areaFontSize}>Education</h2>
                    </CardHeader>
                    <Collapse isOpen={showEducationInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.EducationStatus}<br/>
                            <div style={areaInfo}>Goal:</div> {client.EducationGoal}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowSocialInfo((showSocialInfo) ? false : true)}>
                        <h2 style={areaFontSize}>Social</h2>
                    </CardHeader>
                    <Collapse isOpen={showSocialInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.SocialStatus}<br/>
                            <div style={areaInfo}>Goal:</div> {client.SocialGoal}
                        </CardBody> 
                    </Collapse>
                </Card>
                {/* The remaining areas are for display purposes only and will be added later */}
                <Card>
                    <CardHeader onClick={() => setShowFoodNutritionInfo((showFoodNutritionInfo) ? false : true)}>
                        <h2 style={areaFontSize}>Food/Nutrition</h2>
                    </CardHeader>
                    <Collapse isOpen={showFoodNutritionInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.foodNutritionRisk}<br/>
                            <div style={areaInfo}>Goal:</div> {client.foodNutritionGoal}
                        </CardBody> 
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowShelterCareInfo((showShelterCareInfo) ? false : true)}>
                        <h2 style={areaFontSize}>Shelter/Care</h2>
                    </CardHeader>
                    <Collapse isOpen={showShelterCareInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.shelterCareRisk}<br/>
                            <div style={areaInfo}>Goal:</div> {client.shelterCareGoal}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowLivelihoodInfo((showLivelihoodInfo) ? false : true)}>
                        <h2 style={areaFontSize}>Livelihood</h2>
                    </CardHeader>
                    <Collapse isOpen={showLivelihoodInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.livelihoodRisk}<br/>
                            <div style={areaInfo}>Goal:</div> {client.livelihoodGoal}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowEmpowermentInfo((showEmpowermentInfo) ? false : true)}>
                        <h2 style={areaFontSize}>Empowerment</h2>
                    </CardHeader>
                    <Collapse isOpen={showEmpowermentInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.empowermentRisk}<br/>
                            <div style={areaInfo}>Goal:</div> {client.empowermentGoal}
                        </CardBody>
                    </Collapse>
                </Card>
            </Container>
        </div>
    )
}

export default ClientInfo;