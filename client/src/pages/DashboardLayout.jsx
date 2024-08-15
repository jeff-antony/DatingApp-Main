import React, { useEffect, useState } from "react";
import axios from "axios";
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
import {
  Sidebar,
  SidebarLink,
  MainContent,
} from "../assets/wrappers/Dashboard";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DashboardLayout = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); 
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5100/api/dashboard/others`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

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
    fetchUsers();
  }, []);

  return (
    <>
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

      <Container fluid>
        <Row>
          <Sidebar md={2}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <SidebarLink href="/dashboard">Home</SidebarLink>
              <SidebarLink href="/browse">Browse</SidebarLink>
              <SidebarLink href={`/chats/${userId}`}>Messages</SidebarLink>
              <SidebarLink href={`/notifications/${userId}`}>Notifications</SidebarLink>
              {/* <Link to={`/notifications/${userId}`}>Notifications</Link> */}
              <SidebarLink href="/personalized-picks">
                Personalized Picks
              </SidebarLink>
              <SidebarLink href="/">Log Out</SidebarLink>
            </Nav>
          </Sidebar>
          <MainContent md={10}>
            <Tab.Container defaultActiveKey="first">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="first">1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">3</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <br />
                  <h5>Matching</h5>
                  <br />
                  <Row>
                    {Array.isArray(users) && users.length > 0 ? (
                      users.map((user) => (
                        <Col key={user._id} md={3}>
                          <Card style={{ width: "15rem" }}>
                            <Card.Img
                              variant="top"
                              src={user.profilePic}
                            />
                            <Card.Body>
                              <Card.Title>
                                {user.firstName} {user.lastName}
                              </Card.Title>
                              <Button variant="outline-dark" size="sm"
                               onClick={() => navigate(`/profile/${user._id}`)}
                              >
                                View
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">Tab content 2</Tab.Pane>
                <Tab.Pane eventKey="third">Tab content 3</Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </MainContent>
        </Row>
      </Container>
    </>
  );
};

export default DashboardLayout;


