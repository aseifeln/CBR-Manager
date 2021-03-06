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
    const [ otherSelected, setOtherSelected ] = useState(false);

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
        <Container>
            <Row>
              <Col className="font-weight-bold" style={{fontSize: "30px"}}>
                Client: {client.FirstName + ' ' + client.LastName}
              </Col>
              <Col>
                <Button variant="primary" size="md" className="float-right">
                  Save Referral
                </Button>
              </Col>
            </Row>

            <MultiStepForm name="New Referral">
                <Step name="General Info">

                    <Row form>
                        <Col>
                            <FormGroup>
                                <FieldInput placeholder="Autofill CBR worker Name" name="worker" label="CBR Worker"/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col>
                            <FormGroup>
                                <FieldInput type="date" name="date" label="Date:" required="Date required" defaultValue={(new Date()).toLocaleDateString('en-CA')}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Row>
                            <Col>
                                <Label>
                                    Service required (Select all that apply)
                                </Label>
                            </Col>
                        </Row>
                    
                        <Row>
                            <Col>
                                <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                                    <Input type="checkbox" name="wheelCheckBox"/>
                                    Wheelchair
                                </Label>
                                <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                                    <Input type="checkbox" name="physioCheckBox"/>
                                    Physiotheraphy
                                </Label>
                                <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                                    <Input type="checkbox" name="prostheticCheckBox"/>
                                    Prosthetic
                                </Label>
                                <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                                    <Input type="checkbox" name="orthoticCheckBox"/>
                                    Orthotic
                                </Label>
                                <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                                    <Input type="checkbox" name="orthoticCheckBox" onChange={() => setOtherSelected(!otherSelected)}/>
                                    Other
                                </Label>
                            </Col>
                        </Row>
                    </FormGroup>

                    {(otherSelected) ? (
                        <Row form>
                            <Col>
                                <FormGroup>
                                    <FieldInput type="textarea" placeholder="Please describe" name="otherServiceDesc" label="Other Service" required="Other service description is required"/>
                                </FormGroup>
                            </Col>
                        </Row>
                    ) : ""}

                    <Row form>
                        <Col>
                            <FormGroup>
                                <FieldInput placeholder="Center Services" name="referTo" label="Refer to" required="Center Services is required"/>
                            </FormGroup>
                        </Col>
                    </Row>

                </Step>
            </MultiStepForm>
        </Container>
    )
}

export default NewReferral;