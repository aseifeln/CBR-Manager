/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Row, Col, Media, Card, Collapse, CardHeader, CardBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import NotFoundPage from '../404';
import CookieChecker from '../../components/CookieChecker';
import MapWithMarker from '../../components/MapWithMarker';
import moment from 'moment';

import BaselineSurvey from '../components/BaselineSurvey';

function ClientInfo(props) {

    const [ client, setClient ] = useState({});
    const [ visits, setVisits ] = useState([]);
    const [ referrals,setReferrals] = useState([]);
    const [ clientFound, setClientFound ] = useState(false);
    const [ clientId, setClientId ] = useState(props.match.params.id);
    
    const areaFontSize = {color:"white",fontSize: "20px", fontWeight: "bold"};
    const areaInfo = {fontSize: "18px", display: "inline", fontWeight: "bold"};
    const areaColor={backgroundColor:"#9646b7"};
    const areaColor2={backgroundColor:"#22a9ba"};

    useEffect(() => {
        const formatDate = (arr) => {
            arr.forEach((v) => {
                v['Date'] = moment(v['Date']).format('DD-MM-YYYY')
            })
        }

        // Send request to backend to retrieve client info data
        axios.get('/clients/' + props.match.params.id)
            .then(response => {
                setClient(response.data);
                setClientFound(true);
                document.title = "Client | " + response.data.FirstName + ' ' + response.data.LastName;
            })
            .catch(error => {
                console.log(error);
                document.title = "Client not found"
            })

        axios.get('/visits/client/' + props.match.params.id)
            .then(response => {
                formatDate(response.data);
                setVisits(response.data);
            })
            .catch(error => {
                console.log(error);
            })

        axios.get('/referrals/client/' + props.match.params.id)
            .then(response => {
                formatDate(response.data);
                setReferrals(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    function ClientAreaAccordion(props) {

        const { area, status, goal, desc, defaultState } = props;
        const [ toggle, setToggle ] = useState(defaultState);

        return (
            <Card>
                <CardHeader style={areaColor}>
                    <Row>
                        <Col><h2 style={areaFontSize}>{area}</h2></Col>
                        <Col>
                            <Button variant="primary" size="md" className="float-right" style={{backgroundColor:"#22a9ba"}} onClick={() => setToggle(!toggle)}>
                                {(toggle) ? "Hide" : "Expand"}
                            </Button>
                        </Col>
                    </Row>
                </CardHeader>
                <Collapse isOpen={toggle}>
                    <CardBody>
                        <DisplayStatus type={area}/>
                        <BaselineSurvey clientId={clientId} surveyType={area}></BaselineSurvey>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }

    function DisplayStatus(props) {
        let status, goal, desc;
        switch(props.type) {
            case 'Health':
              status=client.HealthStatus;
              goal=client.HealthGoal;
              desc=client.HealthDesc;
              break;
            case 'Social':
              status=client.SocialStatus;
              goal=client.SocialGoal;
              desc=client.SocialDesc;
              break;
            case 'Education':
              status=client.EducationStatus;
              goal=client.EducationGoal;
              desc=client.EducationDesc;
              break;
            default:
              return null;
        }

        return (
            <div>
                <Row>
                    <Col><h4>Current Status</h4></Col>
                </Row>
                <div>
                    <b>Risk Level:</b> <span style={
                    (status==="Critical Risk")?{color:"red"}:
                    (status==="High Risk")?{color:"orange"}:
                    (status==="Medium Risk")?{color:"blue"}:
                    {color:"green"}
                    }>{status} </span>
                </div>
                <div><b>Goal:</b> {goal}</div>
                <div><b>More Details:</b> {desc}</div><br/>
            </div>
        );
    }

    // TODO: May want to rename this
    // Functional component to provide links to related visits or referrals
    function ClientLinks(props) {

        const { title, mappings, type } = props;

        return (
            <Card>
                <CardHeader style={areaColor2}>
                    <h2 style={areaFontSize}>{title}</h2>
                </CardHeader>
                <CardBody>
                    &nbsp; Click on a date to view more info or edit: <br/>
                    <ul>
                        {(type === "Visits") ? (
                            <div>
                                {mappings.map(({VisitId, Date}) => (
                                    <li><Link to={`/visit/${VisitId}`}>{Date}</Link></li>
                                ))}
                            </div>
                        ) : (
                            <div>
                                {mappings.map(({ReferralId, Date, Status, Outcome}) => (
                                    <li><Link to={`/referral/${ReferralId}`}>Status: {Status || "N/A"} || Outcome: {Outcome || "N/A"} || Date: {Date}</Link></li>
                                ))}
                            </div>
                        )}
                    </ul>
                </CardBody>
            </Card>
        )
    } 

    {/* TODO: Will need to figure out a better way to tell users a client isn't found,
as right now will still render this component briefly even for existing clients*/}
    if (!clientFound)
    {
        return (
            <NotFoundPage/>
        )
    }
    
    return(
        <div>
            <CookieChecker></CookieChecker>
            <Container>
                <Row>
                    <Col>
                        <h1>Name: {client.FirstName + ' ' + client.LastName}</h1>
                    </Col>
                    <Col>
                        <Button tag={Link} to={"/client/" + props.match.params.id + "/edit/"} style={{float: 'right'}}>Edit Client </Button>
                    </Col>
                </Row>
            </Container>
            <Container>
            <Row>
                <Col>
                    <div className="text-center">
                        {/* Reference: https://stackoverflow.com/questions/42395034/how-to-display-binary-data-as-image-in-react */}
                        <Media src={`data:image/jpeg;base64,${client.Photo}`} object alt="Profile Image" className="rounded-circle rounded" style={{height: "200px", width: "200px"}}/>
                    </div>
                </Col>
                <Col>
                    <h3 className="font-weight-bold" style={{fontSize: "18px"}}>Personal Info:</h3>
                    <ul class="list-unstyled">
                        <li>- Location: {client.Location}</li>
                        <li>- Age: {client.Age}</li>
                        <li>- Gender: {client.Gender}</li>
                        <li>- Disability: {(client.DisabilityType || []).join(', ')}</li>
                    </ul>
                </Col>
                {(client.GPSLocation) ? (
                    <Col>
                        <Label className="font-weight-bold">GPS Location</Label>
                        <MapWithMarker
                            loadingElement={<div style={{ height: '75%' }} />}
                            containerElement={<div style={{ height: '250px', width: '300px' }} />}
                            mapElement={<div style={{ height: '90%' }} />}
                            location={JSON.parse(client.GPSLocation)}
                        />
                    </Col>
                ) : ("")}
            </Row>
            <Row>
                <Col align="center">
                    <Link to={"/visit/new/" + props.match.params.id}>
                        <Button variant="primary" size="md" style={{backgroundColor:"#46ad2f", float: 'right'}}>
                            New Visit
                        </Button>
                    </Link>
                </Col>
                <Col align="center">
                    <Link to={"/referral/new/" + props.match.params.id}>
                        <Button variant="primary" size="md" style={{backgroundColor:"#46ad2f", float: 'left'}}>
                            New Referral
                        </Button>
                    </Link>
                </Col>
            </Row>
            </Container>
            <br/>
            <Container>
                <ClientAreaAccordion area="Health" defaultState={true}/>
                <ClientAreaAccordion area="Social" defaultState={false}/>
                <ClientAreaAccordion area="Education" defaultState={false}/>
                <ClientAreaAccordion area="Livelihood" defaultState={false}/>
                <ClientAreaAccordion area="Food/Nutrition" defaultState={false}/>
                <ClientAreaAccordion area="Empowerment" defaultState={false}/>
                <ClientAreaAccordion area="Shelter/Care" defaultState={false}/>

                <ClientLinks title="All Visits" mappings={visits} type="Visits"/>
                <ClientLinks title="All Referrals" mappings={referrals} type="Referrals"/>
            </Container>
        </div>
    )
}

export default ClientInfo;
