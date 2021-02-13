import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, ButtonGroup, Form, FormGroup, Label, Input, FormText, Col, Row, Badge, Card, CardBody } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Rating from 'react-rating';

import AppNavbar from '../components/AppNavbar';
import { MultiStepForm, Field, Step } from '../components/MultiStepForm';

function NewClientSignup() {
  return (
    <>
      <AppNavbar/>

      <MultiStepForm name='New Client Registration'>
        {/* note: temporaily delete layout to test validation */}
        <Step name='General'>
          <Field
            name="firstName"
            label="First Name"
            required="First Name is required"
          />
          <Field
            name="lastName"
            label="Last Name"
            required="Last Name is required"
          />
        </Step>

        <Step name='Health Details'>
          <Field
            name="firstName"
            label="First Name"
            required="First Name is required"
          />
        </Step>

        <Step name='Miscellaneous'>
          <Field
            name="firstName"
            label="First Name"
            required="First Name is required"
          />
        </Step>
      </MultiStepForm>
    </>
  )
}

export default NewClientSignup;