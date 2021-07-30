// react
import React, { useEffect } from 'react';

// react-bootstrap
import { Container, Row } from "react-bootstrap";

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
        const listener = dispatch(fetchUpdatedUsers()); // add the listener to the server for future changes just for once
        dispatch(fetchUsers()); // fetch the current users on the firestore for once 
        return () => {
            listener() // remove the onSnapShot listener
        }
    }, [dispatch]);

    const usersArray = useSelector(state => state.users.usersArray); //  use this in the page that you are gonna show the registered users
    const usersStatus = useSelector(state => state.users.status); //  use this in the page that you are gonna show the registered users

    const styleObj = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "space-between",
        flexGrow: "0"
    }

    return (
        <Container fluid style={{minHeight: "90vh"}}>
            {usersStatus === "users/loading" ? <h1 className="text-center">"Users are loading..."</h1> : null} 
            {usersStatus === "users/updating" ? <h1 className="text-center">"Users are updating..."</h1> : null} 
            {usersStatus === "users/loaded" | usersStatus === "users/updated"  // if users are loaded or updated display the loaded or updated users
                ?
                <Row className="justify-content-center">
                    <h1 className="text-center">Here's all the users registered to this amazing web application!</h1>
                    <div className="test-div-container" style={styleObj}>
                        {usersArray.map(userObject => <UserCard key={uuidv4()} userObject={userObject} />)}
                    </div>
                </Row>
                :
                null
            }
        </Container>
    )
}

export default Users
