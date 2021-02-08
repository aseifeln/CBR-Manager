import React, { Component } from 'react';
import { Container, Button, Row, Col, Media, Card, Collapse, CardHeader, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ClientInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHealthInfo: true,
            showEducationInfo: false,
            showSocialInfo: false,
            showFoodNutritionInfo: false,
            showShelterCareInfo: false,
            showLivelihoodInfo: false,
            showEmpowermentInfo: false,
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id); // This is the id to send to backend
        // this.props.getClientInfo(); To be implemented later
        //this.props.getClientInfo(); Add proper GET request when backend is implemented
    }

    // Tried to mimic accordion class from bootstrap, which is the reason for this name
    toggleAccordion(showInfo) {
        if (this.state[showInfo])
            this.setState({[showInfo]: false});
        else
            this.setState({[showInfo]: true});
    }

    // May not be needed
    newVisit = (id) => {
        console.log("New visit for client with id: " + id);
        // POST request for new visit should go here
    }

    render() {
        // const { client } = this.props.client; To be implemented later
        var areaFontSize = {fontSize: "20px"}
        return(
            <Container>
                <Container>
                    <Row>
                        <Col>
                            <h1>Name: Client{this.props.match.params.id}</h1>
                        </Col>
                        <Col>
                            <Link to={"/client/" + this.props.match.params.id} class="float-right">Edit Client Info</Link>
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
                        <Button variant="primary" size="md" onClick={this.newVisit.bind(this, this.props.match.params.id)}>
                            New Visit +
                        </Button>
                    </Col>
                </Row>
                </Container>
                <br/>
                <Container>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showHealthInfo")}>
                            <h2 className="font-weight-bold" style={areaFontSize}>Health</h2>
                        </CardHeader>
                        <Collapse isOpen={this.state.showHealthInfo}>
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
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showEducationInfo")}>
                            <h2 className="font-weight-bold" style={areaFontSize}>Education</h2>
                        </CardHeader>
                        <Collapse isOpen={this.state.showEducationInfo}>
                            <CardBody>
                                Risk Level: High<br/>
                                Goal:
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showSocialInfo")}>
                            <h2 className="font-weight-bold" style={areaFontSize}>Social</h2>
                        </CardHeader>
                        <Collapse isOpen={this.state.showSocialInfo}>
                            <CardBody>
                                Risk Level: High<br/>
                                Goal:
                            </CardBody> 
                        </Collapse>
                    </Card>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showFoodNutritionInfo")}>
                            <h2 className="font-weight-bold" style={areaFontSize}>Food/Nutrition</h2>
                        </CardHeader>
                        <Collapse isOpen={this.state.showFoodNutritionInfo}>
                            <CardBody>
                                Risk Level: High<br/>
                                Goal:
                            </CardBody> 
                        </Collapse>
                    </Card>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showShelterCareInfo")}>
                            <h2 className="font-weight-bold" style={areaFontSize}>Shelter/Care</h2>
                        </CardHeader>
                        <Collapse isOpen={this.state.showShelterCareInfo}>
                            <CardBody>
                                Risk Level: High<br/>
                                Goal: 
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showLivelihoodInfo")}>
                            <h2 className="font-weight-bold" style={areaFontSize}>Livelihood</h2>
                        </CardHeader>
                        <Collapse isOpen={this.state.showLivelihoodInfo}>
                            <CardBody>
                                Risk Level: High<br/>
                                Goal: 
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showEmpowermentInfo")}>
                            <h2 className="font-weight-bold" style={areaFontSize}>Empowerment</h2>
                        </CardHeader>
                        <Collapse isOpen={this.state.showEmpowermentInfo}>
                            <CardBody>
                                Risk Level: High<br/>
                                Goal: 
                            </CardBody>
                        </Collapse>
                    </Card>
                </Container>
            </Container>
        );
    }
}

ClientInfo.propTypes = {
    getClientInfo: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
}

export default ClientInfo;