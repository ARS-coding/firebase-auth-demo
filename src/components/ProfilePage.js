// react
import React from 'react'

// router
import { useParams } from "react-router-dom";

// bootstrap
import { Container, Row, Col } from "react-bootstrap";

function ProfilePage() {

    // const hey = useParams() // use this to build paths on top of the /profile/:username such as /profile/:username/friends/:friendname 

    const uid = useParams().uid;
    
    return (
        <Container className="justify-content-start align-items-center container-after-the-navbar" style={{minHeight: "90vh"}}>
            <h1>Welcome, {uid}!</h1>
            <Container>
                <Row>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </Container>
    )
}

export default ProfilePage