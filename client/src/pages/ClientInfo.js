/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Row, Col, Media, Card, Collapse, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import NotFoundPage from './404';
import CookieChecker from '../components/CookieChecker';

function ClientInfo(props) {

    const [ client, setClient ] = useState({});
    const [ visits, setVisits ] = useState([]);
    const [ referrals,setReferrals] = useState([]);
    const [ clientFound, setClientFound ] = useState(false);

    const [showHealthInfo, setShowHealthInfo] = useState(true);
    const [showEmpowermentInfo, setShowEmpowermentInfo] = useState(false);
    const [showEducationInfo, setShowEducationInfo] = useState(false);
    const [showFoodNutritionInfo, setShowFoodNutritionInfo] = useState(false);
    const [showLivelihoodInfo, setShowLivelihoodInfo] = useState(false);
    const [showShelterCareInfo, setShowShelterCareInfo] = useState(false);
    const [showSocialInfo, setShowSocialInfo] = useState(false);
    
    const areaFontSize = {color:"white",fontSize: "20px", fontWeight: "bold"};
    const areaInfo = {fontSize: "18px", display: "inline", fontWeight: "bold"};
    const areaColor={backgroundColor:"#9646b7"};
    const areaColor2={backgroundColor:"#22a9ba"};

    useEffect(() => {
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
                setVisits(response.data);
            })
            .catch(error => {
                console.log(error);
            })

        axios.get('/referrals/client/' + props.match.params.id)
            .then(response => {
                setReferrals(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    function ClientAreaAccordian(props) {

        const { Area, Status, Goal, Desc, DefaultState } = props;
        const [ toggle, setToggle ] = useState(DefaultState);

        return (
            <Card>
                <CardHeader style={areaColor}>
                    <Row>
                        <Col><h2 style={areaFontSize}>{Area}</h2></Col>
                        <Col>
                            <Button variant="primary" size="md" className="float-right" style={{backgroundColor:"#22a9ba"}} onClick={() => setToggle(!toggle)}>
                                {(toggle) ? "Hide" : "Expand"}
                            </Button>
                        </Col>
                    </Row>
                </CardHeader>
                <Collapse isOpen={toggle}>
                    <CardBody>
                        <div style={areaInfo}>Risk Level:</div> {Status}<br/>
                        <div style={areaInfo}>Goal:</div> {Goal}<br/>
                        <div style={areaInfo}>More Details:</div> {Desc}<br/>
                    </CardBody>
                </Collapse>
            </Card>
        )
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
                                {mappings.map(({ReferralId, Date,Status,Outcome}) => (
                                    <li><Link to={`/referral/${ReferralId}`}>Status: {(Status!="")?Status:"N/A"} || Outcome: {(Outcome!="")?Outcome:"N/A"} || Date: {Date}</Link></li>
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
                <ClientAreaAccordian Area="Health" Status={client.HealthStatus} Goal={client.HealthGoal} Desc={client.HealthDesc} DefaultState={true}/>
                <ClientAreaAccordian Area="Social" Status={client.SocialStatus} Goal={client.SocialGoal} Desc={client.SocialDesc} DefaultState={false}/>
                <ClientAreaAccordian Area="Health" Status={client.EducationStatus} Goal={client.EducationGoal} Desc={client.EducationDesc} DefaultState={false}/>
                {/* The remaining areas are for display purposes only and will be added later */}
                <ClientAreaAccordian Area="Food / Nutrition" DefaultState={false}/>
                <ClientAreaAccordian Area="Shelter / Care" DefaultState={false}/>
                <ClientAreaAccordian Area="Food / Nutrition" DefaultState={false}/>
                <ClientAreaAccordian Area="Livelihood" DefaultState={false}/>
                <ClientAreaAccordian Area="Empowerment" DefaultState={false}/>

                <ClientLinks title="All Visits" mappings={visits} type="Visits"/>
                <ClientLinks title="All Referrals" mappings={referrals} type="Referrals"/>
            </Container>
        </div>
    )
}

export default ClientInfo;