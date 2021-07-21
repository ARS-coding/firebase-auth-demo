import React, { useState } from 'react'
import { Form, Button, Card } from "react-bootstrap";
import { auth } from "../firebase";
import { Redirect, Link } from "react-router-dom";

function SignUp() {
    
    const initialFormData = { email: "", password: "", passwordConfirmation: "" };
    const [formData, setFormData] = useState(initialFormData);

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(event.target);

        if (formData.password === formData.passwordConfirmation) {
            auth.createUserWithEmailAndPassword(formData.email, formData.password)
                .then(cred => console.log(cred))
                .then(() => console.log("Your account created successfully!"))
                .catch((error) => console.error("A problem occured while your accunt being created!", error));
        } else {
            console.log("Passwords are not the same.");
        }
        event.target.reset(); // empty the form fields
    }   // submit people to their profile after submission

    function handleFormChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <>
            <Card style={{width: "30%"}} className="ml-3 m-auto m-3">
                <Card.Body>
                    <h2 className="text-center">Sign Up</h2>
                    <form onSubmit={handleFormSubmit}>
                        <Form.Group id="email" className="my-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email"
                                onChange={handleFormChange}
                                name="email"
                                required 
                            />
                        </Form.Group>

                        <Form.Group id="password" className="my-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={handleFormChange}
                                name="password"
                                required 
                            />
                        </Form.Group>

                        <Form.Group id="password-confirm" className="my-3">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control 
                                type="password"
                                onChange={handleFormChange}
                                name="passwordConfirmation"
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
        </>
    )
}

export default SignUp