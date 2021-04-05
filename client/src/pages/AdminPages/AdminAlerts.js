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

    const [ workers, setWorkers ] = useState([]);

    const [ allAlerts, setAllAlerts ] = useState([]);
    const [ currUserAlerts, setCurrUserAlerts ] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [alertAllWorkers, setAlertAllWorkers] = useState(true);

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
               "Title":"Title of alert",
               "Message":"Message body",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[],
               "ForAllWorkers": true
               },{
               "AlertId": 2,
               "Title":"Title of alert",
               "Message":"Message body",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[],
               "ForAllWorkers": true
               },{
               "AlertId": 3,
               "Title":"Title of alert",
               "Message":"Message body",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[1, 2, 3, 4, 5],
               "ForAllWorkers": false
               },{
               "AlertId": 4,
               "Title":"Title of alert",
               "Message":"Message body",
               "Date":"01-01-2021",
               "AuthorUsername":"admin",
               "SpecificWorkers":[],
               "ForAllWorkers": true
               },
            ]
        );

    }

    function makeFakeAlerts2() {
        setCurrUserAlerts([{
         "AlertId": 1,
         "Title":"Title of alert",
         "Message":"Message body",
         "Date":"01-01-2021",
         "AuthorUsername":"admin",
         "SpecificWorkers":[],
         "ForAllWorkers": true
         },{
         "AlertId": 2,
         "Title":"Title of alert",
         "Message":"Message body",
         "Date":"01-01-2021",
         "AuthorUsername":"admin",
         "SpecificWorkers":[1, 2],
         "ForAllWorkers": false
         }]);

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

    function sendAlert(data) {
        const sendData = formatData(data);
        console.log("DATA IS HERE:",sendData);

        axios.put('/alerts/add', sendData)
        .then(response => {
            closeModal();
            alert("alert sent");
            window.location.reload()
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong when trying to send alert");
        });
    }

    function formatData(data) {
        let specificWorkersArr = [];
        if (data.SpecificWorkers) {
            specificWorkersArr = data.SpecificWorkers.map(function (worker) {
                return worker.value;
            });
        }

        return ({
            'Title': data.Title,
            'Message': data.Message,
            'AuthorUsername': context.Username,
            'SpecificWorkers': specificWorkersArr,
            'ForAllWorkers': alertAllWorkers
        });
    }

    let formState = useForm();
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
        <CookieChecker/>
        <div className="main-content">
            <AdminSideBar/>
            <div className='admin-container'>
                <h1>Alerts</h1>
                <Row>
                    <Button onClick={openModal}>Create message</Button>
                </Row>
                <Row>
                    <Col>
                      <div>
                        <h3>My Alerts</h3>
                        <AlertsList alerts={currUserAlerts}/>
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <h3>All Alerts</h3>
                        <AlertsList alerts={allAlerts}/>
                      </div>
                    </Col>
                </Row>

                <Modal
                 isOpen={modalOpen}
                 onRequestClose={closeModal}
                 style={customStyles}
                 shouldCloseOnOverlayClick={false}>
                    <Container>
                        <Formiz connect={formState} onValidSubmit={sendAlert}>
                            <form onSubmit={formState.submit}>
                                <h4>Compose message</h4>
                                <FieldInput label="Title" type="text" name="Title" placeholder="Title" required="Title is required"/>
                                <FieldInput label="Message Body" type="textarea" name="Message" placeholder="Enter message body here..."/>
                                 <FormGroup>
                                      <Label check style={{paddingLeft: "21px", paddingRight: "20px"}}>
                                        <Input type="checkbox" name="ForAllWorkers" defaultChecked={alertAllWorkers}
                                            onChange={() => setAlertAllWorkers(!alertAllWorkers)}/>
                                        Send to all workers
                                      </Label>
                                    <Collapse isOpen={!alertAllWorkers}>
                                    <Container>
                                          {(!alertAllWorkers) ? (
                                              <FieldTypeahead
                                                  id="worker"
                                                  name="SpecificWorkers"
                                                  placeholder="Add worker"
                                                  required="Worker is required"
                                                  options={workers}
                                                  multiple/>
                                          ) : ''}
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
        </div>
        </>
    );

}

export default AdminAlerts;