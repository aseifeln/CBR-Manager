import React, { useState } from 'react';
import { Container, Button, FormGroup, Form, Col, Row, Input, Label, Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import { MultiStepForm } from "./NewClientSignup"

import AppNavbar from '../components/AppNavbar';

function NewVisit(props) {

  const [ healthWheelchair, setHealthWheelchair ] = useState(false);
  const [ healthProsthetic, setHealthProsthetic ] = useState(false);
  const [ healthOrthotic, setHealthOrthotic ] = useState(false);
  const [ healthWheelchairRepair, setHealthWheelchairRepair ] = useState(false);
  const [ healthReferral, setHealthReferral ] = useState(false);
  const [ healthAdvice, setHealthAdvice ] = useState(false);
  const [ healthAdvocacy, setHealthAdvocacy ] = useState(false);
  const [ healthEncouragement, setHealthEncouragement ] = useState(false);

  const [ socialReferral, setSocialReferral ] = useState(false);
  const [ socialAdvice, setSocialAdvice ] = useState(false);
  const [ socialAdvocacy, setSocialAdvocacy ] = useState(false);
  const [ socialEncouragement, setSocialEncouragement ] = useState(false);

  return (
    <div>
        <AppNavbar/>
        <Container>
            <Row>
              <Col className="font-weight-bold">
              New Visit
              </Col>
              <Col>
                <Button variant="primary" size="md" className="float-right">
                  Save Visit
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="font-weight-bold" style={{fontSize: "30px"}}>
                Client: Name
              </Col>
            </Row>
            <MultiStepForm>
              <Form title="General Info">
                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="purposeOfVisit">Purpose of visit*</Label>
                      <Input id="purposeOfVisit" placeholder="Ex. disability center referral, disability center referral follow up"/>
                    </FormGroup>
                  </Col>
                </Row>

                {/* Unsure of how else to do this when following the mock UI*/}
                <FormGroup>
                  <Row>
                    <Col>
                      <Label>
                        Tags: *(select all that apply)
                      </Label>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col>
                      <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                        <Input type="checkbox" id="healthCheckBox"/>
                        Health
                      </Label>
                      <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                        <Input type="checkbox" id="educationCheckBox"/>
                        Education
                      </Label>
                      <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                        <Input type="checkbox" id="socialCheckBox"/>
                        Social
                      </Label>
                    </Col>
                  </Row>
                </FormGroup>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="date">
                        Date:*
                        <Input type="date" id="date"/>
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                
                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="worker">
                        CBR Worker*
                      </Label>
                      <Input placeholder="Autofill CBR worker Name" id="worker"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="locationOfVisit">
                        Location of visit*
                      </Label>
                      <Input id="locationOfVisit"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col xs={10}>
                    <FormGroup>
                      <Label for="location">
                        Location*
                      </Label>
                      <Input  type="select" id="location">
                        <option>BidiBidi - Zone 1</option>
                        <option>BidiBidi - Zone 2</option>
                        <option>BidiBidi - Zone 4</option>
                        <option>BidiBidi - Zone 5</option>
                        <option>Palorinya - Basecamp</option>
                        <option>Palorinya - Zone 1</option>
                        <option>Palorinya - Zone 2</option>
                        <option>Palorinya - Zone 3</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col xs={2}>
                    <FormGroup>
                      <Label for="villageNum">
                        Village no*
                      </Label>
                      <Input id="villageNum"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>

              <Form title="Health">
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold">
                        What was provided?
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setHealthWheelchair(!healthWheelchair)}/>
                            Wheelchair
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthWheelchair}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="wheelchair"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setHealthProsthetic(!healthProsthetic)}/>
                            Prosthetic
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthProsthetic}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="prosthetic"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setHealthOrthotic(!healthOrthotic)}/>
                            Orthotic
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthOrthotic}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="orthotic"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setHealthWheelchairRepair(!healthWheelchairRepair)}/>
                            Wheelchair Repairs
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthWheelchairRepair}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="wheelchairRepairs"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setHealthReferral(!healthReferral)}/>
                            Referral to health centre
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthReferral}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="healthReferral"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setHealthAdvice(!healthAdvice)}/>
                            Advice
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthAdvice}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="healthAdvice"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setHealthAdvocacy(!healthAdvocacy)}/>
                            Advocacy
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthAdvocacy}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="healthAdvocacy"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setHealthEncouragement(!healthEncouragement)}/>
                            Encouragement
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthEncouragement}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="healthEncouragement"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="healthGoalMet">
                        Goal met?*
                      </Label>
                      <Input type="select" id="healthGoalMet">
                        <option>Cancelled</option>
                        <option>Ongoing</option>
                        <option>Concluded</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="outcome">
                        Outcome
                      </Label>
                      <Input type="textarea" placeholder="If concluded, what was the outcome?" id="healthOutcome"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>

              <Form title="Social">
                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setSocialReferral(!socialReferral)}/>
                            Referral to other org
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialReferral}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="socialReferral"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setSocialAdvice(!socialAdvice)}/>
                            Advice
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialAdvice}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="socialAdvice"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setSocialAdvocacy(!socialAdvocacy)}/>
                            Advocacy
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialAdvocacy}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="socialAdvocacy"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" onChange={() => setSocialEncouragement(!socialEncouragement)}/>
                            Encouragement
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialEncouragement}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" id="socialEncouragement"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="socialGoalMet">
                        Goal met?*
                      </Label>
                      <Input type="select" id="socialGoalMet">
                        <option>Cancelled</option>
                        <option>Ongoing</option>
                        <option>Concluded</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="outcome">
                        Outcome
                      </Label>
                      <Input type="textarea" placeholder="If concluded, what was the outcome?" id="socialOutcome"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>

              <Form title="Education">
                Education
              </Form>

            </MultiStepForm>
        </Container>
    </div>
  )
}

export default NewVisit;