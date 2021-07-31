// react
import React from 'react'

// bootstrap
import { Container } from "react-bootstrap";

// router
import { Link, useHistory } from "react-router-dom";

// react-redux
import { useSelector } from "react-redux";

// firebase
import { auth } from "../../firebase";

// formik
import { Formik, Form, Field, ErrorMessage } from "formik";

// styles 
import "./SignIn.css"

function SignIn() {

    let history = useHistory();
    const isSignedIn = useSelector(state => state.user.isSignedIn);

    const initialFormData = { email: "", password: "" };

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
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    resetForm();
                    if (!isSignedIn) {
                        auth.signInWithEmailAndPassword(values.email, values.password)
                        .then(cred => history.push(`/profile/${cred.user.uid}`))
                        .catch(error => console.error("A problem occurred while logging in.", error))
                        setSubmitting(false);
                    }
                    else if(isSignedIn) {
                        setSubmitting(false);
                        console.log("You are already signed in!");
                    }
                }}
            >
                {({ isSubmitting }) => {
                    return (
                        <Form className="sign-in-form">
                            <h2 style={{textAlign: "center"}}>Sign In!</h2>
                            <div class="mb-3">
                                <label for="email" className="form-label">Email:</label>
                                <Field 
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    className="form-control"
                                    placeHolder="Your email..."
                                />
                                <ErrorMessage 
                                    name="email"
                                    component="div"
                                    style={{color: "#dc3545 ", textDecoration: "underline"}}
                                    className="form-text"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="password" className="form-label">Password:</label>
                                <Field 
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeHolder="Your password..."
                                />
                                <ErrorMessage 
                                    name="password"
                                    component="div"
                                    className="form-text"
                                    style={{color: "#dc3545 ", textDecoration: "underline"}}
                                />
                            </div>
                            
                            <button type="submit" disabled={isSubmitting} className="btn btn-outline-primary">Submit</button>
                        </Form>
                    )
                }}
            </Formik>
            <div className="w-100 text-center mt-2">
                Don't you have an account? <Link to="/sign-up">Sign up!</Link>
            </div>
        </Container>
    )
}

export default SignIn
