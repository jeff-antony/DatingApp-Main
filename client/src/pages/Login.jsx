import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";

const Login = () => {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="text-center shadow-lg">
                <Card.Header>Welcome</Card.Header>
                <Card.Body>
                  <Card.Title>Login</Card.Title>
                  <FloatingLabel
                    controlId="floatingEmail"
                    label="Email"
                    className="mb-3"
                  >
                    <Form.Control
                      size="sm"
                      type="email"
                      placeholder="example@gmail.com"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingLastName"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control
                      size="sm"
                      type="password"
                      placeholder="Password"
                    />
                  </FloatingLabel>
                  <Button variant="dark" href="/dashboard">
                    Login
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Are you new? <Link to="/register">Register</Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
