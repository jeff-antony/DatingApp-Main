import Container from 'react-bootstrap/Container';
import {  Row, Nav, Tab, Card, Navbar,Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const DashboardNavbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [currentUser, setCurrentUser] = useState(null); 

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5100/api/dashboard/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser(response.data); // Set the current user data
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
    <Container fluid>
      <Navbar.Brand href="/dashboard">Dating App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as:{" "}
          <a href={`/edit-profile/${userId}`} style={{ textDecoration: "none" }}>
            {currentUser?
              `${currentUser.firstName} ${currentUser.lastName}` : "loading..."}
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default DashboardNavbar;