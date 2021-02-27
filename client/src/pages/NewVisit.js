import React, { useState, useEffect } from 'react';
import { Container, Button, FormGroup, Col, Row, Label, Input, Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import { MultiStepForm, Step, FieldInput } from "../components/MultiStepForm"


function NewVisit(props) {

  useEffect(() => {
    // TODO: Send GET request for client and worker to fill out some fields
    document.title="New Visit";
  }, [])

  function prepareData(data) {

    var newData = {}

    // Prepare General info
    newData['VisitPurpose'] = data.purposeOfVisit;
    newData['Date'] = data.date;
    newData['Location'] = data.location;
    newData['VillageNumber'] = data.villageNum;
    
    // Placeholder
    newData['WorkerId'] = "7bbdcaf6-1399-4764-9ef4-dad297f725f3";

    if (!hideHealthSection) {
      // Prepare Health Form data
      const healthform = {};

      if (wheelchairProvided) {
        healthform['Wheelchair'] = data.wheelchairDesc;
      }

      if (prostheticProvided) {
        healthform['Prosthetic'] = data.prostheticDesc;
      }

      if (orthoticProvided) {
        healthform['Orthotic'] = data.orthoticDesc;
      }

      if (wheelchairRepairProvided) {
        healthform['WheelchairRepair'] = data.wheelchairRepairsDesc;
      }

      if (healthReferralProvided) {
        healthform['HealthCenterReferral'] = data.healthReferralDesc;
      }

      if (healthAdviceProvided) {
        healthform['Advice'] = data.healthAdviceDesc;
      }

      if (healthAdvocacyProvided) {
        healthform['Advocacy'] = data.healthAdvocacyDesc;
      }

      if (healthEncouragementProvided) {
        healthform['Encouragement'] = data.healthEncouragementDesc;
      }

      healthform['GoalMet'] = data.healthGoalMet;

      if (data.healthGoalMet === "Concluded") {
        healthform['ConcludedOutcome'] = data.healthOutcome;
      }

      newData['HealthForm'] = healthform;
    }

    if (!hideSocialSection) {
      // Prepare Social Form data
      const socialform = {};

      if (socialAdviceProvided) {
        socialform['Advice'] = data.socialAdviceDesc;
      }

      if (socialAdvocacyProvided) {
        socialform['Advocacy'] = data.socialAdvocacyDesc;
      }

      if (socialReferralProvided) {
        socialform['OrganizationReferral'] = data.socialReferralDesc;
      }

      if (socialEncouragementProvided) {
        socialform['Encouragement'] = data.socialEncouragementDesc;
      }

      socialform['GoalMet'] = data.socialGoalMet;

      if (data.socialGoalMet === "Concluded") {
        socialform['ConcludedOutcome'] = data.socialOutcome;
      }

      newData['SocialForm'] = socialform;
    }

    if (!hideEducationSection) {
      // Prepare Education Form data
      const educationform = {};

      if (educationAdviceProvided) {
        educationform['Advice'] = data.educationAdviceDesc;
      }

      if (educationAdvocacyProvided) {
        educationform['Advocacy'] = data.educationAdvocacyDesc;
      }

      if (educationReferralProvided) {
        educationform['OrganizationReferral'] = data.educationReferralDesc;
      }

      if (educationEncouragementProvided) {
        educationform['Encouragement'] = data.educationEncouragementDesc;
      }

      educationform['GoalMet'] = data.educationGoalMet;

      if (data.educationGoalMet === "Concluded") {
        educationform['ConcludedOutcome'] = data.educationOutcome;
      }

      newData['EducationForm'] = educationform;
    }

    console.log(newData);

    return newData;
  }

  function onValidSubmit(data) {
    data = prepareData(data);
    console.log(data)
  } 

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

            <MultiStepForm name="New Visit" onValidSubmit={onValidSubmit}>
              <Step name="General Info">
                <Row form>
                  <Col>
                    <FormGroup>
                      <FieldInput type="select" name="purposeOfVisit" label="Purpose of visit">
                        <option selected hidden>Select Purpose</option>
                        <option>CBR</option>
                        <option>Disability centre referral</option>
                        <option>Disability centre referral follow up</option>
                      </FieldInput>
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
                        <FieldInput type="date" name="date" label="Date:" defaultValue={(new Date()).toLocaleDateString('en-CA')}/>
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
                      <FieldInput type="select" name="location" label="Location">
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
                      <FieldInput name="villageNum" label="Village no"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="wheelchairDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="prostheticDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="orthoticDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="wheelchairRepairsDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="healthReferralDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="healthAdviceDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="healthAdvocacyDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="healthEncouragementDesc"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <FieldInput type="select" name="healthGoalMet" label="Goal met?" onChange={(event) => {
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
                      <FieldInput type="textarea" disabled={!healthGoalMet} placeholder="If concluded, what was the outcome?" name="healthOutcome" label="Outcome"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="socialReferralDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="socialAdviceDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="socialAdvocacyDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="socialEncouragementDesc"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <FieldInput type="select" name="socialGoalMet" label="Goal met?" onChange={(event) => {
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
                      <FieldInput type="textarea" disabled={!socialGoalMet} placeholder="If concluded, what was the outcome?" name="socialOutcome" label="Outcome"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="educationReferralDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="educationAdviceDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="educationAdvocacyDesc"/>
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
                          <FieldInput type="textarea" placeholder="Description" name="educationEncouragementDesc"/>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <FieldInput type="select" name="educationGoalMet" label="Goal met?" onChange={(event) => {
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
                      <FieldInput type="textarea" disabled={!educationGoalMet} placeholder="If concluded, what was the outcome?" name="educationOutcome" label="Outcome"/>
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