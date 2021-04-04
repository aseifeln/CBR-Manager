import React, {useContext,useState} from 'react';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from '../components/UserContext';

import "../css/AlertList.css";

function ListAlerts(props) {

    const context = useContext(UserContext);

    function renderRow(alert) {
        return (
            <ListGroupItem key={alert.AlertId}>
                <ListGroupItemHeading className="listHeader">
                    <b>{alert.Title}</b>
                </ListGroupItemHeading>
                <ListGroupItemText>
                    <p className="dateText"><i>Sent {moment(alert.Date).format('DD-MM-YYYY')}</i></p>
                    <p className="clientRowText">
                        {alert.Message}
                    </p>
                </ListGroupItemText>
            </ListGroupItem>
        );
    }

    return (
        <div>
            <ListGroup>
                {props.alerts.length > 0 ? props.alerts.map(renderRow) :
                    <ListGroupItem>No alerts to show</ListGroupItem>}
            </ListGroup>
        </div>
    );
}

export default ListAlerts;