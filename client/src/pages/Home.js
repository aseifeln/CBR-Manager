import React from "react"
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardDeck } from 'reactstrap';

function Home(){
    const imgSize={
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "40%"
    }
    const cardSize={
        maxWidth:"80%"
    }

    return(
        <Container>
            <Row>
                <Col>
                    <CardDeck className="d-flex justify-content-center">
                        <Card style={cardSize} color="primary">
                            <CardImg top maxWidth="80%" src="/dashboard.png" style={imgSize}/>
                            <CardBody>
                                <CardTitle tag="h2">Dashboard</CardTitle>
                            </CardBody>
                        </Card>
                    </CardDeck> 
                </Col>
                <Col>
                    <CardDeck className="d-flex justify-content-center">
                        <Card style={cardSize} color="primary">
                                <CardImg top maxWidth="80%" src="/dashboard.png" style={imgSize}/>
                                <CardBody>
                                    <CardTitle tag="h2">Dashboard</CardTitle>
                                </CardBody>
                            </Card>
                    </CardDeck>
                </Col>
            </Row>
        </Container>
    )
}

export default Home