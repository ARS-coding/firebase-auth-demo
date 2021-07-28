// react
import React, { useState } from 'react'

// bootstrap
import { Form, Button, Card, Container } from "react-bootstrap";

// firebase
import { auth } from "../firebase";

// router
import { Link, useHistory } from "react-router-dom";

// custom hooks
import { setDocument } from "../hooks/setUserDocument";
import { removeOneProp } from "../hooks/removeOneProp";

// action creator functions
// import { checkIfUserSignedIn } from "./Users/User/userSlice";

// react-redux
import { useSelector } from "react-redux";

function SignUp() {

    let userStatus = useSelector(state => state.user.status);

    const initialFormData = { username: "", email: "", password: "", passwordConfirmation: "" };
    const [formData, setFormData] = useState(initialFormData);
    let history = useHistory();

    function handleFormSubmit(event) {
        event.preventDefault();

        if (formData.password === formData.passwordConfirmation) {
            setDocument(formData.username, removeOneProp(formData, "passwordConfirmation")); // first argument is the name of the document that we are gonna set, second one is the object that we are gonna sign to that document

            auth.createUserWithEmailAndPassword(formData.email, formData.password) // all the auth logic lives in the 
            // .then(() => checkIfUserSignedIn())
            .then(() => console.log("user status:", userStatus))
            .then(cred => history.push(`/profile/${formData.username}`))
            .catch((error) => console.error("A problem occured while your account being created!", error));
        } else {
            console.log("Passwords are not the same.");
        }
        setFormData(initialFormData); // empty the form fields
    }

    function handleFormChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "80vh"}}>
            <Card style={{width: "30%"}} className="ml-3 m-auto m-3">
                <Card.Body>
                    <h2 className="text-center">Sign Up</h2>
                    <form onSubmit={handleFormSubmit}>
                        <Form.Group id="email" className="my-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text"
                                onChange={handleFormChange}
                                name="username"
                                value={formData.username}
                                required 
                            />
                        </Form.Group>

                        <Form.Group id="email" className="my-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email"
                                onChange={handleFormChange}
                                name="email"
                                value={formData.email}
                                required 
                            />
                        </Form.Group>

                        <Form.Group id="password" className="my-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={handleFormChange}
                                name="password"
                                value={formData.password}
                                required 
                            />
                        </Form.Group>

                        <Form.Group id="password-confirm" className="my-3">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control 
                                type="password"
                                onChange={handleFormChange}
                                name="passwordConfirmation"
                                value={formData.passwordConfirmation}
                                required 
                            />
                        </Form.Group>
                        <Button type="submit" className="w-100">Sign Up!</Button>
                    </form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Do you already have an account? <Link to="sign-in">Sign in!</Link>
            </div>
        </Container>
    )
}

export default SignUp
