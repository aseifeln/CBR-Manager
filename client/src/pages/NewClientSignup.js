import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, ButtonGroup, Form, FormGroup, Label, FormText, Col, Row, Badge, Card, CardBody } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Rating from 'react-rating';

import AppNavbar from '../components/AppNavbar';
import { MultiStepForm, Field, Step } from '../components/MultiStepForm';

function NewClientSignup() {
  const onValidSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <AppNavbar/>

      <MultiStepForm name='New Client Registration' onValidSubmit={onValidSubmit}>
        {/* note: temporaily delete layout to test validation */}
        <Step name='General'>
          <Row form>
            <Col xs={6}>
              <Field
                name="firstName"
                label="First Name"
                type="text"
                required="First Name is required"
              />
            </Col>

            <Col xs={6}>
              <Field
                name="lastName"
                label="Last Name"
                type="text"
                required="Last Name is required"
              />
            </Col>
          </Row>

          <Row form>
            <Col xs={2}>
              <Field
                name="age"
                label="Age"
                type="number"
                min="1"
                required="Age is required"
              />
            </Col>

            <Col xs={10}>
            </Col>
          </Row>

          <hr/>
        </Step>

        <Step name='Health Details'>
          <Row form>
            <Col xs={6}>
              <Field
                name="test"
                label="Test"
                type="text"
                required="Test is required"
              />
            </Col>
          </Row>
        </Step>
      </MultiStepForm>
    </>
  )
}

export default NewClientSignup;