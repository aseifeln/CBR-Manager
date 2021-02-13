import React, { useState } from 'react';
import { Container, Form, Button, ButtonGroup, Badge } from 'reactstrap';
import { Formiz, FormizStep, useField, useForm } from '@formiz/core';

function MultiStepForm({ children, name }) {
	let formState = useForm()

  const formContainerSize = {
    margin: 'auto',
    maxWidth: 600
  }

  return (
    <Formiz connect={formState}>
      <Container>
        <div style={formContainerSize}>
          <Badge color="primary" pill>Step {formState.currentStep?.index + 1} of {formState.steps.length}</Badge>

          {(name) && <h2>{name}</h2>}
          <hr/>

          {/* step navigation buttons */}
          <ButtonGroup style={{'width':'100%'}}>
            {formState.steps.map((step, i) => {
							const { name } = step
							const goToStep = () => formState.goToStep(name)
							return (
								<Button onClick={goToStep} outline={(formState.currentStep?.index !== i)}>
									{`${i+1}. ${name || 'Form'}`}
								</Button>
							)
						})}
          </ButtonGroup>

          {/* the sub-forms */}
          <div class='mt-4'>
						<Form id='multi-form' onSubmit={formState.submitStep}>
							{children}
						</Form>
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
            <div>
							<strong>{formState.currentStep?.name} &middot;&nbsp;</strong>
							Step {formState.currentStep?.index + 1} of {formState.steps.length}
						</div>

            <div>
              <Button color="primary" outline onClick={formState.prevStep}>Prev</Button>
              &nbsp;

              { (formState.isLastStep) ? 
                (<Button type="submit" form='multi-form' color="primary" disabled={!formState.isValid}>Submit</Button>) : 
                (<Button color="primary" onClick={formState.nextStep}>Next</Button>)
              }
            </div>
          </div>
        </Container>
      </div>
    </Formiz>
  )
}

function Step(props) {
	return (
		<FormizStep {...props}/>
	)
}

function Field(props) {
  const { errorMessage, isValid, setValue, value } = useField(props)

  return (
    <div>
      <input
        value={value ?? ''}
        onChange={e => setValue(e.target.value)}
      />
      {
        !isValid
        && errorMessage // Display error message
      }
    </div>
  )
}

export { MultiStepForm, Field, Step }