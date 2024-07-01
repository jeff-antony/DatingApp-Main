import Container from 'react-bootstrap/Container';
import {  Row, Nav, Tab, Card, Navbar,Col } from 'react-bootstrap';

const DashboardNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg"  sticky="top" expanded={true}>
    <Container fluid >
      <Navbar.Brand href="/dashboard">Dating App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="/edit-profile" style={{textDecoration: 'none'}}>Mark Otto</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default DashboardNavbar;