import React, { useRef, useState } from 'react'
import { Form, Button, Card } from "react-bootstrap";
import { firestore, auth } from "../firebase";

function SignUp() {

    const [formData, setFormData] = useState({ email: "", password: "", passwordConfirmation: "" });

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(event.target);

        if (formData.password === formData.passwordConfirmation) {
            auth.createUserWithEmailAndPassword(formData.email, formData.password)
                .then(cred => console.log(cred))
                .then(() => console.log("Your account created successfully!"))
                .catch((err) => console.error("A problem occured while your accunt being created!", err));
        } else {
            console.log("Passwords are not the same.");
        }
    }

    function handleFormChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <>
            <Card style={{width: "30%"}} className="ml-3 m-auto m-3">
                <Card.Body>
                    <h2 className="text-center">Sign Up</h2>
                    <form onSubmit={handleFormSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email"
                                onChange={handleFormChange}
                                name="email"
                                required 
                            />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={handleFormChange}
                                name="password"
                                required 
                            />
                        </Form.Group>

                        <Form.Group id="password-confirm">
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
                Already have an account? Log In
            </div>
        </>
    )
}

export default SignUp
