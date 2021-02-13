import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Media, Card, Collapse, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';

function ClientInfo(props) {

    const [ client, setClient ] = useState({});

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
        console.log(props.match.params.id)

        // Mock data
        setClient({
            "name": "John Doe",
            "location": "BidiBidi Zone 1",
            "age": 30,
            "gender": "Male",
            "disability": "Polio",
            "healthRisk": "High",
            "healthGoal": "N/A",
            "healthDetails": "...",
            "healthReferral": "...",
            "educationRisk": "High",
            "educationGoal": "...",
            "socialRisk": "High",
            "socialGoal": "...",
            "livelihoodRisk": "High",
            "livelihoodGoal": "...",
            "foodNutritionRisk": "High",
            "foodNutritionGoal": "...",
            "shelterCareRisk": "High",
            "shelterCareGoal": "...",
            "empowermentRisk": "High",
            "empowermentGoal": "..."
        })
    }, [])
    
    return(
        <div>
            <AppNavbar/>
            <Container>
                <Row>
                    <Col>
                        <h1>Name: {client.name}</h1>
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
                        <Media object alt="Profile Image" className="rounded-circle rounded"></Media>
                    </div>
                </Col>
                <Col>
                    Personal Info: 
                    <ul class="list-unstyled">
                        <li>- Location: {client.location}</li>
                        <li>- Age: {client.age}</li>
                        <li>- Gender: {client.gender}</li>
                        <li>- Disability: {client.disability}</li>
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
                            Risk Level: {client.healthRisk}<br/>
                            Goal: {client.healthGoal}<br/>
                            Related Visits: <br/>
                            &nbsp; Click on a date to view more info or edit: <br/>
                            <ul>
                                <li><Link to={"/"}>Visit 1</Link></li>
                                <li><Link to={"/"}>Visit 2</Link></li>
                                <li><Link to={"/"}>Visit 3</Link></li>
                            </ul>
                            More Details: {client.healthDetails}<br/>
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
                            Risk Level: {client.educationRisk}<br/>
                            Goal: {client.educationGoal}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowSocialInfo((showSocialInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Social</h2>
                    </CardHeader>
                    <Collapse isOpen={showSocialInfo}>
                        <CardBody>
                            Risk Level: {client.socialRisk}<br/>
                            Goal: {client.socialGoal}
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