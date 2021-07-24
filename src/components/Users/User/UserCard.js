// react
import React from 'react'

// react-bootstrap
import { Col } from "react-bootstrap";

// styles
import "./UserCard.css";

function UserCard({ userObject }) {
    return (
        <Col className="user-card text-center m-1 p-3 rounded" sm={6} md={4}>
            <span className="clip-path"></span>
            <span className="position-relative">{`Username: ${userObject.username}`}</span>
            <span className="position-relative">{`Email: ${userObject.email}`}</span>
        </Col>
    )
}

export default UserCard
