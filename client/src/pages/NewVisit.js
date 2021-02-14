import React, { useState, useEffect } from 'react';
import { Container, Button, FormGroup, Form, Col, Row, Input, Label, Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import MultiStepForm from "../components/MultiStepForm"

import AppNavbar from '../components/AppNavbar';

function NewVisit(props) {

  useEffect(() => {
    // TODO: Send GET request for client and worker to fill out some fields
    console.log(props.match.params.id)
  }, [])

  const [ wheelchairProvided, setWheelchairProvided ] = useState(false);
  const [ prostheticProvided, setProstheticProvided ] = useState(false);
  const [ orthoticProvided, setOrthoticProvided ] = useState(false);
  const [ wheelchairRepairProvided, setWheelchairRepairProvided ] = useState(false);
  const [ healthReferralProvided, setHealthReferralProvided ] = useState(false);
  const [ healthAdviceProvided, setHealthAdviceProvided ] = useState(false);
  const [ healthAdvocacyProvided, setHealthAdvocacyProvided ] = useState(false);
  const [ healthEncouragementProvided, setHealthEncouragementProvided ] = useState(false);
  const [ healthGoalMet, setHealthGoatMet ] = useState(false);

  const [ socialReferralProvided, setSocialReferralProvided ] = useState(false);
  const [ socialAdviceProvided, setSocialAdviceProvided ] = useState(false);
  const [ socialAdvocacyProvided, setSocialAdvocacyProvided ] = useState(false);
  const [ socialEncouragementProvided, setSocialEncouragementProvided ] = useState(false);
  const [ socialGoalMet, setSocialGoalMet ] = useState(false);

  const [ educationReferralProvided, setEducationReferralProvided ] = useState(false);
  const [ educationAdviceProvided, setEducationAdviceProvided ] = useState(false);
  const [ educationAdvocacyProvided, setEducationAdvocacyProvided ] = useState(false);
  const [ educationEncouragementProvided, setEducationEncouragementProvided ] = useState(false);
  const [ educationGoalMet, setEducationGoalMet ] = useState(false);

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
                      <Input name="purposeOfVisit" placeholder="Ex. disability center referral, disability center referral follow up"/>
                    </FormGroup>
                  </Col>
                </Row>

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
                            <Input type="checkbox" onChange={() => setWheelchairProvided(!wheelchairProvided)}/>
                            Wheelchair
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={wheelchairProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="wheelchairDesc"/>
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
                            <Input type="checkbox" onChange={() => setProstheticProvided(!prostheticProvided)}/>
                            Prosthetic
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={prostheticProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="prostheticDesc"/>
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
                            <Input type="checkbox" onChange={() => setOrthoticProvided(!orthoticProvided)}/>
                            Orthotic
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={orthoticProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="orthoticDesc"/>
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
                            <Input type="checkbox" onChange={() => setWheelchairRepairProvided(!wheelchairRepairProvided)}/>
                            Wheelchair Repairs
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={wheelchairRepairProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="wheelchairRepairsDesc"/>
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
                            <Input type="checkbox" onChange={() => setHealthReferralProvided(!healthReferralProvided)}/>
                            Referral to health centre
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthReferralProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="healthReferralDesc"/>
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
                            <Input type="checkbox" onChange={() => setHealthAdviceProvided(!healthAdviceProvided)}/>
                            Advice
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthAdviceProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="healthAdviceDesc"/>
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
                            <Input type="checkbox" onChange={() => setHealthAdvocacyProvided(!healthAdvocacyProvided)}/>
                            Advocacy
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthAdvocacyProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="healthAdvocacyDesc"/>
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
                            <Input type="checkbox" onChange={() => setHealthEncouragementProvided(!healthEncouragementProvided)}/>
                            Encouragement
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthEncouragementProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="healthEncouragementDesc"/>
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
                      <Input type="select" name="healthGoalMet" onChange={(event) => setHealthGoatMet(event.target.value !== "Concluded")}>
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
                      <Input type="textarea" disabled={healthGoalMet} placeholder="If concluded, what was the outcome?" name="healthOutcome"/>
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
                            <Input type="checkbox" onChange={() => setSocialReferralProvided(!socialReferralProvided)}/>
                            Referral to other org
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialReferralProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="socialReferralDesc"/>
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
                            <Input type="checkbox" onChange={() => setSocialAdviceProvided(!socialAdviceProvided)}/>
                            Advice
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialAdviceProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="socialAdviceDesc"/>
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
                            <Input type="checkbox" onChange={() => setSocialAdvocacyProvided(!socialAdvocacyProvided)}/>
                            Advocacy
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialAdvocacyProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="socialAdvocacyDesc"/>
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
                            <Input type="checkbox" onChange={() => setSocialEncouragementProvided(!socialEncouragementProvided)}/>
                            Encouragement
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialEncouragementProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="socialEncouragementDesc"/>
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
                      <Input type="select" name="socialGoalMet" onChange={(event) => setSocialGoalMet(event.target.value !== "Concluded")}>
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
                      <Input type="textarea" disabled={socialGoalMet} placeholder="If concluded, what was the outcome?" name="socialOutcome"/>
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
                            <Input type="checkbox" onChange={() => setEducationReferralProvided(!educationReferralProvided)}/>
                            Referral to other org
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationReferralProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="educationReferralDesc"/>
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
                            <Input type="checkbox" onChange={() => setEducationAdviceProvided(!educationAdviceProvided)}/>
                            Advice
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationAdviceProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="educationAdviceDesc"/>
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
                            <Input type="checkbox" onChange={() => setEducationAdvocacyProvided(!educationAdvocacyProvided)}/>
                            Advocacy
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationAdvocacyProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="educationAdvocacyDesc"/>
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
                            <Input type="checkbox" onChange={() => setEducationEncouragementProvided(!educationEncouragementProvided)}/>
                            Encouragement
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationEncouragementProvided}>
                          <CardBody>
                          <Input type="textarea" placeholder="Description" name="educationEncouragementDesc"/>
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
                      <Input type="select" name="educationGoalMet" onChange={(event) => setEducationGoalMet(event.target.value !== "Concluded")}>
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
                      <Input type="textarea" disabled={educationGoalMet} placeholder="If concluded, what was the outcome?" name="educationOutcome"/>
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