import React, {useEffect, useState} from 'react';
import { Container, Button, FormGroup, Col, Row, Label, Input, FormText } from 'reactstrap';
import { MultiStepForm, Step, FieldInput, FieldCheck } from "../components/MultiStepForm";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import NotFoundPage from './404';

function NewReferral(props) {

    const history = useHistory();

    const [ client, setClient ] = useState({});
    const [ clientFound, setClientFound ] = useState(false);
    const [ otherSelected, setOtherSelected ] = useState(false);

    const [ wheelchairService, setWheelchairService ] = useState(false);
    const [ physioService, setPhysioService ] = useState(false);
    const [ prostheticService , setProstheticService ] = useState(false);
    const [ orthoticService , setOrthoticService ] = useState(false);

    const [ wheelchairImgPreview, setWheelchairImgPreview ] = useState('');
    const [ hasWheelchair, setHasWheelchair ] = useState(true)

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
                                    <Input type="checkbox" name="wheelCheckBox" onChange={() => setWheelchairService(!wheelchairService)}/>
                                    Wheelchair
                                </Label>
                                <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                                    <Input type="checkbox" name="physioCheckBox" onChange={() => setPhysioService(!physioService)}/>
                                    Physiotheraphy
                                </Label>
                                <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                                    <Input type="checkbox" name="prostheticCheckBox" onChange={() => setProstheticService(!prostheticService)}/>
                                    Prosthetic
                                </Label>
                                <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                                    <Input type="checkbox" name="orthoticCheckBox" onChange={() => setOrthoticService(!orthoticService)}/>
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

                <Step name="Wheelchair Service" isEnabled={wheelchairService}>

                    <Row form>
                        <Col xs={12}>
                            <img src={(wheelchairImgPreview) && URL.createObjectURL(wheelchairImgPreview)} style={{ width: '100%', maxWidth: 150 }}/>
                            <FieldInput 
                            name="wheelchairPhoto" 
                            label="Client photo and any assistive devices"
                            required="Client photo is required"
                            type="file"
                            onChange={(e) => {
                                if (e.target) {
                                setWheelchairImgPreview(e.target.files[0])
                                }
                            }}
                            />
                            <FormText className='mb-2 pb-1'>The picture should include both the client &amp; and any existing assistive devices (if any).</FormText>
                        </Col>
                    </Row>

                    <Row form>
                        <Col>
                            <FormGroup>
                                <FieldInput type="select" name="wheelchairProficiency" label="Client proficiency" required="Client proficiency is required">
                                    <option selected hidden>What is the client's proficiency with a wheelchair?</option>
                                    <option>Basic</option>
                                    <option>Intermediate</option>
                                </FieldInput>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col>
                            <FormGroup>
                                <FieldInput type="number" name="hipWidth" label="Hip Width in Inches" min="1" required="Hip width is required"/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Label>
                                Does the client have a wheelchair?
                            </Label>
                        </Col>
                    </Row>

                    <Row form>
                        <Col>
                            <FormGroup>
                                <FieldCheck name="hasWheelchair" type="radio" label="Yes" value="Yes" defaultChecked onChange={() => setHasWheelchair(true)}/>
                                <FieldCheck name="hasWheelchair" type="radio" label="No" value="No" className='ml-4 pl-2' onChange={() => setHasWheelchair(false)}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    {(hasWheelchair) ? (
                        <div>
                            <Row>
                                <Col>
                                    <Label>
                                        Can the wheelchair be repaired?
                                    </Label>
                                </Col>
                            </Row>

                            <Row form>
                                <Col>
                                    <FormGroup>
                                        <FieldCheck name="wheelchairRepairable" type="radio" label="Yes" value="Yes" defaultChecked/>
                                        <FieldCheck name="wheelchairRepairable" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    ) : ("")}
                </Step>

                <Step name="Physiotherapy Service" isEnabled={physioService}>
                </Step>

                <Step name="Prosthetic Service" isEnabled={prostheticService}>
                </Step>

                <Step name="Orthotic Service" isEnabled={orthoticService}>
                </Step>
            </MultiStepForm>
        </Container>
    )
}

export default NewReferral;