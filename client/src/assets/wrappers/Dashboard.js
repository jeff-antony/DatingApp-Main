import styled from 'styled-components';
import { Col, Button } from 'react-bootstrap';

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

export const MainContent = styled(Col)`
  padding: 20px;
`;

export const ProfileImage = styled.img`
  width: 80%;
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

