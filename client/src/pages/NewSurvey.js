import React, { useState, useEffect, useContext } from 'react';
import { Container, FormGroup, Col, Row, Label} from 'reactstrap';
import { MultiStepForm, Step, FieldInput, FieldTypeahead,FieldCheck } from "../components/MultiStepForm";
import { useHistory } from "react-router-dom";
import CookieChecker from '../components/CookieChecker';
import axios from 'axios';
import {getGPSLocation} from './Helpers';
import { UserContext } from '../components/UserContext';


function NewSurvey(props){
    const history = useHistory();
    const [ client, setClient ] = useState({});
    const [ clients, setClients ] = useState([]);
    const [ clientProvided, setClientProvided ] = useState(true);
    const [ clientFound, setClientFound ] = useState(false);
    const [ GPSLocation, setGPSLocation ] = useState('');
    const [ worker, setWorker ] = useState({});
    const context = useContext(UserContext);
  
    const [ workerInfoFound, setWorkerInfoFound ] = useState(false);

    const [ hasAccessToRehab, setHasAccessToRehab] = useState(true);
    const [ hasAccessToAssistiveDevice, setHasAccessToAssistiveDevice] = useState(true);
    const [ needAccessToAssistiveDevice, setNeedAccessToAssistiveDevice] = useState(true);

    const [ goesToSchool, setGoesToSchool] = useState(true);

    const [ working, setWorking] = useState(true);

    const [ hasReferral, setHasReferral] = useState(true);
    const [ isMalnourished, setIsMalnourished] = useState(true);
    const [ partOfOrganizations, setPartOfOrganizations] = useState(true);

  
    useEffect(() => {
  
      //Get the current GPS Location
      getGPSLocation(setGPSLocation);
    },[])
  
    useEffect(() => {
  
      axios.get('/users/worker/' + context.WorkerId)
      .then(response => {
        setWorker(response.data[0].Worker);
        setWorkerInfoFound(true);
      })
      .catch(error => {
        console.log(error);
      })
  
      if (typeof props.match.params.id !== 'undefined') {
        axios.get('/clients/' + props.match.params.id)
        .then(response => {
            setClient(response.data);
            setClientFound(true);
            setClientProvided(true);
        })
        .catch(error => {
            console.log(error);
            setClientFound(false);
            document.title = "Client not found";
            alert("Client not found");
            history.push('/dashboard')
        })
      }
      else {
        setClientProvided(false)
        axios.get('/clients')
        .then(response => {
          const clientArr = [];
          // Reference: https://stackoverflow.com/a/57008713
          // FieldTypeahead options must be an array
          Object.keys(response.data).forEach(key => clientArr.push({value: response.data[key].ClientId, label: response.data[key].FirstName + ' ' + response.data[key].LastName}));
          setClients(clientArr);
        })
        .catch(error => {
          console.log(error);
          alert("Something went wrong")
          history.push('/dashboard')
        })
      }
  
      document.title="New Visit";
    }, [])

    return(
        <>
            <CookieChecker></CookieChecker>
                <Container>
                    <MultiStepForm name="New Baseline Survey">

                        <Step name="Livelihood">
                            <Row form>
                                <Col>
                                    <FormGroup>
                                    {(clientProvided) ? (
                                        <FieldInput label="Client" name="client" disabled required="Client is required"
                                        defaultValue={client.FirstName + ' ' + client.LastName}/>
                                    ) : (
                                        <div>
                                        <Label>Client</Label>
                                        <FieldTypeahead
                                            name="client"
                                            required="Client is required"
                                            options={clients}/>
                                        </div>
                                    )}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Step>

                        {/* Health Section */}
                        
                        <Step name="Health">
                          <Row form>
                            <Col>
                              <FormGroup>
                                <FieldInput type="select" name="general-health" label="General Heatlh Rating" required="Rate 1-4 your general health">
                                  <option selected hidden>Select a rating</option>
                                  <option>1-Very Poor</option>
                                  <option>2-Poor</option>
                                  <option>3-Fine</option>
                                  <option>4-Good</option>
                                </FieldInput>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Label>Do you have access to rehabilitation services (e.g physiotherapy, speech therapy, training how to use assistive device)?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="access-to-rehab" type="radio" label="Yes" value="Yes" defaultChecked
                                    onChange={() => setHasAccessToRehab(true)}/>
                                    <FieldCheck name="access-to-rehab" type="radio" label="No" value="No" className='ml-4 pl-2'
                                    onChange={() => setHasAccessToRehab(false)}/>
                                </FormGroup>
                            </Col>
                          </Row>
                          {!hasAccessToRehab?
                          <Row form>
                            <Label style={{marginLeft:"40px"}}>Do you need access to rehabilitation services?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="need-access-to-rehab" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="need-access-to-rehab" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>:""}
                          <Row form>
                            <Label>Do you have an assistive device (e.g wheelchair, crutches, prosthetic limbs, hearing aid)?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="access-to-assistive-device" type="radio" label="Yes" value="Yes" defaultChecked
                                    onChange={() => setHasAccessToAssistiveDevice(true)}/>
                                    <FieldCheck name="access-to-assistive-device" type="radio" label="No" value="No" className='ml-4 pl-2'
                                    onChange={() => setHasAccessToAssistiveDevice(false)}/>
                                </FormGroup>
                            </Col>
                          </Row>
                          {!hasAccessToAssistiveDevice?
                          <Row form>
                            <Label style={{marginLeft:"40px"}}>Is your assistive device working well?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="is-your-assistive-device-working" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="is-your-assistive-device-working" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>
                          :
                          <>
                          <Row form>
                            <Label style={{marginLeft:"40px"}}>Do you need an assistive device?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="need-access-to-assistive-device" type="radio" label="Yes" value="Yes" defaultChecked
                                    onChange={() => setNeedAccessToAssistiveDevice(true)}/>
                                    <FieldCheck name="need-access-to-assistive-device" type="radio" label="No" value="No" className='ml-4 pl-2'
                                    onChange={() => setNeedAccessToAssistiveDevice(false)}/>
                                </FormGroup>
                            </Col>
                          </Row>
                          {needAccessToAssistiveDevice?
                          <Row form>
                            <Col>
                              <FormGroup>
                                <FieldInput type="select" name="choose-device" label="What assistive device do you need?" required="Choose the device you need">
                                  <option selected hidden>Select a device</option>
                                  <option>Wheelchair</option>
                                  <option>Prosthetic</option>
                                  <option>Orthotic</option>
                                  <option>Crutch</option>
                                  <option>Walking Stick</option>
                                  <option>Hearing Aid</option>
                                  <option>Glasses</option>
                                  <option>Standing Frame</option>
                                  <option>Corner Seat</option>
                                </FieldInput>
                              </FormGroup>
                            </Col>
                          </Row>
                          :""}
                          </>
                          }
                          <Row form>
                            <Col>
                              <FormGroup>
                                <FieldInput type="select" name="health-service-rating" label="Are you satisfied with the health services you receive" required="Rate 1-4 your general health">
                                  <option selected hidden>Select a rating</option>
                                  <option>1-Very Poor</option>
                                  <option>2-Poor</option>
                                  <option>3-Fine</option>
                                  <option>4-Good</option>
                                </FieldInput>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Step>

                        {/* Education */}

                        {client.Age<18?
                        <Step name="Education">
                          <Row form>
                            <Label>Do you go to school?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="goes-to-school" type="radio" label="Yes" value="Yes" defaultChecked
                                    onChange={() => setGoesToSchool(true)}/>
                                    <FieldCheck name="goes-to-school" type="radio" label="No" value="No" className='ml-4 pl-2'
                                    onChange={() => setGoesToSchool(false)}/>
                                </FormGroup>
                            </Col>
                          </Row>
                          {goesToSchool?
                          <Row form>
                            <FieldInput name="grade" label="What Grade?" type="number" min="1" required="Grade is required"/>
                          </Row>
                          :
                          <>
                            <Row form>
                              <Col>
                              <FieldInput type="select" name="why-not-go-to-school" label="Why do you not go to school?">
                                <option selected hidden>Select an option</option>
                                <option>Lack of Funding</option>
                                <option>Disability Stops Me</option>
                                <option>Other</option>
                              </FieldInput>
                              </Col>
                            </Row>
                            <Row form>
                              <Label>Have you ever gone to school before?</Label>
                              <Col>
                                  <FormGroup>
                                      <FieldCheck name="has-gone-to-school" type="radio" label="Yes" value="Yes" defaultChecked/>
                                      <FieldCheck name="has-gone-to-school" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                  </FormGroup>
                              </Col>
                            </Row>
                          </>
                          }
                          <Row form>
                            <Label>Do you want to go to school?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="wants-to-go-to-school" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="wants-to-go-to-school" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>
                        </Step>
                        :""}   

                        {/*Social*/}
                    
                        <Step name="Social">
                        <Row form>
                            <Label>Do you feel valued as a member of your community?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="feels-valued" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="feels-valued" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Label>Do you feel independant?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="feels-independant" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="feels-independant" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Label>Are you able to participate in community/social events?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="participates-in-events" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="participates-in-events" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Label>Does your disability affect your ability to interact socially?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="affects-social-interaction" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="affects-social-interaction" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Label>Have you experienced discrimination because of your disability?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="experienced-discrimination" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="experienced-discrimination" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>
                        </Step>

                        {/* Livelihood */}
                        
                        {client.Age>16?
                        <Step name="Livelihood">
                          <Row form>
                            <Label>Are you working?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="working" type="radio" label="Yes" value="Yes" defaultChecked
                                    onChange={()=>{setWorking(true)}}/>
                                    <FieldCheck name="working" type="radio" label="No" value="No" className='ml-4 pl-2'
                                    onChange={()=>{setWorking(false)}}/>
                                </FormGroup>
                            </Col>
                          </Row>
                          {working?
                          <>
                            <Row form>
                              <Col>
                                <FieldInput name="job-title" label="What do you do?" type="text" required="Job title required"/> 
                              </Col>
                            </Row>
                            <Row form>
                              <Col>
                              <FieldInput type="select" name="employed" label="Are you employed or self-employed?">
                                <option selected hidden>Select an option</option>
                                <option>Employed</option>
                                <option>Self-Employed</option>
                              </FieldInput>
                              </Col>
                            </Row>
                          </>
                          :""}
                          <Row form>
                            <Label>Does this meet your financial needs?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="meet-financial-needs" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="meet-financial-needs" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Label>Does your ability affect your ability to go to work?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="affects-work" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="affects-work" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Label>Do you want to work?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="want-to-work" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="want-to-work" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>
                        </Step>
                        :""}

                          {/* Food and Nutrition */}

                        <Step name="Food and Nutrition">
                          <Row form>
                            <Col>
                              <FormGroup>
                                <FieldInput type="select" name="food-security" label="Food Security Rating" required="Rate 1-4 your food security">
                                  <option selected hidden>Select a rating</option>
                                  <option>1-Very Poor</option>
                                  <option>2-Poor</option>
                                  <option>3-Fine</option>
                                  <option>4-Good</option>
                                </FieldInput>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Label>Do you have enough food every month?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="enough-food" type="radio" label="Yes" value="Yes" defaultChecked/>
                                    <FieldCheck name="enough-food" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                                </FormGroup>
                            </Col>
                          </Row>
                          {client.Age<13?
                          <>
                          <Row form>
                            <Label>Is this child malnurished?</Label>
                            <Col>
                                <FormGroup>
                                    <FieldCheck name="malnourished" type="radio" label="Yes" value="Yes" defaultChecked
                                    onChange={()=>{setIsMalnourished(true)}}/>
                                    <FieldCheck name="malnourished" type="radio" label="No" value="No" className='ml-4 pl-2'
                                    onChange={()=>{setIsMalnourished(false)}}/>
                                </FormGroup>
                            </Col>
                          </Row>
                          {isMalnourished&&!hasReferral?
                          <Row form>
                            <Label>Referral is required</Label>
                          </Row>
                          :""}
                          </>
                        :""}
                      </Step>
                        
                      {/* Empowerment */}
                        
                      <Step name="Empowerment">
                        <Row form>
                          <Label>Are you a member of any organizations which assist people with disabilities?</Label>
                          <Col>
                              <FormGroup>
                                  <FieldCheck name="part-of-organizations" type="radio" label="Yes" value="Yes" defaultChecked
                                  onChange={()=>{setPartOfOrganizations(true)}}/>
                                  <FieldCheck name="part-of-organizations" type="radio" label="No" value="No" className='ml-4 pl-2'
                                  onChange={()=>{setPartOfOrganizations(false)}}/>
                              </FormGroup>
                          </Col>
                        </Row>
                        {partOfOrganizations?
                        <Row form>
                          <Col>
                            <FieldInput name="which-organizations" label="Which organizations?" type="text" required="Organizations required"/> 
                          </Col>
                        </Row>
                        :""}
                        <Row form>
                          <Label>Are you aware of your rights as a citizen living with disabilities?</Label>
                          <Col>
                              <FormGroup>
                                  <FieldCheck name="aware-of-rights" type="radio" label="Yes" value="Yes" defaultChecked/>
                                  <FieldCheck name="aware-of-rights" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                              </FormGroup>
                          </Col>
                        </Row>
                        <Row form>
                          <Label>Do you feel like you are able to influence people around you?</Label>
                          <Col>
                              <FormGroup>
                                  <FieldCheck name="have-influence" type="radio" label="Yes" value="Yes" defaultChecked/>
                                  <FieldCheck name="have-influence" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                              </FormGroup>
                          </Col>
                        </Row>
                      </Step>

                      {/* Shelter and Care */}

                      <Step name="Shelter and Care">
                        <Row form>
                          <Label>Do you have adequate shelter?</Label>
                          <Col>
                              <FormGroup>
                                  <FieldCheck name="adequate-shelter" type="radio" label="Yes" value="Yes" defaultChecked/>
                                  <FieldCheck name="adequate-shelter" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                              </FormGroup>
                          </Col>
                        </Row>
                        <Row form>
                          <Label>Do you have access to essential items for your household?</Label>
                          <Col>
                              <FormGroup>
                                  <FieldCheck name="essential-items" type="radio" label="Yes" value="Yes" defaultChecked/>
                                  <FieldCheck name="essential-items" type="radio" label="No" value="No" className='ml-4 pl-2'/>
                              </FormGroup>
                          </Col>
                        </Row>
                      </Step>
                    </MultiStepForm>
                </Container>
        </>
    )
}

export default NewSurvey;