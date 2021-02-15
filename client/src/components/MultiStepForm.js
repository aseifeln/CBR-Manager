import React, { useEffect, useState } from 'react';
import { Container, Button, ButtonGroup, Badge } from 'reactstrap';

function MultiStepForm({ children, title, formContainerSize }) {

    let [step, setStep] = useState(0)
    let [forms, setForms ] = useState([])

    useEffect(() => {
      var nonHiddenForms = []
      children.map((form) => {
        if (!form.props['hidden']) {
          nonHiddenForms.push(form)
        }
      })
      setForms(nonHiddenForms);
    })
  
    // methods to move back & forth between sub-forms
    const stepNext = () => setStep(Math.min(step+1, forms.length-1))
    const stepPrev = () => setStep(Math.max(step-1, 0))
  
    return (
      <>
        <Container>
          <div style={formContainerSize}>
            <Badge color="primary" pill>Step {step+1} of {forms.length}</Badge>
            {(title) && <h2>{title}</h2>}
            <hr/>
            <ButtonGroup style={{'width':'100%'}}>
              {forms.map((Child, i) => (
                <Button onClick={() => setStep(i)} outline={(step !== i)}>
                  {`${i+1}. ${Child.props['title'] || 'Form'}`}
                </Button>
              ))}
            </ButtonGroup>
  
            <div class='mt-4'>
              {forms.map((Child, i) => (
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
              <div>Step {step+1} of {forms.length}</div>
  
              <div>
                <Button color="primary" outline onClick={stepPrev}>Prev</Button>
                &nbsp;
  
                { (step+1 >= forms.length) ? 
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

  export default MultiStepForm;