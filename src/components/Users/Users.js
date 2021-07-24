// react
import React, { useEffect } from 'react';

// react-bootstrap
import { Container, Row } from "react-bootstrap";

// styles
import "./Users.css";

// react-redux
import { useSelector, useDispatch } from "react-redux";

// components 
import UserCard from "./User/UserCard";

// action creator functions
import { fetchUsers, fetchUpdatedUsers } from "./usersSlice";

function Users() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUpdatedUsers()); // add the listener to the server for future changes just for once
        dispatch(fetchUsers()); // fetch the current users on the firestore for once 
    }, [dispatch]);

    const usersArray = useSelector(state => state.users.usersArray); //  use this in the page that you are gonna show the registered users

    return (
        <Container className="users-container">
            <Row className="justify-content-center">
                <h1 className="text-center">Here's all the users registered to this amazing web application!</h1>
                {usersArray.map(userObject => <UserCard userObject={userObject} />)}
            </Row>
        </Container>
    )
}

export default Users
