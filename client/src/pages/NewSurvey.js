import React, { useState, useEffect, useContext } from 'react';
import { Container, FormGroup, Col, Row, Label, Input, Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import { MultiStepForm, Step, FieldInput, FieldTypeahead } from "../components/MultiStepForm";
import { useHistory } from "react-router-dom";
import CookieChecker from '../components/CookieChecker';
import axios from 'axios';
import NotFoundPage from './404';
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
                            <Row form>
                                
                            </Row>
                        </Step>
                    </MultiStepForm>
                </Container>
        </>
    )
}

export default NewSurvey;