// The getWorkers request is temporary to ensure GET request is sent properly
// To do: Add constructor and create class using correct prop when backend getClientInfo is implemented

import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getWorkers} from "../actions/workerActions";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import tempLogo from './logo.jpeg'; // Temporary, will not push to repo

class ClientInfo extends Component {

    componentDidMount() {
        console.log(this.props.match.params.id); // This is the id to send to backend
        this.props.getWorkers();
        //this.props.getClientInfo(); Add proper GET request when backend is implemented
    }

    newVisit = (id) => {
        console.log("New visit for client with id: " + id);
        // POST request for new visit should go here
    }

    render() {
        const { workers } = this.props.worker;
        return(
            <Container>
                <div class="page-header">
                    <Container>
                        <div class="row">
                            <div class="col">
                                <h1>Name</h1>
                            </div>
                            <div class="col">
                                <div class="float-right"><Link to={"/client/" + this.props.match.params.id}>Edit Client Info</Link></div>
                            </div>
                        </div>
                    </Container>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="text-center">
                            <img src={tempLogo} class="rounded-circle rounded"></img>
                        </div>
                    </div>
                    <div class="col">
                        Personal Info: 
                        <ul class="list-unstyled">
                            <li>- Location: </li>
                            <li>- Age: </li>
                            <li>- Gender: </li>
                            <li>- Disability: </li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col" align="center">
                        <Button variant="primary" size="md" onClick={this.newVisit.bind(this, this.props.match.params.id)}>
                            New Visit +
                        </Button>
                    </div>
                </div>
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