import React from "react";
import SignUp from "./components/SignUp";
import { Container } from "react-bootstrap";

function App() {
  return (
      <Container 
        className="d-flex flex-column justify-content-center align-items-center"
        style={{minHeight: "100vh"}}>
        <SignUp />
      </Container>
  );
}

export default App;
