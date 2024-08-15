import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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

const ProfilePage = () => {
  const { id:  receiverId } = useParams();
  const [profile, setProfile] = useState({});
  const [likes, setLikes] = useState(0);
  const [key, setKey] = useState('photos');
  const [requestSent, setRequestSent] = useState(false);
  const [photoLikes, setPhotoLikes] = useState(Array(6).fill(0));
  const [videoLikes, setVideoLikes] = useState(Array(6).fill(0));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5100/api/dashboard/get-userProfile/${receiverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);

        // Fetch photos data
        const photosResponse = await axios.get(`http://localhost:5100/api/users/${receiverId}/photos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPhotos(photosResponse.data);
        // Initialize photo likes array with zeros
        setPhotoLikes(new Array(photosResponse.data.length).fill(0));
        setVideoLikes(new Array(profileResponse.data.videos?.length || 0).fill(0));
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, [receiverId]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleRequest = async () => {
    try {
      const token = localStorage.getItem('token'); // Or however you store the token
      const senderId = localStorage.getItem('userId')
      const payload = { senderId, receiverId };
      console.log('Payload:', payload)
      
      const response = await axios.post(
        'http://localhost:5100/api/friend-request/send',
        payload,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(senderId,'sender');
      console.log(receiverId,'receiver');
      if (response.status === 201) {
        setRequestSent(true);
      }
    } catch (error) {
      console.error('Failed to send friend request', error);
    }
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
          <Col md={2}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link href="/dashboard">Home</Nav.Link>
              <Nav.Link href="/browse">Browse</Nav.Link>
              <Nav.Link href="/chats">Messages</Nav.Link>
              <Nav.Link href="/notifications">Notifications</Nav.Link>
              <Nav.Link href="/personalized-picks">Personalized Picks</Nav.Link>
              <Nav.Link href="/">Log Out</Nav.Link>
            </Nav>
          </Col>

          <Col md={8} className="mx-auto">
            <ProfileCard>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <ProfilePhoto src={profile.profilePic} alt="Profile Photo" />
                  </Col>
                  <Col md={8}>
                    <h4>{profile.firstName} {profile.lastName}</h4>
                    <p>{profile.state}</p>
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
                    <p>{profile.bio}</p>
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
                      {profile.photos && profile.photos.map((photo, index) => (
                        <GridItem key={index}>
                          <img src={photo} alt={`Photo ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                          <LikeButton variant="outline-primary" size="sm" className='mt-2' onClick={() => handlePhotoLike(index)}>
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
                      {profile.videos && profile.videos.map((video, index) => (
                        <GridItem key={index}>
                          <video width="100%" controls>
                            <source src={video} type="video/mp4" />
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
