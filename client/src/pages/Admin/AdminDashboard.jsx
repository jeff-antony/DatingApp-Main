import React from 'react';
import { Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTachometerAlt, FaChartLine, FaShoppingCart, FaEnvelope, FaUser, FaCogs } from 'react-icons/fa';
import { BiTask } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';

const Sidebar = styled.div`
  height: 100vh;
  background-color: #343a40;
  padding-top: 20px;
  @media (max-width: 768px) {
    height: auto;
    padding: 10px 0;
  }
`;

const SidebarItem = styled.div`
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #495057;
  }
  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 14px;
  }
`;

const Content = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/adminDashboard">Application</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as:{" "}
              <a href={`/adminDashboard`} style={{ textDecoration: "none" }}>
                {"Admin"}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={2} className="d-none d-md-block">
            <Sidebar>
              <SidebarItem onClick={() => handleNavigation('/adminDashboard')}>
                <FaTachometerAlt /> Dashboard
              </SidebarItem>
              <SidebarItem onClick={() => handleNavigation('/analytics')}>
                <FaChartLine /> Analytics
              </SidebarItem>
              <SidebarItem onClick={() => handleNavigation('/adminEcommerce')}>
                <FaShoppingCart /> eCommerce
              </SidebarItem>
              <SidebarItem onClick={() => handleNavigation('/email')}>
                <FaEnvelope /> Email
              </SidebarItem>
              <SidebarItem onClick={() => handleNavigation('/todo')}>
                <BiTask /> ToDo
              </SidebarItem>
              <SidebarItem onClick={() => handleNavigation('/user')}>
                <FaUser /> User
              </SidebarItem>
              <SidebarItem onClick={() => handleNavigation('/settings')}>
                <FaCogs /> Settings
              </SidebarItem>
              <SidebarItem onClick={() => handleNavigation('/')}>
                <MdLogout /> Log Out
              </SidebarItem>
            </Sidebar>
          </Col>
          <Col md={10} sm={12}>
            <Content>
              <Row>
                <Col md={4} sm={12}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>92.6k</Card.Title>
                      <Card.Text>Subscribers Gained</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} sm={12}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>97.5k</Card.Title>
                      <Card.Text>Orders Received</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} sm={12}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>2.7k</Card.Title>
                      <Card.Text>Avg Sessions</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md={8} sm={12}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>Support Tracker</Card.Title>
                      <Card.Text>
                        <div>Completed Tickets: 83%</div>
                        <div>New Tickets: 29</div>
                        <div>Open Tickets: 63</div>
                        <div>Response Time: 1d</div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} sm={12}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>Other Stats</Card.Title>
                      <Card.Text>Some other important metrics</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Content>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
