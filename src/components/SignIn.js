// react
import React, { useState } from 'react'

// bootstrap
import { Form, Button, Card } from "react-bootstrap";

// router
import { auth } from "../firebase";

// firebase
import { Link } from "react-router-dom";

function SignIn() {

    auth.onAuthStateChanged(user => {
        user ? console.log("there's a user logged in!", user) : console.log("there's no user logged in!", user)
    })
    
    const initialFormData = { email: "", password: "" };
    const [formData, setFormData] = useState(initialFormData);

    function handleFormSubmit(event) {
        event.preventDefault();

        auth.signInWithEmailAndPassword(formData.email, formData.password)
        .then(cred => console.log(cred))
        .then(() => console.log("You have successfully signed in!"))
        .catch((error) => console.error("A problem occurred while logging in.", error))
        
        event.target.reset(); // empty the form fields
    }   // redirect people to their profile after submission


    function handleFormChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <>
            <Card style={{width: "30%"}} className="ml-3 m-auto m-3">
                <Card.Body>
                    <h2 className="text-center">Sign In</h2>
                    <form onSubmit={handleFormSubmit}>
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
                        <Button type="submit" className="w-100">Sign Up!</Button>
                    </form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't you have an account? <Link to="/sign-up">Sign up!</Link>
            </div>
        </>
    )
}

export default SignIn
