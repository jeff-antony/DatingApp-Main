import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormControl } from 'react-bootstrap';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { DashboardNavbar, Chat } from '../components';
import styled from 'styled-components';
import axios from 'axios';

const Sidebar = styled(Col)`
  border-right: 1px solid #e9ecef;
  padding: 0;
`;

const ChatContainer = styled(Col)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const FriendListItem = styled.div`
  cursor: pointer;
  padding: 10px;
  &:hover {
    background-color: #e9ecef;
    border-radius: 4px;
  }
`;

const ChatLayout = () => {
  const { userId } = useParams();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const newSocket = io('http://localhost:5100');
    setSocket(newSocket);

    newSocket.emit('joinRoom', storedUserId);

    newSocket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.close();
  }, [userId]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:5100/api/friend-request/${storedUserId}/friends`);
        setFriends(response.data);
        console.log(friends,'friend');
      } catch (error) {
        console.error('Failed to fetch friends', error);
      }
    };

    fetchFriends();
  }, [userId]);

  const sendMessage = async (text) => {
    if (selectedFriend) {
      const newMessage = {
        senderId: userId,
        receiverId: selectedFriend.id,
        text: text
      };
      
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('sendMessage', newMessage);
    }
    console.log(selectedFriend.id,'receiverid');
  };

  return (
    <>
      <DashboardNavbar />
      <Container fluid>
        <Row style={{ height: '100vh' }}>
          <Sidebar md={3}>
            <FormControl type="search" placeholder="Search chats" className="mb-3" />
            {Array.isArray(friends) && friends.map(friend => (
              <FriendListItem key={friend.id} onClick={() => setSelectedFriend(friend)}>
                <div className="d-flex align-items-center">
                  <img
                    src={friend.profilePic}
                    alt={friend.displayName}
                    className="rounded-circle me-2"
                    width="50"
                    height="50"
                  />
                  <div>
                    <div>{friend.displayName}</div>
                  </div>
                </div>
              </FriendListItem>
              
            ))}
            
          </Sidebar>
          <ChatContainer md={9}>
            {selectedFriend ? (
              <Chat
                friend={selectedFriend}
                messages={messages}
                onSendMessage={sendMessage}
              />
            ) : (
              <div>Select a friend to start chatting</div>
            )}
          </ChatContainer>
        </Row>
      </Container>
    </>
  );
};

export default ChatLayout;
