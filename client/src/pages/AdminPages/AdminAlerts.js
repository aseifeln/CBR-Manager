import React, { useState, useEffect, useContext } from "react";
import { Collapse,
Card,
CardBody,
CardHeader,
Container,
Button,
Form, FormGroup, FormFeedback, FormText,
Input, Label, Row, Col } from 'reactstrap';
import AdminSideBar from '../../components/AdminSideBar';
import CookieChecker from '../../components/CookieChecker';
import { FieldInput, FieldTypeahead } from "../../components/MultiStepForm";
import axios from 'axios';
import Modal from 'react-modal';
import { Formiz, useForm } from '@formiz/core';
import { UserContext } from '../../components/UserContext';

import AlertsList from '../../components/AlertList';

function AdminAlerts() {

    const [alertTitle, setAlertTitle] = useState("");
    const [alertBody, setAlertBody] = useState("");
    const [ workers, setWorkers ] = useState([]);

    const [ allAlerts, setAllAlerts ] = useState([]);
    const [ currUserAlerts, setCurrUserAlerts ] = useState([]);

    const [modelOpen, setModalOpen] = useState(false);
    const [alertAllWorkers, setAlertAllWorkers] = useState(true);

    const [alertTitleErr, setAlertTitleErr] = useState(false);
    const [alertBodyErr, setAlertBodyErr] = useState(false);

    const context = useContext(UserContext);

    useEffect(() => {
        axios.get('/workers')
            .then((response) => {
                const workerArr = [];
                // Reference: https://stackoverflow.com/a/57008713
                // FieldTypeahead options must be an array
                Object.keys(response.data).forEach(key => workerArr.push({value: response.data[key].WorkerId, label: response.data[key].FirstName + ' ' + response.data[key].LastName}));
                setWorkers(workerArr);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('/alerts')
            .then((response) => {
                setAllAlerts(response.data);
            })
            .catch((error) => {
                makeFakeAlerts();
                //console.log(error);
            })

        axios.get('/alerts/' + context.Username)
            .then((response) => {
                setCurrUserAlerts(response.data);
            })
            .catch((error) => {
                makeFakeAlerts2();
                //console.log(error);
            })
    }, []);

    function makeFakeAlerts() {
        setAllAlerts(
            [{
               "AlertId": 1,
               "Title":"Any txt",
               "Message":"Any txt",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[],
               "ForAllWorkers": true
               },{
               "AlertId": 1,
               "Title":"Any txt",
               "Message":"Any txt",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[],
               "ForAllWorkers": true
               },{
               "AlertId": 1,
               "Title":"Any txt",
               "Message":"Any txt",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[],
               "ForAllWorkers": true
               },{
               "AlertId": 1,
               "Title":"Any txt",
               "Message":"Any txt",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[],
               "ForAllWorkers": true
               },
            ]
        );

    }

    function makeFakeAlerts2() {
        setCurrUserAlerts(
            [{
               "AlertId": 1,
               "Title":"Any txt",
               "Message":"Any txt",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[],
               "ForAllWorkers": true
               },{
               "AlertId": 1,
               "Title":"Any txt",
               "Message":"Any txt",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[],
               "ForAllWorkers": true
               },{
               "AlertId": 1,
               "Title":"Any txt",
               "Message":"Any txt",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[],
               "ForAllWorkers": true
               },{
               "AlertId": 1,
               "Title":"Any txt",
               "Message":"Any txt",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[],
               "ForAllWorkers": true
               },
            ]
        );

    }

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    function cancelAlert() {
        var confirmCancel = window.confirm("Would you like to abort message?");
        if (confirmCancel) {
            closeModal();
        }
    }

    function sendAlert() {
        closeModal();

        //TODO: get data and actually send message with axios

        alert("alert sent");
    }

    function handleChange(event) {
        setAlertTitle(event.target.value)
    }

    let formState = useForm();
    // TODO: move to css
    const customStyles = {
        content : {
          position: 'relative',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)'
        }
      };

    return (
        <>
        <CookieChecker></CookieChecker>
        <AdminSideBar/>
        <Container>
            <div className="wooooooooooooooo">
            <h1>Alerts</h1>
            <Row>
                <Button onClick={openModal} style={{float: 'right'}}>Create message</Button>
            </Row>
            <Row>
                <Col>
                  <div className="myAlerts">
                    <h2>My Alerts</h2>
                    <AlertsList alerts={currUserAlerts}/>
                  </div>
                </Col>
                <Col>
                  <div className="allAlerts">
                    <h3>All Alerts</h3>
                    <AlertsList alerts={allAlerts}/>
                  </div>
                </Col>
            </Row>

            <Modal
             isOpen={modelOpen}
             onRequestClose={closeModal}
             style={customStyles}
             shouldCloseOnOverlayClick={false}>
                <Container>
                    <Formiz connect={formState} onValidSubmit={sendAlert}>
                        <form onSubmit={formState.submit}>
                            <h4>Compose message</h4>
                            <FieldInput label="Title" type="text" name="Title" placeholder="Title" required="Title is required"
                             defaultValue={""}/>
                            <FieldInput label="Message Body" type="textarea" name="AlertBody" placeholder="Enter message body here..."
                             defaultValue={""}/>
                             <FormGroup>
                                  <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                                    <Input type="checkbox" name="allWorkers" defaultChecked={true}
                                        onChange={() => setAlertAllWorkers(!alertAllWorkers)}/>
                                    Send to all workers
                                  </Label>
                                <Collapse isOpen={!alertAllWorkers}>
                                <Container>
                                    <FieldTypeahead
                                        name="worker"
                                        placeholder="Add worker"
                                        required="Worker is required"
                                        options={workers}
                                        multiple/>
                                </Container>
                                </Collapse>
                              </FormGroup>
                            <Button type="submit">Submit</Button>
                            <Button onClick={cancelAlert} style={{float: 'right'}}>Cancel</Button>
                        </form>
                    </Formiz>
                </Container>
            </Modal>
            </div>
        </Container>
        </>
    );

}

export default AdminAlerts;