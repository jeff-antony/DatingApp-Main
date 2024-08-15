import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Container,
    Row,
    Nav,
    Tab,
    Card,
    Navbar,
    Col,
    Button,
  } from "react-bootstrap";
  import { useNavigate } from 'react-router-dom';

  import styled from 'styled-components';

  const StyledButton = styled(Button)`
  opacity: 1;
  transition: opacity 2s ease-in-out, transform 0.3s ease-in-out;
  &:hover {
      opacity: 0.7;
      transform: scale(1.05);
  }
`;


const ChooseLayout = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId')
    useEffect(()=>{
      const fetchCurrentUser = async () =>{
        try {
          const token = localStorage.getItem('token')
          const response = await axios.get('http://localhost:5100/api/dashboard/current-user',{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          setCurrentUser(response.data)
        } catch (error) {
          console.error(`error for fetching current user:`,error);
        }
      }
      fetchCurrentUser()
    },[])
  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">Application</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as:{" "}
              <a href="/edit-profile" style={{ textDecoration: "none" }}>
                {currentUser?
                  `${currentUser.firstName} ${currentUser.lastName}` : "loading..."}
              </a>
            </Navbar.Text>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <Card style={{ width: '50%', padding: '20px' }} className='shadow p-3 mb-5 bg-white rounded'>
                    <Card.Body className="d-flex flex-column align-items-center">
                        <StyledButton variant="dark" className="m-2"
                        onClick = {()=>navigate(`/dashboard`)}>
                          Dating App
                          </StyledButton>
                        <StyledButton variant="dark" className="m-2">Matrimony</StyledButton>
                        <StyledButton variant="dark" className="m-2"
                        onClick={()=>navigate(`/e-commerceHomePage`)}>
                          E-commerce
                          </StyledButton>
                        <StyledButton variant="dark" className="m-2">Job Portal</StyledButton>
                        <StyledButton variant="dark" className="m-2">Study Abroad</StyledButton>
                    </Card.Body>
                </Card>
            </Container>
          
    </>
  )
}

export default ChooseLayout