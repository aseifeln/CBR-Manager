import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isPattern } from '@formiz/validations';
import { Label, Col, Row } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Rating from 'react-rating';

import AppNavbar from '../components/AppNavbar';
import { MultiStepForm, FieldInput, Step } from '../components/MultiStepForm';

function NewClientSignup() {
  const onValidSubmit = (data) => {
    console.log(data)
  }

  const [imagePreviewSrc, setImagePreviewSrc] = useState('')
  const phoneNumberRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g

  return (
    <>
      <AppNavbar/>
      <MultiStepForm name='New Client Registration' onValidSubmit={onValidSubmit}>

        {/* 1. General Details */}
        <Step name='General'>
          <Row form>
            <Col xs={6}>
              <FieldInput name="FirstName" label="First Name" type="text" required="First Name is required"/>
            </Col>

            <Col xs={6}>
              <FieldInput name="LastName" label="Last Name" type="text" required="Last Name is required"/>
            </Col>
          </Row>

          <Row form>
            <Col xs={2}>
              <FieldInput name="Age" label="Age" type="number" min="1" required="Age is required"/>
            </Col>

            <Col xs={10}>
              <div class='ml-4 pl-2 mt-3 pt-3'>
                <Label check>
                  <FieldInput 
                    name="Gender" 
                    type="radio"
                    class='d-inline-block'
                    defaultValue="Male"/>
                  Male
                </Label>

                <Label check>
                  <FieldInput 
                    name="Gender" 
                    type="radio" 
                    defaultValue="Female"
                    class='d-inline-block ml-4 pl-1'
                    defaultChecked/>
                  Female
                </Label>
              </div>
            </Col>

            <Col xs={12}>
              <img src={imagePreviewSrc} style={{ width: '100%', maxWidth: 125 }}/>
              <FieldInput 
                name="Photo" 
                label="Client Picture (Optional)" 
                type="file"
                onChanged={(e) => {
                  setImagePreviewSrc(URL.createObjectURL(e.target.files[0]))
                }}
              />
            </Col>
          </Row>

          <hr/>

          <Row form>
            <Col xs={12}>
              <FieldInput 
                name="Date" 
                label="New Client Date" 
                type="date" 
                defaultValue={(new Date()).toLocaleDateString('en-CA')}
              />
            </Col>

            <Col xs={9} md={10}>
              <FieldInput name="Location" label="Location" type="select" required="Location is required">
                <option selected hidden>Choose a location</option>
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
            </Col>

            <Col xs={3} md={2}>
              <FieldInput name="VillageNo" label="Village #" type="number" required="Village No. is required"/>
            </Col>

            <Col xs={12}>
              <FieldInput 
                name="ContactNo" 
                label="Contact Number (Optional)" 
                type="text"
                placeholder="e.g. 756-126-9380"
                validations={[
                  {
                    rule: isPattern(phoneNumberRegex),
                    message: 'Invalid contact number format'
                  }
                ]}
              />
            </Col>
          </Row>
        </Step>

        {/* 2. Health Details */}
        <Step name='Health Details'>
          <Row form>
            <Col xs={6}>
              <FieldInput 
                name="Test" 
                label="Tester" 
                type="text"
                placeholder="e.g. 756-126-9380"
              />
            </Col>
          </Row>
        </Step>
      </MultiStepForm>
    </>
  )
  
}

export default NewClientSignup;