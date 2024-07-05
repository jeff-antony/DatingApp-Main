import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tab, Tabs, Nav } from 'react-bootstrap';
import { FaThumbsUp, FaUserPlus, FaEnvelope, FaCamera, FaVideo, FaCheck } from 'react-icons/fa';
import { DashboardNavbar } from '../components';
import styled from 'styled-components';
import avatar1 from "../assets/images/avatar1.jpg";

const ProfileCard = styled(Card)`
  margin-top: 20px;
`;

const ProfilePhoto = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const LikeButton = styled(Button)`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const RequestButton = styled(Button)`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const MessageButton = styled(Button)`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 20px;
`;

const GridItem = styled.div`
  position: relative;
`;

const LikeCount = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
`;

export const Sidebar = styled(Col)`
  background-color: #f8f9fa;
  height: 100vh;
  padding: 20px;
  border-right: 1px solid #dee2e6; /* Separation line */
`;

export const SidebarLink = styled.a`
  color: #000;
  text-decoration: none;
  padding: 10px 0;
  display: block;
  &:hover {
    background-color: #e9ecef;
    border-radius: 4px;
  }
`;

const ProfilePage = () => {
  const [likes, setLikes] = useState(0);
  const [key, setKey] = useState('photos');
  const [requestSent, setRequestSent] = useState(false);
  const [photoLikes, setPhotoLikes] = useState(Array(6).fill(0));
  const [videoLikes, setVideoLikes] = useState(Array(6).fill(0));

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleRequest = () => {
    setRequestSent(true);
  };

  const handlePhotoLike = (index) => {
    const newLikes = [...photoLikes];
    newLikes[index] += 1;
    setPhotoLikes(newLikes);
  };

  const handleVideoLike = (index) => {
    const newLikes = [...videoLikes];
    newLikes[index] += 1;
    setVideoLikes(newLikes);
  };

  return (
    <>
      <DashboardNavbar />
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

          <Col md={8} className="mx-auto">
            <ProfileCard>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <ProfilePhoto src={avatar1} alt="Profile Photo" />
                  </Col>
                  <Col md={8}>
                    <h4>Name</h4>
                    <p>Address</p>
                    <Row>
                      <Col sm>
                        <LikeButton variant="outline-primary" size="sm" onClick={handleLike}>
                          <FaThumbsUp style={{ marginRight: '5px' }} /> Like {likes}
                        </LikeButton>
                      </Col>

                      <Col sm>
                        <RequestButton variant="outline-secondary" size="sm" onClick={handleRequest}>
                          {requestSent ? <FaCheck style={{ marginRight: '5px' }} /> : <FaUserPlus style={{ marginRight: '5px' }} />}
                          {requestSent ? 'Requested' : 'Request'}
                        </RequestButton>
                      </Col>

                      <Col sm>
                        <MessageButton variant="outline-success" size="sm">
                          <FaEnvelope style={{ marginRight: '5px' }} /> Message
                        </MessageButton>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <h5>Bio</h5>
                    <p>This is the bio of the person...</p>
                  </Col>
                </Row>
                <Tabs id="profile-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mt-4">
                  <Tab
                    eventKey="photos"
                    title={
                      <span>
                        <FaCamera style={{ marginRight: '5px' }} /> Photos
                      </span>
                    }
                  >
                    <GridContainer>
                      {[...Array(6)].map((_, index) => (
                        <GridItem key={index} >
                          <img src={avatar1} alt={`Photo ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                          <LikeButton variant="outline-primary" size="sm" className='mt-2'
                           onClick={() => handlePhotoLike(index)}>
                            <FaThumbsUp style={{ marginRight: '5px' }} /> {photoLikes[index]}
                          </LikeButton>
                        </GridItem>
                      ))}
                    </GridContainer>
                  </Tab>
                  <Tab
                    eventKey="videos"
                    title={
                      <span>
                        <FaVideo style={{ marginRight: '5px' }} /> Videos
                      </span>
                    }
                  >
                    <GridContainer>
                      {[...Array(6)].map((_, index) => (
                        <GridItem key={index}>
                          <video width="100%" controls>
                            <source src={`path_to_video_${index + 1}.mp4`} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <LikeButton variant="outline-primary" size="sm" onClick={() => handleVideoLike(index)}>
                            <FaThumbsUp style={{ marginRight: '5px' }} /> {videoLikes[index]}
                          </LikeButton>
                        </GridItem>
                      ))}
                    </GridContainer>
                  </Tab>
                </Tabs>
              </Card.Body>
            </ProfileCard>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
