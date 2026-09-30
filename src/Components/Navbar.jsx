import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../assets/Images/Logo.png";
import './Navbar.css'
function ShopNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home"><img src={Logo} className="logo" alt="Logo" /><span className="siteName">ShopEase</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="nav-links" id="basic-navbar-nav">
  <Nav className="gap-5">
    <Nav.Link href="#home">Home</Nav.Link>

    <Nav.Link href="#link">About</Nav.Link>

    <NavDropdown title="Categories" id="basic-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">
        Kid's clothings
      </NavDropdown.Item>

      <NavDropdown.Item href="#action/3.2">
        Men's Clothings
      </NavDropdown.Item>

      <NavDropdown.Item href="#action/3.3">
        Women's Clothings
      </NavDropdown.Item>

      <NavDropdown.Divider />

      <NavDropdown.Item href="#action/3.4">
        Electronics
      </NavDropdown.Item>

      <NavDropdown.Item href="#action/3.5">
        Video Games & Toys
      </NavDropdown.Item>

      <NavDropdown.Item href="#action/3.6">
        Sports
      </NavDropdown.Item>

      <NavDropdown.Item href="#action/3.7">
        Fitness
      </NavDropdown.Item>

      <NavDropdown.Item href="#action/3.8">
        Groceries
      </NavDropdown.Item>
    </NavDropdown>

    <Nav.Link href="#link">Contact us</Nav.Link>

    <button className="btn btn-primary p-1 px-2">
      Login
    </button>

    <button className="btn btn-primary p-1 px-2">
      Register
    </button>
  </Nav>
</Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ShopNavbar;
