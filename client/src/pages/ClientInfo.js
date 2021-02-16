import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Row, Col, Media, Card, Collapse, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import NotFoundPage from './404'

function ClientInfo(props) {

    const [ client, setClient ] = useState({});
    const [ visits, setVisits ] = useState([]);
    const [ clientFound, setClientFound ] = useState(false);

    const [showHealthInfo, setShowHealthInfo] = useState(true)
    const [showEmpowermentInfo, setShowEmpowermentInfo] = useState(false)
    const [showEducationInfo, setShowEducationInfo] = useState(false)
    const [showFoodNutritionInfo, setShowFoodNutritionInfo] = useState(false)
    const [showLivelihoodInfo, setShowLivelihoodInfo] = useState(false)
    const [showShelterCareInfo, setShowShelterCareInfo] = useState(false)
    const [showSocialInfo, setShowSocialInfo] = useState(false)
    
    const areaFontSize = {fontSize: "20px"}

    useEffect(() => {
        // Send request to backend to retrieve client info data

        axios.get('/clients/' + props.match.params.id)
            .then(response => {
                setClient(response.data)
                setClientFound(true)
            })
            .catch(error => {
                console.log(error)
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

    if (!clientFound)
    {
        return (
            <NotFoundPage/>
        )
    }
    
    return(
        <div>
            <AppNavbar/>
            <Container>
                <Row>
                    <Col>
                        <h1>Name: {client.FirstName + ' ' + client.LastName}</h1>
                    </Col>
                    <Col>
                        <Link to={"/client/" + props.match.params.id} class="float-right">Edit Client Info</Link>
                    </Col>
                </Row>
            </Container>
            <Container>
            <Row>
                <Col>
                    <div className="text-center">
                        <Media src={`data:image/jpeg;base64,${client.Photo}`} object alt="Profile Image" className="rounded-circle rounded" style={{height: "200px", width: "200px"}}/>
                    </div>
                </Col>
                <Col>
                    Personal Info: 
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
                        <h2 className="font-weight-bold" style={areaFontSize}>Health</h2>
                    </CardHeader>
                    <Collapse isOpen={showHealthInfo}>
                        <CardBody>
                            Risk Level: {client.HealthStatus}<br/>
                            Goal: {client.HealthGoal}<br/>
                            Related Visits: <br/>
                            &nbsp; Click on a date to view more info or edit: <br/>
                            <ul>
                                {visits.map(({id}) => (
                                    <li><Link to={"/"}>Visit {id}</Link></li>
                                ))}
                            </ul>
                            More Details: {client.HealthDesc}<br/>
                            Referral Details: {client.healthReferral}<br/>
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowEducationInfo((showEducationInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Education</h2>
                    </CardHeader>
                    <Collapse isOpen={showEducationInfo}>
                        <CardBody>
                            Risk Level: {client.EducationStatus}<br/>
                            Goal: {client.EducationGoal}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowSocialInfo((showSocialInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Social</h2>
                    </CardHeader>
                    <Collapse isOpen={showSocialInfo}>
                        <CardBody>
                            Risk Level: {client.SocialStatus}<br/>
                            Goal: {client.SocialGoal}
                        </CardBody> 
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowFoodNutritionInfo((showFoodNutritionInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Food/Nutrition</h2>
                    </CardHeader>
                    <Collapse isOpen={showFoodNutritionInfo}>
                        <CardBody>
                            Risk Level: {client.foodNutritionRisk}<br/>
                            Goal: {client.foodNutritionGoal}
                        </CardBody> 
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowShelterCareInfo((showShelterCareInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Shelter/Care</h2>
                    </CardHeader>
                    <Collapse isOpen={showShelterCareInfo}>
                        <CardBody>
                            Risk Level: {client.shelterCareRisk}<br/>
                            Goal: {client.shelterCareGoal}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowLivelihoodInfo((showLivelihoodInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Livelihood</h2>
                    </CardHeader>
                    <Collapse isOpen={showLivelihoodInfo}>
                        <CardBody>
                            Risk Level: {client.livelihoodRisk}<br/>
                            Goal: {client.livelihoodGoal}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowEmpowermentInfo((showEmpowermentInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Empowerment</h2>
                    </CardHeader>
                    <Collapse isOpen={showEmpowermentInfo}>
                        <CardBody>
                            Risk Level: {client.empowermentRisk}<br/>
                            Goal: {client.empowermentGoal}
                        </CardBody>
                    </Collapse>
                </Card>
            </Container>
        </div>
    )
}

export default ClientInfo;