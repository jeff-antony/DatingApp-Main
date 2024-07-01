import React from 'react'
import { Container, Row, Nav, Tab, Card, Navbar,Col } from 'react-bootstrap';
import { Sidebar,SidebarLink,MainContent, ProfileImage, ProfileButton } from '../assets/wrappers/Dashboard';

import avatar1 from "../assets/images/avatar1.jpg";
import avatar2 from "../assets/images/avatar2.jpg";
import { DashboardNavbar } from '../components';
const DashboardLayout = () => {
  return (
    <>
    <DashboardNavbar/>
  <Container fluid>
      
      <Row>
        <Sidebar md={2}>
          <Nav defaultActiveKey="/home" className="flex-column">
            <SidebarLink href="/dashboard">Home</SidebarLink>
            <SidebarLink href="/browse">Browse</SidebarLink>
            <SidebarLink href="/chats">Messages</SidebarLink>
            <SidebarLink href="/notifications">Notifications</SidebarLink>
            <SidebarLink href="/personalized-picks">Personalized Picks</SidebarLink>
            <SidebarLink href="/">Log Out</SidebarLink>

          </Nav>
        </Sidebar>
        <MainContent md={10}>
          {/* <ProfileButton>Profile</ProfileButton> */}
          <Tab.Container defaultActiveKey="first">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="first">Tab</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Tab</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Tab</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <br></br>
                <h5>Matching</h5>
                <br></br>
                <Row>
                  <Col md={3}>
                    <Card style={{ width: '15rem' }} >
                    <Card.Img variant="top" src={avatar1} />
                      <Card.Body>
                        <Card.Title>Emila Clark</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                  <Card style={{ width: '15rem' }} >
                  <Card.Img variant="top" src={avatar2} />
                      <Card.Body>
                        <Card.Title>Jon Snow</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                  <Card style={{ width: '15rem' }} >
                  <Card.Img variant="top" src={avatar1} />
                      <Card.Body>
                        <Card.Title>Alice</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                  <Card style={{ width: '15rem' }} >
                  <Card.Img variant="top" src={avatar2} />
                      <Card.Body>
                        <Card.Title>James</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
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
  )
}

export default DashboardLayout