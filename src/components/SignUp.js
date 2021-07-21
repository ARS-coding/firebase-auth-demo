import React, { useRef } from 'react'
import { Form, Button, Card } from "react-bootstrap";

function SignUp({ children }) {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    return (
        <>
            <Card style={{width: "30%"}} className="ml-3 m-auto m-3">
                <Card.Body>
                    <h2 className="text-center">Sign Up</h2>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>

                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="email" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button type="submit" className="w-100">Sign Up!</Button>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? Log In
            </div>
        </>
    )
}

export default SignUp
