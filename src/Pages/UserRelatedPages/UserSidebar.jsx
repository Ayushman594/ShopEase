import { Link } from 'react-router-dom'

import logo from "../../assets/Images/Logo.png"
function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <h3 className="sidebar-title"><img src={logo} alt="Logo" />Shop<span className="text-primary">Ease</span></h3>
        <ul className="sidebar-menu">
          <li><Link to="/user/dashboard">Dashboard</Link></li>
          <li><Link to="/user/products">View Products</Link></li>
          <li><Link to="/user/cart">My Cart</Link></li>
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar