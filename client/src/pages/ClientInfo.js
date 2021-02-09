import React, { useState } from 'react';
import { Container, Button, Row, Col, Media, Card, Collapse, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

function ClientInfo(props) {

    const [showHealthInfo, setShowHealthInfo] = useState(true)
    const [showEmpowermentInfo, setShowEmpowermentInfo] = useState(false)
    const [showEducationInfo, setShowEducationInfo] = useState(false)
    const [showFoodNutritionInfo, setShowFoodNutritionInfo] = useState(false)
    const [showLivelihoodInfo, setShowLivelihoodInfo] = useState(false)
    const [showShelterCareInfo, setShowShelterCareInfo] = useState(false)
    const [showSocialInfo, setShowSocialInfo] = useState(false)
    
    var areaFontSize = {fontSize: "20px"}
    return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Name: Client{props.match.params.id}</h1>
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
                        <li>- Location: </li>
                        <li>- Age: </li>
                        <li>- Gender: </li>
                        <li>- Disability: </li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col align="center">
                    <Button variant="primary" size="md">
                        New Visit +
                    </Button>
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
                            Risk Level: High<br/>
                            Goal: <br/>
                            Related Visits: <br/>
                            &nbsp; Click on a date to view more info or edit: <br/>
                            <ul>
                                <li><Link to={"/"}>Visit 1</Link></li>
                                <li><Link to={"/"}>Visit 2</Link></li>
                                <li><Link to={"/"}>Visit 3</Link></li>
                            </ul>
                            More Details: <br/>
                            Referal Details: <br/>
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowEducationInfo((showEducationInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Education</h2>
                    </CardHeader>
                    <Collapse isOpen={showEducationInfo}>
                        <CardBody>
                            Risk Level: High<br/>
                            Goal:
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowSocialInfo((showSocialInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Social</h2>
                    </CardHeader>
                    <Collapse isOpen={showSocialInfo}>
                        <CardBody>
                            Risk Level: High<br/>
                            Goal:
                        </CardBody> 
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowFoodNutritionInfo((showFoodNutritionInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Food/Nutrition</h2>
                    </CardHeader>
                    <Collapse isOpen={showFoodNutritionInfo}>
                        <CardBody>
                            Risk Level: High<br/>
                            Goal:
                        </CardBody> 
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowShelterCareInfo((showShelterCareInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Shelter/Care</h2>
                    </CardHeader>
                    <Collapse isOpen={showShelterCareInfo}>
                        <CardBody>
                            Risk Level: High<br/>
                            Goal: 
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowLivelihoodInfo((showLivelihoodInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Livelihood</h2>
                    </CardHeader>
                    <Collapse isOpen={showLivelihoodInfo}>
                        <CardBody>
                            Risk Level: High<br/>
                            Goal: 
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => setShowEmpowermentInfo((showEmpowermentInfo) ? false : true)}>
                        <h2 className="font-weight-bold" style={areaFontSize}>Empowerment</h2>
                    </CardHeader>
                    <Collapse isOpen={showEmpowermentInfo}>
                        <CardBody>
                            Risk Level: High<br/>
                            Goal: 
                        </CardBody>
                    </Collapse>
                </Card>
            </Container>
        </div>
    )
}

export default ClientInfo;