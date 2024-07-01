import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import ProfileForm from '../components/ProfileForm';
import  { Sidebar,SidebarLink, MainContent } from './../assets/wrappers/Dashboard';
import { DashboardNavbar } from '../components';


const ProfilePage = () => {
  return (
    <>
     <Container fluid>
        <DashboardNavbar />
    
      <Row>
        <Sidebar md={2}>
          <Nav defaultActiveKey="/home" className="flex-column">
            <SidebarLink href="/dashboard">Home</SidebarLink>
            <SidebarLink href="/notifications">Notifications</SidebarLink>
            <SidebarLink href="/saved-posts">Saved Posts</SidebarLink>
            <SidebarLink href="/chats">Messages</SidebarLink>
          </Nav>
        </Sidebar>
        <MainContent md={10}>
          <ProfileForm />
        </MainContent>
      </Row>
    </Container>
    </>
  )
}

export default ProfilePage
