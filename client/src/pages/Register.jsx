// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const steps = ['Account', 'Personal', 'OTP Verification', 'Finish'];

// const Register = () => {
//   const [step, setStep] = useState(0);
//   const { userId } = useParams();
//   console.log(userId);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     email: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//     firstName: '',
//     lastName: '',
//     age: '',
//     gender: '',
//     state: '',
//     district: '',
//     city: '',
//     dateOfBirth: '',
//     qualification: '',
//     profession: '',
//     phno: '',
//     otp: '',
//   });
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5100/api/auth/user/${userId}`);
//         console.log(response.data);
//         setFormData({
//           email: response.data.email || '',
//           username: response.data.username || '',
//           password: response.data.password || '',
//           confirmPassword: response.data.confirmPassword || '',
//           firstName: response.data.firstName || '',
//           lastName:response.data.lastName || '' ,
//           age: response.data.age || '',
//           gender: response.data.gender || '',
//           state: response.data.state || '',
//           district: response.data.district || '',
//           city: response.data.city || '',
//           dateOfBirth: response.data.dateOfBirth || '',
//           qualification: response.data.qualification || '',
//           profession: response.data.profession || '',
//           phno: response.data.phno || '',
//           otp: response.data.otp || '',
//         });
//         console.log(formData);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleNext = () => {
//     if (step === steps.length - 1) {
//       handleSubmit();
//     } else {
//       setStep(step + 1);
//     }
//   };

//   const handleBack = () => {
//     setStep(step - 1);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const sendOtp = async () => {
//     try {
//       const response = await axios.post('http://localhost:5100/api/auth/send-otp', { phoneNumber: formData.phno });
//       console.log(response.data);
//       if (response.data.message === 'OTP send successfully') {
//         setOtpSent(true);
//         alert('OTP sent successfully');
//       } else {
//         alert('Failed to send OTP. Please try again.');
//       }
//     } catch (error) {
//       alert('Failed to send OTP. Please try again.');
//       console.error('OTP sending error:', error);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const response = await axios.post('http://localhost:5100/api/auth/verify-otp', { phoneNumber: formData.phno, otp: formData.otp });
//       console.log(response);
//       if (response.data.message === 'Verification successful') {
//         setOtpVerified(true);
//         alert('OTP verified successfully');
//       } else {
//         alert('Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       alert('Invalid OTP. Please try again2.');
//       console.error('OTP verification error:', error);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!otpVerified) {
//       alert('Please verify the OTP before submitting the form.');
//       return;
//     }

//     try {
//       const { otp, ...otherDetails } = formData
//       const response = await axios.put('http://localhost:5100/api/auth/register/:id', otherDetails);
//       if (response.status === 200) {
//         navigate('/');
//       } else {
//         alert('Registration failed. Please try again.');
//       }
//     } catch (error) {
//       alert('Registration failed. Please try again.');
//       console.error('Registration error:', error);
//     }
//   };

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <>
//             <div className="mb-4">
//               <label className="block text-gray-700">First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Email Id</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">UserName</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//           </>
//         );
//       case 1:
//         return (
//           <>
//             <div className="mb-4">
//               <label className="block text-gray-700">State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">District</label>
//               <input
//                 type="text"
//                 name="district"
//                 value={formData.district}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Date of Birth</label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Qualification</label>
//               <input
//                 type="text"
//                 name="qualification"
//                 value={formData.qualification}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Profession</label>
//               <input
//                 type="text"
//                 name="profession"
//                 value={formData.profession}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <div className="mb-4">
//               <label className="block text-gray-700">Phone Number</label>
//               <input
//                 type="text"
//                 name="phno"
//                 value={formData.phno}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//               <button
//                 type="button"
//                 onClick={sendOtp}
//                 className="w-full bg-blue-500 text-white p-2 rounded-md mt-2"
//                 disabled={otpSent}
//               >
//                 {otpSent ? 'OTP Sent' : 'Send OTP'}
//               </button>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">OTP</label>
//               <input
//                 type="text"
//                 name="otp"
//                 value={formData.otp}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//               <button
//                 type="button"
//                 onClick={verifyOtp}
//                 className="w-full bg-green-500 text-white p-2 rounded-md mt-2"
//                 disabled={otpVerified}
//               >
//                 {otpVerified ? 'OTP Verified' : 'Verify OTP'}
//               </button>
//             </div>
//           </>
//         );
//       case 3:
//         return (
//           <div className="text-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-16 w-16 text-green-500 mx-auto"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <h3 className="text-xl font-semibold mt-4">You Have Successfully Signed Up</h3>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
//         <h2 className="text-2xl font-bold text-center mb-6">Sign Up Your User Account</h2>
//         <div className="mb-4">
//           <ul className="flex justify-between">
//             {steps.map((label, index) => (
//               <li
//                 key={index}
//                 className={`flex-1 text-center py-2 border-b-4 ${index === step ? 'border-green-500' : 'border-gray-200'
//                   }`}
//               >
//                 {label}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">{renderStepContent(step)}</div>
//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={handleBack}
//               className={`w-1/2 bg-gray-300 text-black p-2 rounded-md mr-2 ${step === 0 && 'opacity-50 cursor-not-allowed'
//                 }`}
//               disabled={step === 0}
//             >
//               Previous
//             </button>
//             <button
//               type="button"
//               onClick={handleNext}
//               className="w-1/2 bg-green-500 text-white p-2 rounded-md ml-2"
//             >
//               {step === steps.length - 1 ? 'Finish' : 'Next'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from 'react';
import { Container, Row, Col, Card, FloatingLabel, Form, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
  // Age calculating...................................
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setDob(dobValue);
    const calculatedAge = calculateAge(dobValue);
    setAge(calculatedAge);
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
   const handleRegister = () => {
    window.location.href = '/dashboard'
  }
//......................................................................................
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
          <Step1 nextStep={nextStep} />
        );
      case 2:
        return (
          <Step2 nextStep={nextStep} prevStep={prevStep} />
        );
      case 3:
        return (
          <Step3 prevStep={prevStep} />
        );
      default:
        return (
          <Step1 nextStep={nextStep} />
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
              <Card.Header><h3>Register</h3></Card.Header>
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
    </>
  );
};

