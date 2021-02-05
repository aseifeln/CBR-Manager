// The getWorkers request is temporary to ensure GET request is sent properly
// To do: Add constructor and create class using correct prop when backend getClientInfo is implemented

import React, { Component, useState } from 'react';
import { Container, Button, Row, Col, Media, Card, Collapse, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { getWorkers} from "../actions/workerActions";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import tempLogo from './logo.jpeg'; // Temporary, will not push to repo

class ClientInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.props.getWorkers();
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
        const { workers } = this.props.worker;
        return(
            <Container>
                <Container>
                    <Row>
                        <Col>
                            <h1>Name</h1>
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
    getWorkers: PropTypes.func.isRequired,
    worker: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
   worker: state.worker
});

export default connect(mapStateToProps, { getWorkers})(ClientInfo);