// react
import React from 'react'

// router
import { useParams } from "react-router-dom";

// firebase
import { auth } from "../firebase";

// bootstrap
import { Container, Row, Col } from "react-bootstrap";

function User({ match }) {

    const userName = useParams().username;

    return (
        <>
            <h1>Welcome, {userName}!</h1>
            <Container>
                <Row>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    )
}

export default User