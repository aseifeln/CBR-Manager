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

                  <FormGroup>
                    <Label for="date">
                      Date:*
                      <Input type="date" id="date"/>
                    </Label>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label for="worker">
                      CBR Worker*
                    </Label>
                    <Input placeholder="Autofill CBR worker Name" id="worker"/>
                  </FormGroup>

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
                    <Label for="villageNum">
                      Village no*
                    </Label>
                    <Input id="villageNum"/>
                  </FormGroup>
              </Form>

              <Form title="Health">
                Health
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