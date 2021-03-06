import React, {useEffect, useState} from 'react';
import { Container, Button, FormGroup, Col, Row, Label, Input, Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import { MultiStepForm, Step, FieldInput } from "../components/MultiStepForm";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import NotFoundPage from './404';

function NewReferral(props) {

    const history = useHistory();
    const [ client, setClient ] = useState({});
    const [ clientFound, setClientFound ] = useState(false);

    useEffect(() => {

        axios.get('/clients/' + props.match.params.id)
        .then(response => {
            setClient(response.data);
            setClientFound(true)
        })
        .catch(error => {
            console.log(error);
            document.title = "Client not found";
            alert("Client not found");
            history.push('/dashboard')
        })
    
        document.title="New Referral";
    }, [])

    if (!clientFound) {
        return (
            <div>
                <NotFoundPage/>
            </div>
        )
    }    
    
    return (
        <div>
            New Referral
        </div>
    )
}

export default NewReferral;