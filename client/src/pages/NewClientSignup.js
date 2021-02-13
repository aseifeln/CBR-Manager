import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, ButtonGroup, Form, FormGroup, Label, Input, FormText, Col, Row, Badge, Card, CardBody } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Rating from 'react-rating';

import AppNavbar from '../components/AppNavbar';

function MultiStepForm({ children, title }) {
  let [step, setStep] = useState(0)

  // methods to move back & forth between sub-forms
  const stepNext = () => setStep(Math.min(step+1, children.length-1))
  const stepPrev = () => setStep(Math.max(step-1, 0))

  const formContainerSize = {
    margin: 'auto',
    maxWidth: 600
  }

  return (
    <>
      <Container>
        <div style={formContainerSize}>
          <Badge color="primary" pill>Step {step+1} of {children.length}</Badge>
          {(title) && <h2>{title}</h2>}
          <hr/>
          <ButtonGroup style={{'width':'100%'}}>
            {children.map((Child, i) => (
              <Button onClick={() => setStep(i)} outline={(step !== i)}>
                {`${i+1}. ${Child.props['title'] || 'Form'}`}
              </Button>
            ))}
          </ButtonGroup>

          <div class='mt-4'>
            {children.map((Child, i) => (
              <div class={(step !== i) && 'd-none'}>
                {Child}
              </div>
            ))}
          </div>

          {/* dummy element just to add extra space */}
          <div class='invisible py-4'>
            <Button block></Button>
          </div>
        </div>
      </Container>

      <div class='fixed-bottom bg-light py-2'>
        <Container>
          <div class='d-flex justify-content-between align-items-center' style={formContainerSize}>
            <div>Step {step+1} of {children.length}</div>

            <div>
              <Button color="primary" outline onClick={stepPrev}>Prev</Button>
              &nbsp;

              { (step+1 >= children.length) ? 
                (<Button color="primary">Submit</Button>) : 
                (<Button color="primary" onClick={stepNext}>Next</Button>)
              }
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

function NewClientSignup() {
  return (
    <>
      <AppNavbar/>
      <MultiStepForm title='New Client: John Doe'>

        {/* SECTION 1. General Details */}
        <Form title='General'>
          <Row form>
            <Col xs={6}>
              <FormGroup>
                <Label for="exampleEmail">First Name</Label>
                <Input type="text" name="first-name" />
              </FormGroup>
            </Col>

            <Col xs={6}>
              <FormGroup>
                <Label for="exampleEmail">Last Name</Label>
                <Input type="text" name="first-name" />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col xs={2}>
              <FormGroup>
                <Label for="exampleEmail">Age</Label>
                <Input type="number" name="age" />
              </FormGroup>
            </Col>

            <Col xs={10}>
              <FormGroup class='ml-2'>
                <Label class='mb-2 pb-1'>Gender</Label>
                <br/>

                <Label check>
                  <Input type="radio" name="radio2" style={{  
                    'position': 'relative',
                    'marginLeft': 0,
                    'marginRight': '0.05em'
                  }} />&nbsp;Male&nbsp;
                </Label>
                <Label check>
                  <Input type="radio" name="radio2" style={{  
                    'position': 'relative',
                    'marginLeft': '0.2em',
                    'marginRight': '0.05em'
                  }}/>&nbsp;Female&nbsp;
                </Label>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={12}>
              <FormGroup>
                <Button outline>Upload Client Picture</Button>
              </FormGroup>
            </Col>
          </Row>

          <hr/>

          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="exampleEmail">Date</Label>
                <Input type="date" name="age" />
              </FormGroup>
            </Col>
          </Row>

          <Row form>      
            <Col xs={10} md={8}>
              <FormGroup>
                <Label for="location">Location</Label>
                <Input type="select" name="select">
                  <option>BidiBidi Zone 1</option>
                  <option>BidiBidi Zone 2</option>
                  <option>BidiBidi Zone 3</option>
                  <option>BidiBidi Zone 4</option>
                  <option>BidiBidi Zone 5</option>
                  <option>Palorinya Basecamp</option>
                  <option>Palorinya Zone 1</option>
                  <option>Palorinya Zone 2</option>
                  <option>Palorinya Zone 3</option>
                </Input>
              </FormGroup>
            </Col>

            <Col xs={2} md={4}>
              <FormGroup>
                <Label for="village-num">Village #</Label>
                <Input type="number" name="village-num"/>
              </FormGroup>
            </Col>

            <Col md={12}>
              <FormGroup>
                <Label for="exampleEmail">Contact Number (optional)</Label>
                <Input type="text" name="age" placeholder="e.g. 123-123-1234" />
              </FormGroup>
            </Col>
          </Row>
        </Form>

        {/* SECTION 2. Health Details */}
        <Form title='Health Details'>
          <h4>Disabilities</h4>
          <FormText>Physical/mental disabilities the client has.</FormText>
          <div class='mt-2'>
            <Typeahead
              labelKey="disabilities"
              placeholder="Add a disability type&#8230; (e.g. Spina Bifida)"
              multiple
              options={[
                "Amputee", "Polio", "Spinal Cord Injury", 
                "Cerebral Palsy", "Spina Bifida", "Hydrocephalus", 
                "Visual Impairment", "Hearing Impairment"
              ]}
            />

            <FormGroup check inline>
              <Label>
                <Input type="checkbox" /> Don't know/Other
              </Label>
            </FormGroup>
          </div>

          <h4 class='mt-4'>Health Check</h4>
          <FormText>Rate the following areas under <a href='#'>HHA's wellbeing guidelines</a>.</FormText> 

          <div class='mt-3'>
            <Card>
              <CardBody>
                <h6>General Wellbeing</h6>
                <Rating />

                <FormGroup>
                  <Label for="exampleText">Client requirements</Label>
                  <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>

                <FormGroup>
                  <Label for="exampleText">Goals</Label>
                  <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
              </CardBody>
            </Card>
          </div>
        </Form>

        {/* SECTION 3. Miscellaneous */}
        <Form title='Misc.'>
          <Row form>
            <Col md={12}>
              <h5>Available for Interview?</h5>
              <FormGroup check inline>
                <Label>
                  <Input type="checkbox" /> The client consents to future interviews.
                </Label>
              </FormGroup>
            </Col>

            <Col xs={12}>
              <h5 class='mt-2'>Caregiver Availability</h5>
              <FormGroup check inline>
                <Label>
                  <Input type="checkbox" /> Caregiver is present?
                </Label>
              </FormGroup>

              <Col class='mt-2 ml-4'>
                <hr class='mt-2 mb-3'/>
                <FormGroup>
                  <Label for="exampleEmail">Contact Number (optional)</Label>
                  <Input type="text" name="age" placeholder="e.g. 123-123-1234" />
                </FormGroup>
                <FormGroup>
                  <Button outline>Upload Client &amp; Caregiver Picture</Button>
                  <FormText>The photo should include both the client and caregiver within the same frame.</FormText>
                </FormGroup>
              </Col>
            </Col>
          </Row>
        </Form>
      </MultiStepForm>
    </>
  )
}

export default NewClientSignup;