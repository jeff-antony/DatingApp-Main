import styled from 'styled-components';
import { Col, Button, InputGroup } from 'react-bootstrap';


export const Sidebar = styled(Col)`
  background-color: #f8f9fa;
  height: 100vh;
  padding: 20px;
  border-right: 1px solid #dee2e6;
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

export const MainContent = styled(Col)`
  padding: 20px;
  position: relative;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

export const ProfileButton = styled(Button)`
  background-color: #000;
  border: none;
  &:hover {
    background-color: #333;
  }
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const ChatContainer = styled(Col)`
  padding: 20px;
  border-right: 1px solid #dee2e6;
  height: 100vh;
  overflow-y: auto;
`;

export const MessageContainer = styled(Col)`
  padding: 20px;
  height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const Message = styled.div`
  background-color: ${props => (props.isSender ? '#000' : '#e9ecef')};
  color: ${props => (props.isSender ? '#fff' : '#000')};
  padding: 10px 15px;
  border-radius: 20px;
  margin: 5px 0;
  align-self: ${props => (props.isSender ? 'flex-end' : 'flex-start')};
`;

export const ChatInputContainer = styled(InputGroup)`
  position: auto;
  bottom: 20px;
  width: calc(100% - 40px);
`;

export const ChatSidebar = styled(Col)`
  background-color: #f8f9fa;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
`;

// export const Button = styled(Button)`
// background-color: #000;
//   border: none;
//   &:hover {
//     background-color: #333;
//   }
// `