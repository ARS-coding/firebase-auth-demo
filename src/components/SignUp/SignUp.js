// react
import React, { useState } from 'react'

// bootstrap
import { Form, Button, Card, Container } from "react-bootstrap";

// router
import { Link, useHistory } from "react-router-dom";

// firebase 
import { auth } from "../../firebase";

// cunstom hooks
import { removeOneProp } from "../../hooks/removeOneProp";
import { setUserDocument } from "../../hooks/setUserDocument";

function SignUp() {

    const initialFormData = { username: "", email: "", password: "", passwordConfirmation: "" };
    const [formData, setFormData] = useState(initialFormData);

    let history = useHistory();

    function handleFormSubmit(event) {
        event.preventDefault();

        if (formData.password === formData.passwordConfirmation) {
            
            const objWithoutPasswordConfigProp = removeOneProp(formData, "passwordConfirmation");
            auth.createUserWithEmailAndPassword(formData.email, formData.password) 
            .then(userCred => {
                setUserDocument(userCred.user.uid, { ...objWithoutPasswordConfigProp, uid: userCred.user.uid })
                return userCred;
            }) // set the document in firestore
            .then(userCred => history.push(`/profile/${userCred.user.uid}`)) // take the user to their profile
            .catch(error => console.error("A problem occured while your account being created!", error));
            setFormData(initialFormData);
        } else {
            console.log("Passwords are not the same.");
        }
    }

    function handleFormChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "90vh"}}>
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
