// The getWorkers request is temporary to ensure GET request is sent properly

import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { getWorkers} from "../actions/workerActions";
import PropTypes from 'prop-types';

class ClientInfo extends Component {

    componentDidMount() {
        //console.log(this.props.match.params.id); // This is the id to send to backend
        this.props.getWorkers();
        //this.props.getClient(); Add proper GET request when backend is implemented
    }

    render() {
        const { workers } = this.props.worker;
        console.log(workers);
        return(
            "testing"
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