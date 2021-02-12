import React from 'react';
import { Container, Button, FormGroup, Form, Col, Row, Input, Label } from 'reactstrap';
import { MultiStepForm } from "./NewClientSignup"

import AppNavbar from '../components/AppNavbar';

function NewVisit() {

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
                      <Label for="wheelChair">
                        Wheelchair
                      </Label>
                      <Input type="textarea" placeholder="Description" id="wheelchair"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="prosthetic">
                        Prosthetic
                      </Label>
                      <Input type="textarea" placeholder="Description" id="prosthetic"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="wheelchairRepairs">
                        Wheelchair Repairs
                      </Label>
                      <Input type="textarea" placeholder="Description" id="wheelchairRepairs"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="referral">
                        Referral to health centre
                      </Label>
                      <Input type="textarea" placeholder="Description" id="referrals"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="advice">
                        Advice
                      </Label>
                      <Input type="textarea" placeholder="Description" id="advice"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="advocacy">
                        Advocacy
                      </Label>
                      <Input type="textarea" placeholder="Description" id="advocacy"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row Form>
                  <Col>
                    <FormGroup>
                      <Label for="encouragement">
                        Encouragement
                      </Label>
                      <Input type="textarea" placeholder="Description" id="encouragement"/>
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
                      <Input type="textarea" placeholder="If concluded, what was the outcome?" id="outcome"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>

              <Form title="Social">
                Social
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