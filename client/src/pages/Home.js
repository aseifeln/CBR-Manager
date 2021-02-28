import React from "react"
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardDeck } from 'reactstrap';
import { Link } from 'react-router-dom';
function Home(){
    const imgSize={
        display: "block",
        margin:"auto",
        marginTop:"5%",
        width: "40%"
    }
    const cardSize={
        maxWidth:"80%",
        color:"inherit",
        textDecoration:"inherit"
    }


    return(
        <Container>
            <Row className="mt-5">
                <Col>
                    <CardDeck className="d-flex justify-content-center">
                        <Card style={cardSize} color="primary" className="mr-2" tag={Link} to="/dashboard">
                            <CardImg top maxWidth="80%" src="/dashboard.png" style={imgSize}/>
                            <CardBody>
                                <CardTitle tag="h4">Dashboard</CardTitle>
                            </CardBody>
                        </Card>
                        <Card style={cardSize} color="success" className="mr-2" tag={Link} to="/client/new">
                            <CardImg top maxWidth="80%" src="/clientsignup.png" style={imgSize}/>
                            <CardBody>
                                <CardTitle tag="h4">New Client Signup</CardTitle>
                            </CardBody>
                        </Card>
                    </CardDeck>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <CardDeck className="d-flex justify-content-center">
                        <Card style={cardSize} color="info" className="mr-2">
                            <CardImg top maxWidth="80%" src="/newvisit.png" style={imgSize}/>
                            <CardBody>
                                <CardTitle tag="h4">New Visit</CardTitle>
                            </CardBody>
                        </Card>
                        <Card style={cardSize} color="warning" className="mr-2" tag={Link} to="/client-list">
                            <CardImg top maxWidth="80%" src="/clientlist.png" style={imgSize}/>
                            <CardBody>
                                    <CardTitle tag="h4">Client List</CardTitle>
                            </CardBody>
                        </Card>
                    </CardDeck>
                </Col>
            </Row>
        </Container>
    )
}

export default Home