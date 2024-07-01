import React, { useState } from 'react';
import { Container, Row, Col, Card, FloatingLabel, Form, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileSetUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    username: '',
    password: '',
   
  });

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5100/api/users/profile-setup', formData);
      toast.success('Profile setup completed successfully!');
    } catch (error) {
      toast.error('Failed to set up profile. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return (
          <Step1
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        );
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="text-center shadow-lg">
                <Card.Header><h4>Profile Set Up</h4></Card.Header>
                <Card.Body>
                  <ProgressBar now={(step / 3) * 100} className="mb-3" />
                  {renderStep()}
                </Card.Body>
                <Card.Footer className="text-muted">
                  Already have an account? <Link to="/login">Login</Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </>
  );
};

const Step1 = ({ formData, handleChange, nextStep }) => (
  <>
    <Card.Title>Step 1: Personal Details</Card.Title>
    <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
      <Form.Control
        size='sm'
        type="text"
        placeholder="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
    </FloatingLabel>
    <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
      <Form.Control
        size='sm'
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
    </FloatingLabel>
    <FloatingLabel controlId="floatingDob" label="Date of Birth" className="mb-3">
      <Form.Control
        size='sm'
        type="date"
        placeholder="Date of Birth"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />
    </FloatingLabel>
    <Button variant="primary" onClick={nextStep}>Next</Button>
  </>
);

const Step2 = ({ formData, handleChange, nextStep, prevStep }) => (
  <>
    <Card.Title>Step 2: Contact Details</Card.Title>
    <FloatingLabel controlId="floatingEmail" label="Email Address" className="mb-3">
      <Form.Control
        size='sm'
        type="email"
        placeholder="name@example.com"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </FloatingLabel>
    <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-3">
      <Form.Control
        size='sm'
        type="tel"
        placeholder="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
    </FloatingLabel>
    <Button variant="secondary" onClick={prevStep} className="me-2">Back</Button>
    <Button variant="primary" onClick={nextStep}>Next</Button>
  </>
);

const Step3 = ({ formData, handleChange, prevStep, handleSubmit }) => (
  <>
    <Card.Title>Step 3: Account Details</Card.Title>
    <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
      <Form.Control
        size='sm'
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
    </FloatingLabel>
    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
      <Form.Control
        size='sm'
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
    </FloatingLabel>
    <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
      <Form.Control
        size='sm'
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
    </FloatingLabel>
    <Button variant="secondary" onClick={prevStep} className="me-2">Back</Button>
    <Button variant="primary" onClick={handleSubmit}>Register</Button>
  </>
);

export default ProfileSetUp;
