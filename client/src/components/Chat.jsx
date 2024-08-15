import React, { useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { FaPhone, FaVideo, FaEllipsisV } from 'react-icons/fa';
import styled from 'styled-components';

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MessageContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const Message = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: ${({ isSender }) => (isSender ? '#dcf8c6' : '#fff')};
  align-self: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')};
`;

const ChatInputContainer = styled.div`
  display: flex;
  input {
    flex-grow: 1;
    padding: 10px;
    margin-right: 10px;
  }
  button {
    padding: 10px 20px;
  }
`;

const Chat = ({ friend, messages, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <>
      <ChatHeader>
        <div className="d-flex align-items-center">
          <img
            src="https://via.placeholder.com/50"
            alt={friend.username}
            className="rounded-circle me-2"
          />
          <div>
            <div>{friend.username}</div>
            <div className="text-muted">Active 20m ago</div>
          </div>
        </div>
        <div>
          <Button variant="link" className="p-0 me-2 text-black"><FaPhone /></Button>
          <Button variant="link" className="p-0 me-2 text-black" ><FaVideo /></Button>
          <Button variant="link" className="p-0 text-black"><FaEllipsisV /></Button>
        </div>
      </ChatHeader>
      <MessageContainer>
        {messages.map((msg, index) => (
          <Message key={index} isSender={msg.senderId === friend.id}>
            {msg.text}
          </Message>
        ))}
      </MessageContainer>
      <ChatInputContainer>
        <FormControl 
          placeholder="Enter your message"
          aria-label="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="outline-secondary dark" onClick={handleSendMessage}>Send</Button>
      </ChatInputContainer>
    </>
  );
};

export default Chat;
