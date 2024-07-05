import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, FormLabel, Button, Card, Container, Row, Col,Navbar } from 'react-bootstrap';

import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployeeStatus = () => {
  const [jobStatus, setJobStatus] = useState('');
  const [jobDetails, setJobDetails] = useState({ jobStatus:'',companyName: '', jobTitle: '', jobLocation: '', jobLevel: '' }); // Initial state for job details
  const { userId } = useParams(); // Get user ID from route parameters
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user's existing job details (optional)
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5100/api/users/jobs/${userId}`); // Adjusted URL for GET request
        setJobDetails(response.data); // Update jobDetails state
        
      } catch (error) {
         // Show error message if failed to fetch job details
        console.error('Error fetching user job details:', error);
      }
    };

    fetchJobDetails(); // Call the fetch function
  }, [userId]); // Dependency array: Runs only when userId changes

  const handleJobStatusChange = (event) => {
    setJobStatus(event.target.value);
  };

  const handleChange = (event) => {
    setJobDetails({ ...jobDetails, [event.target.name]: event.target.value }); // Update specific job detail based on changed field
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { ...jobDetails, jobStatus }; // Combine job details and job status

    try {
      const response = await axios.put(`http://localhost:5100/api/users/jobs/${userId}`, data);
      console.log('Job details updated:', response.data);
      // Handle successful update (e.g., display success message)
      toast.success('Status Updated')
      navigate(`/relationShipStatus/${userId}`);
    } catch (error) {
      toast.error('Failed to update status. Please try again.')
      console.error('Error updating job details:', error);
      // Handle errors (e.g., display error message to the user)
    }
  };

  return (
    <>
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
              <h3>Job Details</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel>Job Status</FormLabel>
                  <div>
                    <Form.Check className='mb-2'
                      type="radio"
                      label="Employer"
                      value="employer"
                      checked={jobStatus === 'employer'}
                      onChange={handleJobStatusChange}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Employee"
                      value="employee"
                      checked={jobStatus === 'employee'}
                      onChange={handleJobStatusChange}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Jobseeker"
                      value="jobseeker"
                      checked={jobStatus === 'jobseeker'}
                      onChange={handleJobStatusChange}
                      inline
                    />
                  </div>
                </FormGroup>
                {jobStatus === 'employer' && (
                  <>
                    <FormGroup>
                      <FormControl className='mb-2'
                       type="text" name="companyName" 
                       placeholder="Company Name" 
                       onChange={handleChange} value={jobDetails.companyName} />
                    </FormGroup>

                    <FormGroup>
                      <FormControl className='mb-2'
                      type="text" name="jobTitle"
                       placeholder="Job Title" 
                       onChange={handleChange} value={jobDetails.jobTitle} />
                    </FormGroup>

                    <FormGroup>
                      <FormControl 
                      type="text" name="jobLocation"
                      placeholder="Job Location" 
                      onChange={handleChange} value={jobDetails.jobLocation} />
                    </FormGroup>
                  </>
                )}
                {jobStatus === 'employee' && (
                  <>
                    <FormGroup>
                      <FormControl className='mb-2'
                       type="text" name="companyName"
                        placeholder="Company Name" 
                        onChange={handleChange} value={jobDetails.companyName} />
                    </FormGroup>
                    <FormGroup>
                      <FormControl className='mb-2'
                      type="text" name="jobTitle" 
                      placeholder="Job Title" 
                      onChange={handleChange} value={jobDetails.jobTitle} />
                    </FormGroup>
                    <FormGroup>
                      <FormControl className='mb-2'
                      type="text" name="jobLocation"
                       placeholder="Job Location" 
                       onChange={handleChange} value={jobDetails.jobLocation} />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                       type="text" name="jobLevel" 
                       placeholder="Job Level" 
                       onChange={handleChange} value={jobDetails.jobLevel} />
                    </FormGroup>
                  </>
                )}
                {jobStatus === 'jobseeker' }
                 
                <Button variant="dark" type="submit" className="w-100 mt-3">Save Details</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    </>
  );
};

export default EmployeeStatus;
