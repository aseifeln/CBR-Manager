import React, { useState, useEffect } from 'react';
import { Container, Button, FormGroup, Col, Row, Label, Input, Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import { MultiStepForm, Step, FieldInput } from "../components/MultiStepForm";

function NewVisit(props) {

  useEffect(() => {
    // TODO: Send GET request for client and worker to fill out some fields
    document.title="New Visit";
  }, [])

  // May be needed for later
  const [ healthChecked, setHealthChecked ] = useState(false);
  const [ socialChecked, setSocialChecked ] = useState(false);
  const [ educationChecked, setEducationChecked ] = useState(false);

  const [ hideHealthSection, setHideHealthSection ] = useState(true);
  const [ wheelchairProvided, setWheelchairProvided ] = useState(false);
  const [ prostheticProvided, setProstheticProvided ] = useState(false);
  const [ orthoticProvided, setOrthoticProvided ] = useState(false);
  const [ wheelchairRepairProvided, setWheelchairRepairProvided ] = useState(false);
  const [ healthReferralProvided, setHealthReferralProvided ] = useState(false);
  const [ healthAdviceProvided, setHealthAdviceProvided ] = useState(false);
  const [ healthAdvocacyProvided, setHealthAdvocacyProvided ] = useState(false);
  const [ healthEncouragementProvided, setHealthEncouragementProvided ] = useState(false);
  const [ healthGoalMet, setHealthGoatMet ] = useState(false);

  const [ hideSocialSection, setHideSocialSection ] = useState(true);
  const [ socialReferralProvided, setSocialReferralProvided ] = useState(false);
  const [ socialAdviceProvided, setSocialAdviceProvided ] = useState(false);
  const [ socialAdvocacyProvided, setSocialAdvocacyProvided ] = useState(false);
  const [ socialEncouragementProvided, setSocialEncouragementProvided ] = useState(false);
  const [ socialGoalMet, setSocialGoalMet ] = useState(false);

  const [ hideEducationSection, setHideEducationSection ] = useState(true);
  const [ educationReferralProvided, setEducationReferralProvided ] = useState(false);
  const [ educationAdviceProvided, setEducationAdviceProvided ] = useState(false);
  const [ educationAdvocacyProvided, setEducationAdvocacyProvided ] = useState(false);
  const [ educationEncouragementProvided, setEducationEncouragementProvided ] = useState(false);
  const [ educationGoalMet, setEducationGoalMet ] = useState(false);

  // May be needed for later
  function changeHiddenValues(event) {
    if (event.target.value !== "CBR") {
      setHideHealthSection(true);
      setHideSocialSection(true);
      setHideEducationSection(true);
    }
    else {
      setHideHealthSection(!healthChecked);
      setHideSocialSection(!socialChecked);
      setHideEducationSection(!educationChecked);
    }
  }

  return (
    <div>
        <Container>
            <Row>
              <Col className="font-weight-bold" style={{fontSize: "30px"}}>
                Client: {props.match.params.id}
              </Col>
              <Col>
                <Button variant="primary" size="md" className="float-right">
                  Save Visit
                </Button>
              </Col>
            </Row>

            <MultiStepForm name="New Visit">
              <Step name="General Info">
                <Row form>
                  <Col>
                    <FormGroup>
                      <FieldInput type="select" name="purposeOfVisit" label="Purpose of visit" required="Purpose is required">
                        <option selected hidden>Select Purpose</option>
                        <option>CBR</option>
                        <option>Disability centre referral</option>
                        <option>Disability centre referral follow up</option>
                      </FieldInput>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <Row>
                    <Col>
                      <Label>
                        Tags (select all that apply)
                      </Label>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col>
                      <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                        <Input type="checkbox" name="healthCheckBox" onChange={() => setHideHealthSection(!hideHealthSection)}/>
                        Health
                      </Label>
                      <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                        <Input type="checkbox" name="educationCheckBox" onChange={() => setHideSocialSection(!hideSocialSection)}/>
                        Social
                      </Label>
                      <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                        <Input type="checkbox" name="socialCheckBox" onChange={() => setHideEducationSection(!hideEducationSection)}/>
                        Education
                      </Label>
                    </Col>
                  </Row>
                </FormGroup>

                <Row form>
                  <Col>
                    <FormGroup>
                        <FieldInput type="date" name="date" label="Date:" required="Date required" defaultValue={(new Date()).toLocaleDateString('en-CA')}/>
                    </FormGroup>
                  </Col>
                </Row>
                
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
                      <FieldInput name="locationOfVisit" label="Location of visit"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col xs={10}>
                    <FormGroup>
                      <FieldInput type="select" name="location" label="Location" required="Location is required">
                        <option selected hidden>Select a location</option>
                        <option>BidiBidi Zone 1</option>
                        <option>BidiBidi Zone 2</option>
                        <option>BidiBidi Zone 3</option>
                        <option>BidiBidi Zone 4</option>
                        <option>BidiBidi Zone 5</option>
                        <option>Palorinya Basecamp</option>
                        <option>Palorinya Zone 1</option>
                        <option>Palorinya Zone 2</option>
                        <option>Palorinya Zone 3</option>
                      </FieldInput>
                    </FormGroup>
                  </Col>

                  <Col xs={2}>
                    <FormGroup>
                      <FieldInput name="villageNum" label="Village Number" type="number" required="Village number is required"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Step>

              <Step name="Health" isEnabled={!hideHealthSection}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold">
                        What was provided? (Select all that applies)
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="wheelchairCheck" onChange={() => setWheelchairProvided(!wheelchairProvided)}/>
                            Wheelchair
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={wheelchairProvided}>
                          <CardBody>
                            {(wheelchairProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="wheelchairDesc" required={wheelchairProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="prostheticCheck" onChange={() => setProstheticProvided(!prostheticProvided)}/>
                            Prosthetic
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={prostheticProvided}>
                          <CardBody>
                            {(prostheticProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="prostheticDesc" required={prostheticProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="orthoticCheck" onChange={() => setOrthoticProvided(!orthoticProvided)}/>
                            Orthotic
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={orthoticProvided}>
                          <CardBody>
                            {(orthoticProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="orthoticDesc" required={orthoticProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="wheelchairRepairsCheck" onChange={() => setWheelchairRepairProvided(!wheelchairRepairProvided)}/>
                            Wheelchair Repairs
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={wheelchairRepairProvided}>
                          <CardBody>
                            {(wheelchairRepairProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="wheelchairRepairsDesc" required={wheelchairProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="healthReferralCheck" onChange={() => setHealthReferralProvided(!healthReferralProvided)}/>
                            Referral to health centre
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthReferralProvided}>
                          <CardBody>
                            {(healthReferralProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="healthReferralDesc" required={healthReferralProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="healthAdviceCheck" onChange={() => setHealthAdviceProvided(!healthAdviceProvided)}/>
                            Advice
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthAdviceProvided}>
                          <CardBody>
                            {(healthAdviceProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="healthAdviceDesc" required={healthAdviceProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="healthAdvocacyCheck" onChange={() => setHealthAdvocacyProvided(!healthAdvocacyProvided)}/>
                            Advocacy
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthAdvocacyProvided}>
                          <CardBody>
                            {(healthAdvocacyProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="healthAdvocacyDesc" required={healthAdvocacyProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="healthEncouragementCheck" onChange={() => setHealthEncouragementProvided(!healthEncouragementProvided)}/>
                            Encouragement
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={healthEncouragementProvided}>
                          <CardBody>
                            {(healthEncouragementProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="healthEncouragementDesc" required={healthEncouragementProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <FieldInput type="select" name="healthGoalMet" label="Goal met?" required="Selection required" onChange={(event) => {
                        if (event.target) {
                          setHealthGoatMet(event.target.value === "Concluded")
                        }
                      }}>
                        <option selected hidden>Was the goal met?</option>
                        <option>Cancelled</option>
                        <option>Ongoing</option>
                        <option>Concluded</option>
                      </FieldInput>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      {(healthGoalMet) ? (
                        <FieldInput type="textarea" disabled={!healthGoalMet} placeholder="If concluded, what was the outcome?" name="healthOutcome" label="Outcome" required={healthGoalMet && "Outcome required"}/>
                      ) : ''}
                    </FormGroup>
                  </Col>
                </Row>
              </Step>

              <Step name="Social" isEnabled={!hideSocialSection}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold">
                        What was provided? (Select all that applies)
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="socialReferralCheck" onChange={() => setSocialReferralProvided(!socialReferralProvided)}/>
                            Referral to other org
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialReferralProvided}>
                          <CardBody>
                            {(socialReferralProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="socialReferralDesc" required={socialReferralProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="socialAdviceCheck" onChange={() => setSocialAdviceProvided(!socialAdviceProvided)}/>
                            Advice
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialAdviceProvided}>
                          <CardBody>
                            {(socialAdviceProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="socialAdviceDesc" required={socialAdviceProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="socialAdvocacyCheck" onChange={() => setSocialAdvocacyProvided(!socialAdvocacyProvided)}/>
                            Advocacy
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialAdvocacyProvided}>
                          <CardBody>
                            {(socialAdvocacyProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="socialAdvocacyDesc" required={socialAdvocacyProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="socialEncouragementCheck" onChange={() => setSocialEncouragementProvided(!socialEncouragementProvided)}/>
                            Encouragement
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={socialEncouragementProvided}>
                          <CardBody>
                            {(socialEncouragementProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="socialEncouragementDesc" required={socialEncouragementProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <FieldInput type="select" name="socialGoalMet" label="Goal met?" required="Selection required" onChange={(event) => {
                        if (event.target) {
                          setSocialGoalMet(event.target.value === "Concluded")
                        }
                      }}>
                        <option selected hidden>Was the goal met?</option>
                        <option>Cancelled</option>
                        <option>Ongoing</option>
                        <option>Concluded</option>
                      </FieldInput>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      {(socialGoalMet) ? (
                        <FieldInput type="textarea" disabled={!socialGoalMet} placeholder="If concluded, what was the outcome?" name="socialOutcome" label="Outcome" required={socialGoalMet && "Outcome required"}/>
                      ) : ''}
                    </FormGroup>
                  </Col>
                </Row>
              </Step>

              <Step name="Education" isEnabled={!hideEducationSection}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="font-weight-bold">
                        What was provided? (Select all that applies)
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="educationReferralCheck" onChange={() => setEducationReferralProvided(!educationReferralProvided)}/>
                            Referral to other org
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationReferralProvided}>
                          <CardBody>
                            {(educationReferralProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="educationReferralDesc" required={educationReferralProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="educationAdvice" onChange={() => setEducationAdviceProvided(!educationAdviceProvided)}/>
                            Advice
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationAdviceProvided}>
                          <CardBody>
                            {(educationAdviceProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="educationAdviceDesc" required={educationAdviceProvided && "Description Required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="educationAdvocacyCheck" onChange={() => setEducationAdvocacyProvided(!educationAdvocacyProvided)}/>
                            Advocacy
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationAdvocacyProvided}>
                          <CardBody>
                            {(educationAdvocacyProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="educationAdvocacyDesc" required={educationAdvocacyProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Card>
                        <CardHeader>
                          <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                            <Input type="checkbox" name="educationEncouragementCheck" onChange={() => setEducationEncouragementProvided(!educationEncouragementProvided)}/>
                            Encouragement
                          </Label>
                        </CardHeader>
                        <Collapse isOpen={educationEncouragementProvided}>
                          <CardBody>
                            {(educationEncouragementProvided) ? (
                              <FieldInput type="textarea" placeholder="Description" name="educationEncouragementDesc" required={educationEncouragementProvided && "Description required"}/>
                            ) : ''}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <FieldInput type="select" name="educationGoalMet" label="Goal met?" required="Selection required" onChange={(event) => {
                        if (event.target) {
                          setEducationGoalMet(event.target.value === "Concluded")
                        }
                      }}>
                        <option selected hidden>Was the goal met?</option>
                        <option>Cancelled</option>
                        <option>Ongoing</option>
                        <option>Concluded</option>
                      </FieldInput>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      {(educationGoalMet) ? (
                        <FieldInput type="textarea" disabled={!educationGoalMet} placeholder="If concluded, what was the outcome?" name="educationOutcome" label="Outcome" required={educationGoalMet && "Outcome required"}/>
                      ) : ''}
                    </FormGroup>
                  </Col>
                </Row>
              </Step>

            </MultiStepForm>
        </Container>
    </div>
  )
}

export default NewVisit;