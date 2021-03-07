import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Media, Card, Collapse, CardHeader, CardBody } from 'reactstrap';

function ReferralInfo(){

    const [data, setData]= useState(['']);

    const formContainerSize={
        margin: 'auto',
        maxWidth: 600
    }

    useEffect(() => {
        document.title="Referral Info"
      }, [])


    function disabilityHandler( disability ){
        switch(disability){
        case 'Physiotherapy' :
            return(
                <Row>
                    <Col>
                        <Media>{/*TODO*/}</Media>
                    </Col>
                    <Col>
                        <h3 className="font-weight-bold" style={{fontSize: "18px"}}>Condition: {/*TODO*/}</h3>
                    </Col>
                </Row>
            )

        case 'Prosthetic':
            return(
                <Row>
                    <Col>
                        <h3 className="font-weight-bold" style={{fontSize: "18px"}}>Above/Below Knee: {/*TODO*/}</h3>
                    </Col>
                </Row>
            )
        case 'Orthotic':
            return(
                <Row>
                    <h3 className="font-weight-bold" style={{fontSize: "18px"}}>Above/Below Elbow: {/*TODO*/}</h3>
                </Row>
            )
        case 'Wheelchair':
            return(
                <Row>
                    <Col>
                        <Media>{/*TODO*/}</Media>
                    </Col>
                    <Col>
                        <h3 className="font-weight-bold" style={{fontSize: "18px"}}>Details: {/*TODO*/}</h3>
                        <ul class="list-unstyled">
                            <li>- Basic/Intermediate User: {/*TODO*/}</li>
                            <li>- Hip Width (Inches): {/*TODO*/}</li>
                            <li>- Existing Wheelchair: {/*TODO*/}</li>
                            {/* TODO: If yes to existing wheel chair, display more fields*/}
                        </ul>
                    </Col>
                </Row>
            )

        case 'Other':
            return(
                <Row>
                    <Col>Description: {/*TODO */}</Col>
                </Row>
            )
        }
    }

    return(
        <Container>
            <div style={formContainerSize}>
            <h2 style={{alignText:"left",color:"#9646b7"}}>Client Referral</h2>
            <Row>
                <Col>
                    Disability Type: {/* TODO */}
                </Col>
            </Row>
            <hr/>
            {disabilityHandler(/* TODO */)}
            <hr/>
            <Row>
                <Col>
                    <h3 className="font-weight-bold" style={{fontSize: "18px"}}>Refer To: {/*TODO*/}</h3>
                </Col>
            </Row>
            </div>
        </Container>
    );
}

export default ReferralInfo