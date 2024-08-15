import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, FloatingLabel, Form, Button, ProgressBar,Navbar } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PhotoUploads } from '../components';
import { toast } from 'react-toastify';
const Register = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log(userId);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    state: '',
    district: '',
    city: '',
    dateOfBirth: '',
    qualification: '',
    profession: '',
    phno: '',
    interest:'',
    hobbies:'',
    smokingHabits:'',
    drinkingHabits:'',
    photos:''
    // otp: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5100/api/auth/user/${userId}`);
        console.log(response.data);
        setFormData({
          email: response.data.email || '',
          username: response.data.username || '',
          password: response.data.password || '',
          confirmPassword: response.data.confirmPassword || '',
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          age: response.data.age || '',
          gender: response.data.gender || '',
          state: response.data.state || '',
          district: response.data.district || '',
          city: response.data.city || '',
          dateOfBirth: response.data.dateOfBirth || '',
          qualification: response.data.qualification || '',
          profession: response.data.profession || '',
          phno: response.data.phno || '',
          interest: response.data.interest || '',
          smokingHabits:response.data.smokingHabits || '',
          drinkingHabits:response.data.drinkingHabits || '',
          hobbies: response.data.hobbies || '',

          // otp: response.data.otp || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5100/api/auth/register/${userId}`, formData);
      console.log('Registration successful:', response.data);
      toast.success('Register Successful')
      // Redirect to dashboard or another page
      navigate(`/employeeStatus/${userId}`);
      // navigate(`/employeeStatus`);
    } catch (error) {
      toast.error('Failed to Register. Please try again.') 
      console.error('Error during registration:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
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
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
        case 4:
        return (
          <Step4
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
        // case 5:
        // return (
        //   <Step5
        //     formData={formData}
        //     handleChange={handleChange}
        //     nextStep={nextStep}
        //     prevStep={prevStep}
        //   />
        // );
      case 5:
        return (
          <Step6
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
    <Navbar bg="dark" variant="dark" expand="lg"  sticky="top" expanded={true}>
    <Container fluid >
      <Navbar.Brand href="">Dating App</Navbar.Brand>
      <Navbar.Toggle />
    </Container>
  </Navbar>

      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="text-center shadow-lg">
                <Card.Header><h3>Register</h3></Card.Header>
                <Card.Body>
                  <ProgressBar variant='black' now={(step / 6) * 100} className="mb-3" />
                  {loading ? <p>Loading...</p> : (
                    <Form onSubmit={handleSubmit}>
                      {renderStep()}
                    </Form>
                  )}
                </Card.Body>
                <Card.Footer className="text-muted">
                  Already have an account? <Link to="/">Login</Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const Step1 = ({ formData, handleChange, nextStep }) => {
  const [dob, setDob] = useState(formData.dateOfBirth || '');
  const [age, setAge] = useState(formData.age || '');

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setDob(dobValue);
    const calculatedAge = calculateAge(dobValue);
    setAge(calculatedAge);
    handleChange(e); // Update formData with DOB
    handleChange({ target: { name: 'age', value: calculatedAge } }); // Update formData with calculated age
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
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
          name="dateOfBirth"
          value={dob}
          onChange={handleDobChange}
          placeholder="Date of Birth"
        />
      </FloatingLabel>
      
      <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
        <Form.Control
          size='sm'
          type="text"
          value={age}
          placeholder="Age"
          readOnly
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingGender" label="Gender" className="mb-3">
        <Form.Control
          size='sm'
          type="text"
          placeholder="Gender"
        
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </FloatingLabel>

      <Button variant="dark" onClick={nextStep}>Next</Button>
    </>
  );
};

const Step2 = ({ formData, handleChange, nextStep, prevStep }) => (
  <>
    <Card.Title>Step 2: Contact Details</Card.Title>
    <FloatingLabel controlId="floatingEmail" label="Email Address" className="mb-3">
      <Form.Control
        size='sm'
        type="email"
        placeholder="Email Address"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </FloatingLabel>
    <FloatingLabel controlId="floatingPhno" label="Phone Number" className="mb-3">
      <Form.Control
        size='sm'
        type="text"
        placeholder="Phone Number"
        name="phno"
        value={formData.phno}
        onChange={handleChange}
      />
    </FloatingLabel>
    <Button variant="outline-secondary dark" onClick={prevStep} className='me-3'>Previous</Button>
    <Button variant="dark" onClick={nextStep}>Next</Button>
  </>
);

const Step3 = ({ formData, handleChange, nextStep, prevStep }) => (
  <>
    <Card.Title>Step 3: Address</Card.Title>
    <FloatingLabel controlId="floatingState" label="State" className="mb-3">
        <Form.Control
          size='sm'
          type="text"
          placeholder="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingDistrict" label="District" className="mb-3">
        <Form.Control
          size='sm'
          type="text"
          placeholder="District"
          name="district"
          value={formData.district}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingCity" label="City" className="mb-3">
        <Form.Control
          size='sm'
          type="text"
          placeholder="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingQualification" label="Qualification" className="mb-3">
        <Form.Control
          size='sm'
          type="text"
          placeholder="Qualification"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingProfession" label="Profession" className="mb-3">
        <Form.Control
          size='sm'
          type="text"
          placeholder="Profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
        />
      </FloatingLabel>
    <Button variant="outline-secondary dark" onClick={prevStep} className='me-3'>Previous</Button>
    <Button variant="dark" onClick={nextStep}>Next</Button>
  </>
);

const Step4 = ({ formData, handleChange, nextStep, prevStep }) => (
  <>
    <Card.Title>Step 4: </Card.Title>
    <FloatingLabel controlId="floatingInterest" label="Interest" className="mb-3">
        <Form.Control
          size='sm'
          type="text"
          placeholder="Interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingHobbies" label="Hobbies" className="mb-3">
        <Form.Control
          size='sm'
          type="text"
          placeholder="Hobbies"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSmokingHabits" label="Smoking Habits" className="mb-3">
        <Form.Control
          size='sm'
          type="text"
          placeholder="Smoking Habits"
          name="smokingHabits"
          value={formData.smokingHabits}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingDrinkingHabits" label="Drinking Habits" className="mb-3">
        <Form.Control
          size='sm'
          type="text"
          placeholder="Drinking Habits"
          name="drinkingHabits"
          value={formData.drinkingHabits}
          onChange={handleChange}
        />
      </FloatingLabel>

    <Button variant="outline-secondary dark" onClick={prevStep} className='me-3'>Previous</Button>
    <Button variant="dark" onClick={nextStep}>Next</Button>
  </>
);
// const Step5 = ({ formData, handleChange, nextStep, prevStep }) => (
//   <>
//     <Card.Title>Step 4:Upload Photo </Card.Title>
    
    
//     {userId && <PhotoUploads userId={userId} />} 
//      {/* Render PhotoUpload component after registration  */}
//     {/* { <PhotoUploads />} */}
//     {/* Render PhotoUpload component after registration */}

//     <Button variant="outline-secondary dark" onClick={prevStep} className='me-3'>Previous</Button>
//     <Button variant="dark" onClick={nextStep}>Next</Button>
//   </>
// );

const Step6 = ({ formData, handleChange, prevStep, handleSubmit }) => (
  <>
    <Card.Title>Step 6: Account Details</Card.Title>
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
    <Button variant="outline-secondary dark" onClick={prevStep} className='me-3'>Previous</Button>
    <Button variant="dark" type="submit" onClick={handleSubmit}>Register</Button>

  </>
);

export default Register;
