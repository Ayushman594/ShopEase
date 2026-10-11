import { Link } from 'react-router-dom'
import './Sidebar.css'
import logo from "../assets/Images/Logo.png"
function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <h3 className="sidebar-title"><img src={logo} alt="Logo" />Shop<span className="text-primary">Ease</span></h3>
        <ul className="sidebar-menu">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/products">Update Products</Link></li>
          <li><Link to="/admin/orders">View Orders</Link></li>
          <li><Link to="/admin/queries">All Queries</Link></li>
          {/* <li><Link to="/admin/settings">Settings</Link></li> */}
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
