import React, { useState } from 'react';
import { Form, Button, Toast, ToastContainer,
   FormGroup, FormControl, FormLabel, Card, Container, Row, Col,Navbar
 } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const RelationshipStatus = () => {

  const { userId } = useParams(); // Dynamically get the user ID from the route parameters
  const [relationshipType, setRelationshipType] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (relationshipType === 'longterm') {
      setShowToast(true);
    } else {
      try {
        await axios.put(`http://localhost:5100/api/matrimony/${userId}`, { isMatrimony: false });
        navigate(`/dashboard`);
        toast.success('Matrimony status updated successfully!');
      } catch (error) {
        toast.error('failed to Update')
        console.error('Error updating matrimony status:', error);
      }
    }
  };

  const handleMatrimonyResponse = async (response) => {
    setShowToast(false);
    const isMatrimony = response === 'yes';
    try {
      await axios.put(`http://localhost:5100/api/matrimony/${userId}`, { isMatrimony });
      toast.success(`Welcome`)
      navigate(`/dashboard`);
    } catch (error) {
      toast.error('Failed to Update')
      console.error('Error updating matrimony status:', error);
    }
  };

  return (
    <>
    {/* <div className="container mx-auto max-w-sm p-4"> */}
      {/* <h2 className="text-2xl mb-4">Relationship Status</h2> */}
      <Navbar bg="dark" variant="dark" expand="lg"  sticky="top" expanded={true}>
    <Container fluid >
      <Navbar.Brand href="">Dating App</Navbar.Brand>
      <Navbar.Toggle />
    </Container>
  </Navbar>

      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Container >
      <Row className="justify-content-center"> 
      <Col md={6}> 
      <Card className="shadow-lg">
      <Card.Header className="text-center">
              <h3>Status</h3>
            </Card.Header>
            <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Check
          type="radio"
          label="Longterm"
          name="relationshipType"
          value="longterm"
          onChange={(e) => setRelationshipType(e.target.value)}
        />
        <Form.Check
          type="radio"
          label="Shortterm"
          name="relationshipType"
          value="shortterm"
          onChange={(e) => setRelationshipType(e.target.value)}
        />
        <Button variant="dark" type="submit" className="w-100 mt-3">Submit</Button>
      </Form>
      </Card.Body>
      </Card>
    </Col>
    </Row>
    </Container>
    </div>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Header>
            <strong className="me-auto">Matrimony</strong>
          </Toast.Header>
          <Toast.Body>
            Are you interested in matrimony?
            <div className="mt-2">
              <Button variant="success" onClick={() => handleMatrimonyResponse('yes')} className="me-2">Yes</Button>
              <Button variant="danger" onClick={() => handleMatrimonyResponse('no')}>No</Button>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    {/* </div> */}
    
    </>
  );
};

export default RelationshipStatus;
