import React, { useState, useEffect } from 'react';
import { Container, Button, FormGroup, Form, Col, Row, Input, Label, Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import MultiStepForm from "../components/MultiStepForm"

import AppNavbar from '../components/AppNavbar';

function NewVisit(props) {

  useEffect(() => {
    // May possibly need to send GET request to determine if id corresponds to valid client later
    console.log(props.match.params.id)
  }, [])

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

  const [ educationReferral, setEducationReferral ] = useState(false);
  const [ educationAdvice, setEducationAdvice ] = useState(false);
  const [ educationAdvocacy, setEducationAdvocacy ] = useState(false);
  const [ educationEncouragement, setEducationEncouragement ] = useState(false);

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
                Client: {props.match.params.id}
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
                        <Input type="checkbox" name="healthCheckBox"/>
                        Health
                      </Label>
                      <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                        <Input type="checkbox" name="educationCheckBox"/>
                        Education
                      </Label>
                      <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                        <Input type="checkbox" name="socialCheckBox"/>
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
                        <Input type="date" name="date"/>
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
                      <Input placeholder="Autofill CBR worker Name" name="worker"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="locationOfVisit">
                        Location of visit*
                      </Label>
                      <Input name="locationOfVisit"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col xs={10}>
                    <FormGroup>
                      <Label for="location">
                        Location*
                      </Label>
                      <Input  type="select" name="location">
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
                      <Input name="villageNum"/>
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
                          <Input type="textarea" placeholder="Description" name="wheelchair"/>
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
                          <Input type="textarea" placeholder="Description" name="prosthetic"/>
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
                          <Input type="textarea" placeholder="Description" name="orthotic"/>
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
                          <Input type="textarea" placeholder="Description" name="wheelchairRepairs"/>
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
                          <Input type="textarea" placeholder="Description" name="healthReferral"/>
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
                          <Input type="textarea" placeholder="Description" name="healthAdvice"/>
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
                          <Input type="textarea" placeholder="Description" name="healthAdvocacy"/>
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
                          <Input type="textarea" placeholder="Description" name="healthEncouragement"/>
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
                      <Label for="healthOutcome">
                        Outcome
                      </Label>
                      <Input type="textarea" placeholder="If concluded, what was the outcome?" name="healthOutcome"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>

              <Form title="Social">
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
                            <Input type="checkbox" onChange={() => setSocialReferral(!socialReferral)}/>
                            Referral to other org
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialReferral}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="socialReferral"/>
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
                          <Input type="textarea" placeholder="Description" name="socialAdvice"/>
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
                          <Input type="textarea" placeholder="Description" name="socialAdvocacy"/>
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
                          <Input type="textarea" placeholder="Description" name="socialEncouragement"/>
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
                      <Input type="select" name="socialGoalMet">
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
                      <Label for="socialOutcome">
                        Outcome
                      </Label>
                      <Input type="textarea" placeholder="If concluded, what was the outcome?" name="socialOutcome"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>

              <Form title="Education">
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
                            <Input type="checkbox" onChange={() => setEducationReferral(!educationReferral)}/>
                            Referral to other org
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationReferral}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="educationReferral"/>
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
                            <Input type="checkbox" onChange={() => setEducationAdvice(!educationAdvice)}/>
                            Advice
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationAdvice}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="educationAdvice"/>
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
                            <Input type="checkbox" onChange={() => setEducationAdvocacy(!educationAdvocacy)}/>
                            Advocacy
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationAdvocacy}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="educationAdvocacy"/>
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
                            <Input type="checkbox" onChange={() => setEducationEncouragement(!educationEncouragement)}/>
                            Encouragement
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationEncouragement}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="educationEncouragement"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="educationGoalMet">
                        Goal met?*
                      </Label>
                      <Input type="select" id="educationGoalMet">
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
                      <Label for="educationOutcome">
                        Outcome
                      </Label>
                      <Input type="textarea" placeholder="If concluded, what was the outcome?" name="educationOutcome"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>

            </MultiStepForm>
        </Container>
    </div>
  )
}

export default NewVisit;