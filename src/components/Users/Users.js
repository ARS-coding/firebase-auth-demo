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

// uuid
import { v4 as uuidv4 } from "uuid";

function Users() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUpdatedUsers()); // add the listener to the server for future changes just for once
        dispatch(fetchUsers()); // fetch the current users on the firestore for once 
    }, [dispatch]);

    const usersArray = useSelector(state => state.users.usersArray); //  use this in the page that you are gonna show the registered users
    const usersStatus = useSelector(state => state.users.status); //  use this in the page that you are gonna show the registered users

    return (
        <Container className="users-container">
            {usersStatus === "users/loading" && <h1>"Users are loading..."</h1>} 
            {usersStatus === "users/updating" && <h1>"Users are updating..."</h1>} 
            {usersStatus === "users/loaded" | usersStatus === "users/updated" && // if users are loaded or updated display the loaded or updated users
                <Row className="justify-content-center">
                    <h1 className="text-center">Here's all the users registered to this amazing web application!</h1>
                    {usersArray.map(userObject => <UserCard key={uuidv4()} userObject={userObject} />)}
                </Row>
            }
        </Container>
    )
}

export default Users
