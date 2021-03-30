import React, { useContext, useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container, Media, Table, Button, Modal, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import classnames from 'classnames';
import CookieChecker from '../../components/CookieChecker';
import AdminSideBar from '../../components/AdminSideBar';
import NotFoundPage from '../404';
import {Link} from 'react-router-dom';
import '../../css/WorkerInfo.css'
import axios from 'axios';
import { UserContext } from '../../components/UserContext';

function WorkerInfo(props){

    const context = useContext(UserContext);

    const [activeTab, setActiveTab] = useState('1');
    const [activeSubTab, setActiveSubTab] = useState('1');
    const [worker, setWorker] = useState({});
    const [visits, setVisits] = useState([]);
    const [referrals, setReferrals] = useState([]);
    const [workerFound, setWorkerFound] = useState(false);
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setNewPassword("");
        setConfirmPassword("");
        setPasswordMatch(true);
    }

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const toggleSubTab = subTab => {
        if(activeSubTab !== subTab) setActiveSubTab(subTab);
    }

    function changeUserPassword(event) {
        event.preventDefault();
        if (newPassword !== confirmPassword)
        {
            setPasswordMatch(false);
            return;
        }
        else
            setPasswordMatch(true);
        
        let request = {};

        request['Username'] = username;
        request['New_Password'] = newPassword;
        request['Role'] = context.Role;
        
        axios.put('/users/changepw', request)
            .then((response) => {
                alert("Password changed");
                closeModal()
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 409)
                    alert("New password must be different from current password");
                else
                    alert("Something went wrong");
            })
    }

    useEffect(() => {
        axios.get('/users/worker/' + props.match.params.id)
            .then((response) => {
                setWorker(response.data[0].Worker);
                setWorkerFound(true);
                setUsername(response.data[0].Username);
                document.title = "CBR Worker | " + response.data[0].Worker.FirstName + " " + response.data[0].Worker.LastName;
            })
            .catch((error) => {
                console.log(error);
            })
        
        axios.get('/workers/' + props.match.params.id + '/visits')
            .then((response) => {
                setVisits(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('/workers/' + props.match.params.id + '/referrals')
            .then((response) => {
                setReferrals(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        
    }, []);

    if (!workerFound) {
        return (
            <NotFoundPage/>
        )
    }

    return (
        <div>
          <CookieChecker/>
          <AdminSideBar/>
          <Container>
              <div className="main-content">
                <Row style={{float: 'right'}}>
                    <Button onClick={openModal}>Change Password</Button>
                    <Modal
                     isOpen={modalOpen}
                     onRequestClose={closeModal}>
                        <h4>Change password</h4>
                        <Container>
                            <form onSubmit={changeUserPassword}>
                                <FormGroup>
                                    <Label>New Password</Label>
                                    <Input
                                     required="Enter a password"
                                     type="password"
                                     id="newPassword"
                                     value={newPassword}
                                     onChange={(event) => setNewPassword(event.target.value)}
                                     placeholder="New Password"
                                     minLength="6"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Confirm Password</Label>
                                    <Input
                                     invalid={!passwordMatch}
                                     required="Re-enter new password"
                                     type="password"
                                     id="confirmPassword"
                                     value={confirmPassword}
                                     onChange={(event) => setConfirmPassword(event.target.value)}
                                     placeholder="Confirm Password"
                                     minLength="6"
                                    />
                                    <FormFeedback>Passwords must match</FormFeedback>
                                </FormGroup>
                                <Button type="submit" onClick={changeUserPassword}>Submit</Button>
                                <Button onClick={closeModal} style={{float: 'right'}}>Close</Button>
                            </form>
                            <br/>
                        </Container>
                    </Modal>
                </Row>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Media src={`data:image/jpeg;base64,${worker.Photo}`} alt="Profile photo" height="200px" width="200px" style={{borderRadius: "50%"}}/>
                    </Col>
                    <Col xs="auto">
                        <Row><h2>{worker.FirstName + ' ' + worker.LastName}</h2></Row>
                        <Row><h5><b>Location:</b> {worker.Location}</h5></Row>
                    </Col>
                </Row>
                <hr/>
                {/* TODO: Replace stock data with actual data */}
                <Row className="summary-stats">
                    <Col xs="2"></Col>
                    <Col xs="4" className="visit-count">
                        <h5>Visits made in the past week<br/><br/>10</h5>
                    </Col>
                    <Col xs="4" className="referral-count">
                        <h5>Referrals made in the past week<br/><br/>10</h5>
                    </Col>
                </Row>
                <Nav tabs>
                    <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' }, 'tab-link')}
                        onClick={() => { toggle('1'); }}
                    >
                        Visits
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' }, 'tab-link')}
                        onClick={() => { toggle('2'); }}
                    >
                        Referrals
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' }, 'tab-link')}
                        onClick={() => { toggle('3'); }}
                    >
                        Stats
                    </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane className="tab-content" tabId="1">
                    <Table>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {visits.map(({VisitId, Date, Client}) => (
                            <tr>
                                <td>{Client?.FirstName + ' ' + Client?.LastName}</td>
                                <td>{Date}</td>
                                <td><Link to={"/visit/" + VisitId}><Button color="success" style={{float: 'right'}}>View</Button></Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </TabPane>
                    <TabPane className="tab-content" tabId="2">
                        <Nav tabs>
                            <NavItem>
                            <NavLink
                                className={classnames({ active: activeSubTab === '1' }, 'tab-link')}
                                onClick={() => { toggleSubTab('1'); }}
                            >
                                All
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink
                                className={classnames({ active: activeSubTab === '2' }, 'tab-link')}
                                onClick={() => { toggleSubTab('2'); }}
                            >
                                Made
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink
                                className={classnames({ active: activeSubTab === '3' }, 'tab-link')}
                                onClick={() => { toggleSubTab('3'); }}
                            >
                                Resolved
                            </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeSubTab}>
                            <TabPane className="tab-content" tabId="1">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Date</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {referrals.map(({ReferralId, Date, Client}) => (
                                        <tr>
                                            <td>{Client?.FirstName + ' ' + Client?.LastName}</td>
                                            <td>{Date}</td>
                                            <td><Link to={"/referral/" + ReferralId}><Button color="success" style={{float: 'right'}}>View</Button></Link></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </TabPane>
                            <TabPane className="tab-content" tabId="2">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Date</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {referrals.map(({ReferralId, Date, Client, Status}) => (
                                        (Status === 'Made') ? (
                                            <tr>
                                                <td>{Client?.FirstName + ' ' + Client?.LastName}</td>
                                                <td>{Date}</td>
                                                <td><Link to={"/referral/" + ReferralId}><Button color="success" style={{float: 'right'}}>View</Button></Link></td>
                                            </tr>
                                        ) : ("")
                                    ))}
                                    </tbody>
                                </Table>
                            </TabPane>
                            <TabPane className="tab-content" tabId="3">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Date</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {referrals.map(({ReferralId, Date, Client, Status}) => (
                                        (Status === 'Resolved') ? (
                                            <tr>
                                                <td>{Client?.FirstName + ' ' + Client?.LastName}</td>
                                                <td>{Date}</td>
                                                <td><Link to={"/referral/" + ReferralId}><Button color="success" style={{float: 'right'}}>View</Button></Link></td>
                                            </tr>
                                        ) : ("")
                                    ))}
                                    </tbody>
                                </Table>
                            </TabPane>
                        </TabContent>
                    </TabPane>
                    <TabPane className="tab-content" tabId="3">
                    <Row>
                        <Col sm="12">
                        <h4>Insert some charts and stats here</h4>
                        </Col>
                    </Row>
                    </TabPane>
                </TabContent>
            </div>
          </Container>
        </div>
      );
    }

export default WorkerInfo
