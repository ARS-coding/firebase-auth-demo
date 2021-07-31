// react
import React, { useState } from 'react'

// bootstrap
// import { Form, Button, Card, Container } from "react-bootstrap";
import { Container } from "react-bootstrap";

// router
import { Link, useHistory } from "react-router-dom";

// react-redux
import { useSelector } from "react-redux";

// firebase
import { auth } from "../firebase";

// formik
import { Formik, Form, Field, ErrorMessage } from "formik";

function SignIn() {

    let history = useHistory();
    const isSignedIn = useSelector(state => state.user.isSignedIn);

    const initialFormData = { email: "", password: "" };
    // const [formData, setFormData] = useState(initialFormData);

    // function handleFormSubmit(event) {
    //     event.preventDefault();
    //     if(!isSignedIn) {
    //         auth.signInWithEmailAndPassword(formData.email, formData.password)
    //         .then(cred => history.push(`/profile/${cred.user.uid}`))
    //         .catch(error => console.error("A problem occurred while logging in.", error))
    //     }
    //     else {
    //         console.log("You are already signed in!");
    //     }
    // }

    // function handleFormChange(event) {
    //     setFormData({ ...formData, [event.target.name]: event.target.value });
    // }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "90vh"}}>
            <Formik
                initialValues={initialFormData}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = "Email is required.";
                    } 
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                       errors.email = "Email address is invalid.";
                    }
                    if (!values.password) {
                        errors.password = "Password is required.";
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    if (!isSignedIn) {
                        auth.signInWithEmailAndPassword(values.email, values.password)
                        .then(cred => history.push(`/profile/${cred.user.uid}`))
                        .then(() => setSubmitting(false))
                        .catch(error => console.error("A problem occurred while logging in.", error))
                    }
                    else if(isSignedIn) {
                        setSubmitting(false)
                        console.log("You are already signed in!");
                    }
                }}
            >
                {({ isSubmitting }) => {
                    return (
                        <Form>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                            
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                            
                            <button type="submit" disabled={isSubmitting}>Submit</button>
                        </Form>
                    )
                }}
            </Formik>
            {/* <Card style={{width: "30%"}} className="ml-3 m-auto m-3">
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
            </Card> */}
            <div className="w-100 text-center mt-2">
                Don't you have an account? <Link to="/sign-up">Sign up!</Link>
            </div>
        </Container>
    )
}

export default SignIn
