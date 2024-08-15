import React from 'react';
import { Container, Row, Col, Button, Form,Navbar } from 'react-bootstrap';
import Wrapper from "../assets/wrappers/LandingPage.js";
import { FaApple, FaFacebook,FaGoogle } from 'react-icons/fa';
import avatar1 from "../assets/images/avatar1.jpg";
import avatar2 from "../assets/images/avatar2.jpg";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Landing = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5100/api/auth/google';
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to handle submit button

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
      // Prevent multiple form submissions
      if (isSubmitting) return;

      setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5100/api/auth/login', {
        email,
        password,
      });

      console.log(response.data); // For debugging (remove in production)
      // if(response.data.token || response.data.message ==='Login successfull'){
      if(response.data.token || response.data.message ==='Login successfull'){
        localStorage.setItem('token', response.data.token); //  store token in localStorage (consider using a secure storage solution)
        localStorage.setItem('userId', response.data.user._id); //  store token in localStorage (consider using a secure storage solution)
        localStorage.setItem('isAdmin', response.data.user.isAdmin); // store isAdmin in localStorage

        toast.success('Login successful');


        if (response.data.user.isAdmin) {
          navigate(`/adminDashboard`)
        }
        else {
          navigate('/chooseLayout'); // navigate to dashboard
        }
        }
      // Handle successful login (e.g., store token, redirect to dashboard)
    } catch (error) {
      console.error(error.response.data.message); // Log error message for debugging
      // Handle login errors (e.g., display error message)
      toast.error('Login failed: ' + error.response.data.message); // display error message
    }finally{
      setIsSubmitting(false); // Re-enable the submit button
    }
  };


  return (
    <>
   <Navbar bg="dark" variant="dark" expand="lg"  sticky="top" expanded={true}>
    <Container fluid >
      <Navbar.Brand href="/dashboard">Dating App</Navbar.Brand>
      <Navbar.Toggle />
    </Container>
  </Navbar>

    <Wrapper>
      <div className="background"></div>
      <div className="form-container">
        <Container className="sign-up-form">
          <div className="form-header">
            <h2>Sign Up</h2>
          </div>
          <div className="social-buttons">
            <Button variant="dark" className="social-button w-100 mb-2" onClick={handleGoogleLogin}>
              <FaGoogle className="me-2" /> Sign Up with Google
            </Button>
            {/* <Button variant="primary" className="social-button w-100 mb-2">
              <FaFacebook className="me-2" /> Sign Up with Facebook
            </Button> */}
          </div>
          <div className="or-separator">
          <div className="form-header">
            <h2>Login</h2>
          </div>
  
          </div>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Control 
              className="mb-3" 
              type="email" 
              placeholder="Email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control  className="mb-3"
               type="password"
              placeholder="Password"
              name='pass'
              id='pass' 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
                />
            </Form.Group>
            <Button variant="dark" className="w-100" onClick={handleLogin} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
          </Form>
          <div className="form-footer">
            {/* <p>
              Already registered? <a href="/login">Log In</a>
            </p> */}
            <p>
              By clicking on next, you acknowledge that you have read and accepted the
              <a href="/terms"> Terms of Service</a> and the <a href="/privacy">Privacy Policy</a>.
            </p>
          </div>
        </Container>
      </div>
    </Wrapper>
    </>
  );
};

export default Landing;





// import React from 'react'
// import styled from 'styled-components';
// import Wrapper from '../assets/wrappers/LandingPage';
// import main from '../assets/images/main.svg';
// import { Link } from 'react-router-dom';



// const Landing = () => {
//   return (
  
//     <Wrapper>
//       <nav>
//         <h2>logo here</h2>
//       </nav>
//       <div className='container page'>
//         <div className='info'>
//           <h1>
//             App <span>for</span > Dating
//           </h1>
//           <p>
//             Find right partner level taiyaki brooklyn cliche blue
//             bottle single-origin coffee chia. Aesthetic post-ironic venmo,
//             quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
//             narwhal.
//           </p>
//           <Link to='/api/auth/google' className='btn register-link'>
//             Sign Up with Google 
//           </Link>
//           <Link to='/login' className='btn '>
//             Login
//           </Link>
//         </div>
//         <img src={main} alt='job hunt' className='img main-img' />
//       </div>
//     </Wrapper>
    
//   )
// }

// export default Landing

// src/page/Landing.jsx
// import React from 'react';
// import {
//   Container,
//   Header,
//   Logo,
//   Nav,
//   NavLink,
//   Main,
//   Title,
//   Highlight,
//   Subtitle,
//   UserCard,
//   UserInfo,
//   UserName,
//   UserLocation,
//   SayHiButton,
// } from '../assets/wrappers/LandingPage.js';

// const Landing = () => {
//   return (
//     <Container>
//       <Header>
//         <Logo>Match Maker</Logo>
//         <Nav>
//           <NavLink href="#">Home</NavLink>
//           <NavLink href="#">Features</NavLink>
//           <NavLink href="#">Contact</NavLink>
//           <NavLink href="#">Login</NavLink>
//           <NavLink href="#">Sign Up</NavLink>
//         </Nav>
//       </Header>
//       <Main>
//         <Title>
//           Find your love <br />
//           BY being <Highlight>Yourself</Highlight>
//         </Title>
//         <Subtitle>
//           we designed a platform for people of lover to find their love without
//           being judged
//         </Subtitle>
//         <UserCard>
//           <img
//             src="https://via.placeholder.com/150"
//             alt="User"
//             width="80"
//             height="80"
//             style={{ borderRadius: '50%' }}
//           />
//           <UserInfo>
//             <UserName>Johan Carter</UserName>
//             <UserLocation>New York, Near 2.1 miles</UserLocation>
//             <SayHiButton>Say Hi</SayHiButton>
//           </UserInfo>
//         </UserCard>
//       </Main>
//     </Container>
//   );
// };

// export default Landing;
