import React, { Component } from 'react';
import { Container, Button, Row, Col, Media, Card, Collapse, CardHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import tempLogo from './logo.jpeg'; // Temporary, will not push to repo

class ClientInfo extends Component {
    constructor(props) {
        super(props);
        var client = {};
        this.state = {
            showHealthInfo: false,
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
        // this.props.getClient(); To be implemented later
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
                        <div class="text-center">
                            <Media object src={tempLogo} className="rounded-circle rounded"></Media>
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
                <Container>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showHealthInfo")}>
                            Health
                            <Collapse isOpen={this.state.showHealthInfo}>
                                Risk Level: High<br/>
                                Goal: <br/>
                                Related Visits: <br/>
                                Click on a date to view more info or edit: <br/>
                                More Details: <br/>
                                Referal Details: <br/>
                            </Collapse>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showEducationInfo")}>
                            Education
                            <Collapse isOpen={this.state.showEducationInfo}>
                                Risk Level: High<br/>
                                Goal:
                            </Collapse>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showSocialInfo")}>
                            Social
                            <Collapse isOpen={this.state.showSocialInfo}>
                                Risk Level: High<br/>
                                Goal: 
                            </Collapse>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showFoodNutritionInfo")}>
                            Food/Nutrition
                            <Collapse isOpen={this.state.showFoodNutritionInfo}>
                                Risk Level: High<br/>
                                Goal: 
                            </Collapse>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showShelterCareInfo")}>
                            Shelter/Care
                            <Collapse isOpen={this.state.showShelterCareInfo}>
                                Risk Level: High<br/>
                                Goal: 
                            </Collapse>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showLivelihoodInfo")}>
                            Livelihood
                            <Collapse isOpen={this.state.showLivelihoodInfo}>
                                Risk Level: High<br/>
                                Goal: 
                            </Collapse>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader onClick={this.toggleAccordion.bind(this, "showEmpowermentInfo")}>
                            Empowerment
                            <Collapse isOpen={this.state.showEmpowermentInfo}>
                                Risk Level: High<br/>
                                Goal: 
                            </Collapse>
                        </CardHeader>
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