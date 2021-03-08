import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Media} from 'reactstrap';

function ReferralInfo(){

    const [referral, setReferral]= useState({});

    const formContainerSize={
        margin: 'auto',
        maxWidth: 800
    }

    useEffect(() => {
        document.title='Referral Info' 
        setReferral({
            Date: '2020-01-01',
            ServiceRequired:[
                'Physiotherapy',
                'Prosthetic',
                'Orthotic',
                'Wheelchair',
                'Other'
            ],
            OtherServices: 'No other services required',
            ReferTo: 'Centre Services',
            Status: 'Made',
            Outcome: 'Ongoing',
            ClientId: 1,
            WorkerId: "c345718b-2d63-48e8-8e30-a9dd195ef4bc",
            WheelchairService: {
                Photo: "",
                ClientProficiency: "Intermediate",
                ClientHipWidth: 33,
                WheelchairExist: "Y",
                WheelchairRepairable: "Y"
            },
            PhysiotherapyService: {
                Photo: "",
                ClientCondition: [
                    "Amputee",
                    "Polio"
                ],
                OtherClientCondition: ""
            },
            ProstheticService: {
                Photo: "",
                InjuryPosition: "Above knee"
            },
            OrthoticService: {
                Photo: "",
                InjuryPosition: "Above elbow"
            }
        });
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
                        <Media>{/*TODO*/}</Media>
                    </Col>
                    <Col>
                        <span className='font-weight-bold' style={{fontSize: '18px'}}>Conditions: </span>
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
                    <Col>
                        <span className='font-weight-bold' style={{fontSize: '18px'}}>Injury Position: {/*TODO*/}</span>
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
                    <Media>{/*TODO*/}</Media>
                </Col>
                <Col>
                    <h3 className='font-weight-bold' style={{fontSize: '18px'}}>Details: {/*TODO*/}</h3>
                    <ul class='list-unstyled'>
                        <li>- Basic/Intermediate User: {/*TODO*/}</li>
                        <li>- Hip Width (Inches): {/*TODO*/}</li>
                        <li>- Existing Wheelchair: {/*TODO*/}</li>
                        {/* TODO: If yes to existing wheel chair, display more fields*/}
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
                <Col>Description: {/*TODO */}</Col>
            </Row>
            <hr/>
            </>
            )
        }
    }

    return(
        <Container>
            <div style={formContainerSize}>
                <h2 style={{alignText:'left',color:'#9646b7'}}>Client Referral</h2>
                <Row>
                    <Col>
                        Services: {/* TODO */}
                    </Col>
                </Row>
                {referral.ServiceRequired && (referral.ServiceRequired.map((service)=>{
                    return(
                        <ServiceHandler service={service}/>
                    )}))}
                <Row>
                    <Col>
                        <h3 className='font-weight-bold' style={{fontSize: '22px'}}>Refer To: {/*TODO*/}</h3>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default ReferralInfo