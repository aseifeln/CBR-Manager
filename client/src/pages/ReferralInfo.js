import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Media, Button} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReferralInfo(props){

    const [referral, setReferral]= useState({});

    const formContainerSize={
        margin: 'auto',
        maxWidth: 800
    }

    useEffect(() => {
        document.title='Referral Info' 
        axios.get('/referrals/' + props.match.params.id)
        .then(response => {
            setReferral(response.data[0]);
        })
        .catch(error => {
            console.log(error);
            document.title = "Referral not found";
        })
      }, [])


    function ServiceHandler( props ){
        switch(props.service){
        case 'Physiotherapy' :
            return(
                <>
                <hr/>
                <Row>
                    <Col>
                        <h3 className='font-weight-bold' style={{fontSize: '22px'}}>Physiotherapy</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Media src={`data:image/jpeg;base64,${referral.PhysiotherapyService.Photo}`} object alt="Profile Image" className="rounded-circle rounded" style={{height: "200px", width: "200px"}}/>
                    </Col>
                    <Col>
                        <span className='font-weight-bold' style={{fontSize: '18px'}}>Conditions: </span>
                        {referral.PhysiotherapyService.ClientCondition.join(', ')}
                        <br/>
                        <span className='font-weight-bold' style={{fontSize: '18px'}}>Other Conditions: </span>
                        {referral.PhysiotherapyService.OtherClientCondition}
                    </Col>
                </Row>
                <hr/>
                </>
            )

        case 'Prosthetic':
            return(
                <>
                <hr/>
                <Row>
                    <Col>
                        <h3 className='font-weight-bold' style={{fontSize: '22px'}}>Prosthetic</h3>
                    </Col>
                </Row>
                <Row>
                {referral.ProstheticService.Photo!==""?
                    <Col>
                        <Media src={`data:image/jpeg;base64,${referral.ProstheticService.Photo}`} object alt="Profile Image" className="rounded-circle rounded" style={{height: "200px", width: "200px"}}/>
                    </Col>:null}
                    <Col>
                        <span className='font-weight-bold' style={{fontSize: '18px'}}>Injury Position: </span>
                        {referral.ProstheticService.InjuryPosition}
                    </Col>
                </Row>
                <hr/>
                </>
            )
        case 'Orthotic':
            return(
                <>
                <hr/>
                <Row>
                    <Col>
                        <h3 className='font-weight-bold' style={{fontSize: '22px'}}>Orthotic</h3>
                    </Col>
                </Row>
                <Row>
                {referral.OrthoticService.Photo!==""?
                    <Col>
                        <Media src={`data:image/jpeg;base64,${referral.OrthoticService.Photo}`} object alt="Profile Image" className="rounded-circle rounded" style={{height: "200px", width: "200px"}}/>
                    </Col>:null}
                    <Col>
                        <span className='font-weight-bold' style={{fontSize: '18px'}}>Injury Position: </span>
                        {referral.OrthoticService.InjuryPosition}
                    </Col>
                </Row>
                <hr/>
                </>
            )
        case 'Wheelchair':
            return(
            <>
            <hr/>
            <Row>
                <Col>
                    <h3 className='font-weight-bold' style={{fontSize: '22px'}}>Wheelchair</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                <Media src={`data:image/jpeg;base64,${referral.WheelchairService.Photo}`} object alt="Profile Image" className="rounded-circle rounded" style={{height: "200px", width: "200px"}}/>
                </Col>
                <Col>
                    <h3 className='font-weight-bold' style={{fontSize: '18px'}}>Details: </h3>
                    <ul class='list-unstyled'>
                        <li>- Basic/Intermediate User: {referral.WheelchairService.ClientProficiency}</li>
                        <li>- Hip Width (Inches): {referral.WheelchairService.ClientHipWidth}</li>
                        <li>- Existing Wheelchair: {referral.WheelchairService.WheelchairExist}</li>
                        {referral.WheelchairService.WheelchairExist==='Y'?
                            <li>- Existing Wheelchair: {referral.WheelchairService.WheelchairRepairable}</li>:null}
                    </ul>
                </Col>
            </Row>
            <hr/>
            </>
            )

        case 'Other':
            return(
            <>
            <hr/>
            <Row>
                <Col>
                    <h3 className='font-weight-bold' style={{fontSize: '22px'}}>Other</h3>
                </Col>
            </Row>
            <Row>
            {referral.OtherServices.Photo!==""?
                <Col>
                        <Media src={`data:image/jpeg;base64,${referral.OtherServices.Photo}`} object alt="Profile Image" className="rounded-circle rounded" style={{height: "200px", width: "200px"}}/>
                </Col>:null}
                <Col>
                    <span className='font-weight-bold' style={{fontSize: '18px'}}>Details: </span>
                    {referral.OtherServices}
                </Col>
            </Row>
            <hr/>
            </>
            )
        }
    }

    return(
        <Container>
            <div style={formContainerSize}>
                <Row>
                    <Button tag={Link} to={'/client/'+ referral.Client?.ClientId}>Back to Client</Button>
                </Row>
                <br/>
                <Row>
                    <h2 style={{alignText:'left',color:'#9646b7'}}>Client Referral</h2>
                </Row>
                <Row>
                    <Col>
                        Services: {referral.ServiceRequired && referral.ServiceRequired.join(', ')}
                    </Col>
                </Row>
                {referral.ServiceRequired && (referral.ServiceRequired.map((service)=>{
                    return(
                        <ServiceHandler service={service}/>
                )}))}
            </div>
        </Container>
    );
}

export default ReferralInfo