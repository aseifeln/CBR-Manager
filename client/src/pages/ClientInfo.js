/* eslint-disable no-lone-blocks */
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
    
    const areaFontSize = {color:"white",fontSize: "20px", fontWeight: "bold"};
    const areaInfo = {fontSize: "18px", display: "inline", fontWeight: "bold"};
    const areaColor={backgroundColor:"#9646b7"};

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
                        <Button tag={Link} to={"/client/" + props.match.params.id + "/edit/"} style={{float: 'right'}}>Edit Client </Button>
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
                        <li>- Disability: {(client.DisabilityType || []).join(', ')}</li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col align="center">
                    <Link to={"/visit/new/" + props.match.params.id}>
                        <Button variant="primary" size="md" style={{backgroundColor:"#46ad2f", float: 'right'}}>
                            New Visit
                        </Button>
                    </Link>
                </Col>
                <Col align="center">
                    <Link to={"/referral/new/" + props.match.params.id}>
                        <Button variant="primary" size="md" style={{backgroundColor:"#46ad2f", float: 'left'}}>
                            New Referral
                        </Button>
                    </Link>
                </Col>
            </Row>
            </Container>
            <br/>
            <Container>
                <Card>
                    <CardHeader style={areaColor}>
                        <Row>
                            <Col><h2 style={areaFontSize}>Health</h2></Col>
                            <Col>
                                <Button variant="primary" size="md" className="float-right" style={{backgroundColor:"#22a9ba"}} onClick={() => setShowHealthInfo(!showHealthInfo)}>
                                    {(showHealthInfo) ? "Hide" : "Expand"}
                                </Button>
                            </Col>
                        </Row>
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
                            <div style={areaInfo}>Referral Status:</div> {/*TODO*/}<br/>
                            <div style={areaInfo}>Referral Outcome:</div> {/*TODO*/} <br />
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader style={areaColor}>
                        <Row>
                            <Col><h2 style={areaFontSize}>Education</h2></Col>
                            <Col>
                                <Button variant="primary" size="md" className="float-right" style={{backgroundColor:"#22a9ba"}} onClick={() => setShowEducationInfo(!showEducationInfo)}>
                                    {(showEducationInfo) ? "Hide" : "Expand"}
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <Collapse isOpen={showEducationInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.EducationStatus}<br/>
                            <div style={areaInfo}>Goal:</div> {client.EducationGoal} <br />
                            <div style={areaInfo}>Description:</div> {client.EducationDesc}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader style={areaColor}>
                        <Row>
                            <Col><h2 style={areaFontSize}>Social</h2></Col>
                            <Col>
                                <Button variant="primary" size="md" className="float-right" style={{backgroundColor:"#22a9ba"}} onClick={() => setShowSocialInfo(!showSocialInfo)}>
                                    {(showSocialInfo) ? "Hide" : "Expand"}
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <Collapse isOpen={showSocialInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.SocialStatus}<br/>
                            <div style={areaInfo}>Goal:</div> {client.SocialGoal}<br />
                            <div style={areaInfo}>Description:</div> {client.SocialDesc}
                        </CardBody> 
                    </Collapse>
                </Card>
                {/* The remaining areas are for display purposes only and will be added later */}
                <Card>
                    <CardHeader style={areaColor}>
                        <Row>
                            <Col><h2 style={areaFontSize}>Food / Nutrition</h2></Col>
                            <Col>
                                <Button variant="primary" size="md" className="float-right" style={{backgroundColor:"#22a9ba"}} onClick={() => setShowFoodNutritionInfo(!showFoodNutritionInfo)}>
                                    {(showFoodNutritionInfo) ? "Hide" : "Expand"}
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <Collapse isOpen={showFoodNutritionInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.foodNutritionRisk}<br/>
                            <div style={areaInfo}>Goal:</div> {client.foodNutritionGoal}
                        </CardBody> 
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader style={areaColor}>
                        <Row>
                            <Col><h2 style={areaFontSize}>Shelter / Care</h2></Col>
                            <Col>
                                <Button variant="primary" size="md" className="float-right" style={{backgroundColor:"#22a9ba"}} onClick={() => setShowShelterCareInfo(!showShelterCareInfo)}>
                                    {(showShelterCareInfo) ? "Hide" : "Expand"}
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <Collapse isOpen={showShelterCareInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.shelterCareRisk}<br/>
                            <div style={areaInfo}>Goal:</div> {client.shelterCareGoal}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader style={areaColor}>
                        <Row>
                            <Col><h2 style={areaFontSize}>Livelihood</h2></Col>
                            <Col>
                                <Button variant="primary" size="md" className="float-right" style={{backgroundColor:"#22a9ba"}} onClick={() => setShowLivelihoodInfo(!showLivelihoodInfo)}>
                                    {(showLivelihoodInfo) ? "Hide" : "Expand"}
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <Collapse isOpen={showLivelihoodInfo}>
                        <CardBody>
                            <div style={areaInfo}>Risk Level:</div> {client.livelihoodRisk}<br/>
                            <div style={areaInfo}>Goal:</div> {client.livelihoodGoal}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader style={areaColor}>
                        <Row>
                            <Col><h2 style={areaFontSize}>Empowerment</h2></Col>
                            <Col>
                                <Button variant="primary" size="md" className="float-right" style={{backgroundColor:"#22a9ba"}} onClick={() => setShowEmpowermentInfo(!showEmpowermentInfo)}>
                                    {(showEmpowermentInfo) ? "Hide" : "Expand"}
                                </Button>
                            </Col>
                        </Row>
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