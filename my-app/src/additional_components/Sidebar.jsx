import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/BeWhoopLogo.png';
import { FaEdit } from "react-icons/fa";
import {
  FaMessage,
  FaRegUser,
  FaGears,
  FaUnlock,
} from 'react-icons/fa6'; 
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
      </div>

      <div className="nav-links">
        <ul>
          

          <li className={`nav-item ${isActive('/EditPortfolio') || isActive('/EditProfile') || isActive('/EditServices') ? 'active' : ''}`} onClick={() => navigate('/EditProfile')}>
            <FaEdit className="nav-icon" />
            <a>Edit Profile</a>
          </li>


          <li className={`nav-item ${isActive('/Messages') ? 'active' : ''}`} onClick={() => navigate('/Messages')}>
            <FaMessage className="nav-icon" />
            <a>Messages</a>
          </li>

          <hr className="sidebar-divider" />


          <li className={`nav-item ${isActive('/MyProfile') ? 'active' : ''}`} onClick={() => navigate('/MyProfile')}>
            <FaRegUser className="nav-icon" />
            <a>My Profile</a>
          </li>

          <li className={`nav-item ${isActive('/Settings') ? 'active' : ''}`} onClick={() => navigate('/Settings')}>
            <FaGears className="nav-icon" />
            <a>Settings</a>
          </li>

          <li className={`nav-item`} onClick={() => navigate('/')}>
            <FaUnlock className="nav-icon" />
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
