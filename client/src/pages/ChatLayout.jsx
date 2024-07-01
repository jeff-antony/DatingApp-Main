import React from 'react'
import { Container, Row, FormControl,Button } from 'react-bootstrap';
import { FaPhone, FaVideo, FaEllipsisV, FaSearch } from 'react-icons/fa';
import { Sidebar,MainContent,
    ChatContainer,
    MessageContainer,
    Message,
    ChatInputContainer,
    ChatSidebar } from '../assets/wrappers/ChatLayout';
    import avatar1 from '../assets/images/avatar1.jpg';
    import { DashboardNavbar } from '../components';

const ChatLayout = () => {
  return (
    <>
    <DashboardNavbar/>
    
    <Container fluid>
      <Row>
        <Sidebar md={2}>
          <FormControl
            type="search"
            placeholder="Search chats"
            className="mb-3"
          />
          <div>
            {/* List of Chats */}
            {['Helena Hills', 'Mark Rojas',
              'Mom'].map((name, index) => (
              <div className="d-flex align-items-center mb-3" key={index}>
                <img
                  src={`https://via.placeholder.com/50?text=${name.charAt(0)}`}
                  alt={name}
                  className="rounded-circle me-2"
                />
                <div>
                  <div>{name}</div>
                  <div className="text-muted">Will head to the Help Center...</div>
                </div>
              </div>
            ))}
          </div>
        </Sidebar>
        <ChatContainer md={7}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <img
                src="https://via.placeholder.com/50"
                alt="Helena Hills"
                className="rounded-circle me-2"
              />
              <div>
                <div>Helena Hills</div>
                <div className="text-muted">Active 20m ago</div>
              </div>
            </div>
            <div>
              <Button variant="link" className="p-0 me-2 text-black"><FaPhone /></Button>
              <Button variant="link" className="p-0 me-2 text-black" ><FaVideo /></Button>
              <Button variant="link" className="p-0 text-black"><FaEllipsisV /></Button>
            </div>
          </div>
          <MessageContainer>
            <div className="text-center text-muted my-3">Nov 30, 2023, 9:41 AM</div>
            <Message isSender={true}>This is the main chat template</Message>
            <Message isSender={false}>Oh?</Message>
            <Message isSender={false}>Cool</Message>
            <Message isSender={false}>How does it work?</Message>
            <Message isSender={true}>Simple</Message>
            <Message isSender={true}>You just edit any text to type in the conversation you want to show, and delete any bubbles you don’t want to use</Message>
            <Message isSender={true}>Boom</Message>
            <Message isSender={false}>Hmmm</Message>
            <Message isSender={false}>I think I get it</Message>
            <Message isSender={false}>Will head to the Help Center if I have more questions tho</Message>
          </MessageContainer>
          <ChatInputContainer>
            <FormControl 
              placeholder="Enter your message"
              aria-label="Enter your message"
            />
            <Button variant="outline-secondary dark">Send</Button>
          </ChatInputContainer>
        </ChatContainer>
        {/* <ChatSidebar md={3}>
          <div className="d-flex align-items-center mb-3">
            <img
              src="https://via.placeholder.com/50"
              alt="Helena Hills"
              className="rounded-circle me-2"
            />
            <div>
              <div>Helena</div>
              <div className="text-muted">Active 20m ago</div>
            </div>
          </div>
          <Button variant="dark" className="w-100 mb-3">View profile</Button>
          <div className="d-flex flex-column">
            <Button variant="dark" className="text-start"><FaSearch className="me-2" />Search chat</Button>
            <br></br>
            <Button variant="dark" className="text-start"><FaEllipsisV className="me-2" />Sent images</Button>
            <br></br>
            <Button variant="dark" className="text-start"><FaEllipsisV className="me-2" />More options</Button>
          </div>
        </ChatSidebar> */}
      </Row>
    </Container>
    </>
  )
}

export default ChatLayout