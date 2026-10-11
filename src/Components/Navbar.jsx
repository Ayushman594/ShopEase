import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../assets/Images/Logo.png";
import './Navbar.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ShopNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/"><img src={Logo} className="logo" alt="Logo" /><span className="siteName">Shop<span className="text-primary">Ease</span></span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="nav-links" id="basic-navbar-nav">
  <Nav className="gap-5">
    <Nav.Link as={Link} to="/">Home</Nav.Link>

    <Nav.Link as={Link} to="/about">About</Nav.Link>

    <NavDropdown title="Categories" id="basic-nav-dropdown">
      <NavDropdown.Item as={Link} to="/products/category/Kids-clothings">
    Kid's clothings
</NavDropdown.Item>

<NavDropdown.Item as={Link} to="/products/category/Mens-clothings">
    Men's Clothings
</NavDropdown.Item>

<NavDropdown.Item as={Link} to="/products/category/Womens-clothings">
    Women's Clothings
</NavDropdown.Item>

<NavDropdown.Divider />

<NavDropdown.Item as={Link} to="/products/category/Electronics">
    Electronics
</NavDropdown.Item>

<NavDropdown.Item as={Link} to="/products/category/Video-games-toys">
    Video Games & Toys
</NavDropdown.Item>

<NavDropdown.Item as={Link} to="/products/category/Sports">
    Sports
</NavDropdown.Item>

<NavDropdown.Item as={Link} to="/products/category/Groceries">
    Groceries
</NavDropdown.Item>
</NavDropdown>
    <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>

    <button className="btn btn-primary p-1 px-2" onClick={() => navigate('/login')}>
      Login
    </button>

    <button className="btn btn-primary p-1 px-2" onClick={() => navigate('/register')}>
      Register
    </button>
  </Nav>
</Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ShopNavbar;