const Step1 = ({ nextStep }) => {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setDob(dobValue);
    const calculatedAge = calculateAge(dobValue);
    setAge(calculatedAge);
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
        <Form.Control size='sm' type="text" placeholder="First Name" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
        <Form.Control size='sm' type="text" placeholder="Last Name" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingDob" label="Date of Birth" className="mb-3">
        <Form.Control
          size='sm'
          type="date"
          value={dob}
          onChange={handleDobChange}
          placeholder="Date of Birth"
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
        <Form.Control size='sm' type="text" value={age} placeholder="Age" readOnly />
      </FloatingLabel>
      <Button variant="primary" onClick={nextStep}>Next</Button>
    </>
  );
};

const Step2 = ({ nextStep, prevStep }) => (
  <>
    <Card.Title>Step 2: Contact Details</Card.Title>
    <FloatingLabel controlId="floatingEmail" label="Email Address" className="mb-3">
      <Form.Control size='sm' type="email" placeholder="name@example.com" />
    </FloatingLabel>
    <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-3">
      <Form.Control size='sm' type="tel" placeholder="Phone Number" />
    </FloatingLabel>
    <Button variant="secondary" onClick={prevStep} className="me-2">Back</Button>
    <Button variant="primary" onClick={nextStep}>Next</Button>
  </>
);

const Step3 = ({ prevStep }) => (
  <>
    <Card.Title>Step 3: Account Details</Card.Title>
    <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
      <Form.Control size='sm' type="text" placeholder="Username" />
    </FloatingLabel>
    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
      <Form.Control size='sm' type="password" placeholder="Password" />
    </FloatingLabel>
    <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
      <Form.Control size='sm' type="password" placeholder="Confirm Password" />
    </FloatingLabel>
    <Button variant="secondary" onClick={prevStep} className="me-2">Back</Button>
    <Button variant="dark"
    //  onClick={handleRegister}
     >
      Register</Button>
  </>
);

export default Register;
