import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, FormFeedback, InputGroup, Input, Label, Button, ButtonGroup, Badge, Tooltip } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Formiz, FormizStep, useField, useForm } from '@formiz/core';

function MultiStepForm({ children, name, onValidSubmit }) {
  let formState = useForm()

  let [tooltipOpen, setTooltipOpen] = useState(false)
  const tooltipToggle = () => setTooltipOpen(!tooltipOpen)
  const isInvalidSubmit = (formState.isLastStep && !formState.isValid)

  const formContainerSize = {
    margin: 'auto',
    maxWidth: 600
  }

  return (
    <Formiz connect={formState} onValidSubmit={onValidSubmit}>
      <Container>
        <div style={formContainerSize}>
          <Badge color="primary" pill>Step {formState.currentStep?.index + 1} of {formState.steps.length}</Badge>

          {(name) && <h2 style={{textAlign: 'left'}}>{name}</h2>}
          <hr/>

          {/* step navigation buttons */}
          <ButtonGroup style={{'width':'100%'}}>
            {formState.steps.map((step, i) => {
							const { name } = step
              const goToStep = () => formState.goToStep(name)
							return (
								<Button onClick={goToStep} outline={(formState.currentStep?.index !== i)}>
									<strong>{`${i+1}. ${name || 'Form'}`}</strong>
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
            <Button block></Button>
          </div>
        </div>
      </Container>

      <div class='fixed-bottom bg-light py-2'>
        <Container>
          <div class='d-flex justify-content-between align-items-center' style={formContainerSize}>
            <div>
							<strong>{formState.currentStep?.name} &middot;&nbsp;</strong>
							{formState.currentStep?.index + 1} of {formState.steps.length}
						</div>

            <div>
              <Button 
                color="primary"
                outline
                disabled={formState.isFirstStep}
                onClick={formState.prevStep}>
                  Prev
              </Button>
              &nbsp;

              <span id="form-button" class="d-inline-block">
                {((formState.isLastStep) ? (
                  <Button
                    color="primary" 
                    type="submit" 
                    form="multi-form"
                    disabled={isInvalidSubmit}
                    style={(isInvalidSubmit) ? { pointerEvents: 'none' } : {}}>
                    Submit
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    onClick={formState.submitStep}>
                    Next
                  </Button>
                ))}

                <Tooltip 
                  target="form-button"
                  placement="auto" 
                  isOpen={tooltipOpen && isInvalidSubmit} 
                  toggle={tooltipToggle} 
                  autohide={true}>
                  Parts of the form are still incomplete or invalid
                </Tooltip>
              </span>
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

function FieldInput(props) {
  const [isFocused, setFocused] = useState(false)
  const { className, label, onChange } = props
	const { errorMessage, isValid, setValue, value, isPristine, isSubmitted } = useField(props)

	const showError = !isValid && !isFocused && (!isPristine || isSubmitted)

  return (
    <div className={className}>
      <FormGroup>
        {(label) && (<Label>{label}</Label>)}
        <InputGroup>
          <Input
            {...props}
            value={value ?? ''}
            invalid={showError}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              setValue(e.target.value)
              if (onChange) onChange(e)
            }}
          />
          <FormFeedback>{showError && errorMessage}</FormFeedback>
        </InputGroup>
      </FormGroup>
    </div>
  )
}

function FieldCheck(props) {
  // <FieldCheck/> for checkboxes and radios
  const { className, value: propValue, defaultChecked, label, type, onChange } = props
	const { errorMessage, isValid, setValue, value, isPristine, isSubmitted } = useField(props)

  useEffect(() => {
    if (defaultChecked) setValue(propValue || true)
  }, [])

	const showError = !isValid && (!isPristine || isSubmitted)

  return (
    <div className={`d-inline-block ml-3 pl-1 ${className || ''}`}>
      <FormGroup>
        <InputGroup>
          <Label>
            <Input
              {...props}
              className=''
              value = {value ?? ''}
              invalid={showError}
              onChange={(e) => {
                if (type === 'radio') setValue(propValue)
                else if (type === 'checkbox') setValue(e.target.checked)
                if (onChange) onChange(e)
              }}
            />{' ' + label}
          </Label>
          <FormFeedback>{showError && errorMessage}</FormFeedback>
        </InputGroup>
      </FormGroup>
    </div>
  )
}

function FieldTypeahead(props) {
  const [isFocused, setFocused] = useState(false)
  const { className, label, onChange } = props
	const { errorMessage, isValid, setValue, value, isPristine, isSubmitted } = useField(props)

	const showError = !isValid && !isFocused && (!isPristine || isSubmitted)

  return (
    <div className={className}>
      <FormGroup>
        {(label) && (<Label>{label}</Label>)}
        <InputGroup>
          <Typeahead
            {...props}
            labelKey={label}
            selected={value}
            isInvalid={showError}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(v) => {
              setValue(v)
              if (onChange) setValue(onChange(v))
            }}
          />
          <FormFeedback>{showError && errorMessage}</FormFeedback>
        </InputGroup>
      </FormGroup>
    </div>
  )
}

export { MultiStepForm, Step, FieldInput, FieldCheck, FieldTypeahead }