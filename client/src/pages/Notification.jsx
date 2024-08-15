import React from "react";
import { useState, useEffect } from "react";

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
  Spinner,
} from "react-bootstrap";

import {
  Sidebar,
  SidebarLink,
  MainContent,
} from "../assets/wrappers/Dashboard";
import { useParams } from "react-router-dom";
import ReceivedRequest from "./Activities/RecievedRequest/ReceivedRequest";

const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [requestFromUserData, setRequestFromUserData] = useState([]);
  const { userId } = useParams();
  console.log("userId", userId);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        //const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        console.log(`Fetching friend requests for user ID: ${userId}`);

        const response = await axios.get(
          `http://localhost:5100/api/friend-request/requests/${userId}`,
          {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
          }
        );

        setRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch friend requests", error);
      }
    };

    fetchFriendRequests();
  }, [userId]);

  const updateRequests = (requestId) => {
    setRequests((prevRequests) => prevRequests.filter(request => request._id !== requestId));
    if (requests.length === 1) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500); 
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/dashboard">Dating App</Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Sidebar md={2}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <SidebarLink href="/dashboard">Home</SidebarLink>
              <SidebarLink href="/browse">Browse</SidebarLink>
              <SidebarLink href="/chats">Messages</SidebarLink>
              <SidebarLink href={`/notifications/${userId}`}>
                Notifications
              </SidebarLink>
              {/* <Link to={`/notifications/${userId}`}>Notifications</Link> */}
              <SidebarLink href="/personalized-picks">
                Personalized Picks
              </SidebarLink>
              <SidebarLink href="/">Log Out</SidebarLink>
            </Nav>
          </Sidebar>
          <MainContent md={10}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="request">
              <Row>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="request">Request</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="accepted">Accepted</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="pending">Pending</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="rejected">Rejected</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Row>
              <Row>
                <Tab.Content>
                  <Tab.Pane eventKey="request">
                    {loading ? (
                      <Spinner animation="grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      <>
                        <h5>Friend Requests</h5>
                        {requests.length > 0 ? (
                          requests.map((request, index) => (
                            <ReceivedRequest
                              key={index}
                              fromIDData={request}
                              currentUser={userId}
                              setLoading={setLoading}
                              updateRequests={updateRequests}
                            />
                          ))
                        ) : (
                          <p>No friend requests</p>
                        )}
                      </>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Row>
            </Tab.Container>
          </MainContent>
        </Row>
      </Container>
    </>
  );
};

export default Notification;
