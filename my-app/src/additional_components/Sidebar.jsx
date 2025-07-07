import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/BeWhoopLogo.png';
import msgLogo from '../assets/message-outline.png';
import personLogo from '../assets/person-outline.png';
import dot from '../assets/Dot.png';
import settings from '../assets/Settings.png';
import logout from '../assets/Logout.png';
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
          <li className={`nav-item ${isActive('/Messages') ? 'active' : ''}`} onClick={() => navigate('/Messages')}>
            <img src={msgLogo} alt="Messages" className="nav-icon" />
            <a>Messages</a>
          </li>
          <li className={`nav-item ${isActive('/MyProfile') ? 'active' : ''}`} onClick={() => navigate('/MyProfile')}>
  <img src={personLogo} alt="Person" className="nav-icon" />
  <a>My Profile</a>
</li>
<li className={`nav-item ${isActive('/MyProfile') ? 'active' : ''}`} onClick={() => navigate('/MyProfile')}>
  <img src={dot} alt="Dot" className="dot-icon" />
  <a>View Profile</a>
</li>
          <li className={`nav-item ${isActive('/EditProfile') || isActive('/EditServices') || isActive('/EditPortfolio') ? 'active' : ''}`} onClick={() => navigate('/EditProfile')}>
            <img src={dot} alt="Dot" className="dot-icon" />
            <a>Edit Profile</a>
          </li>
        </ul>
      </div>

      <hr className="sidebar-divider" />

      <div className="nav-links">
        <ul>
          <li className={`nav-item ${isActive('/Settings') ? 'active' : ''}`} onClick={() => navigate('/Settings')}>
            <img src={settings} alt="Settings" className="nav-icon" />
            <a>Settings</a>
          </li>
          <li className={`nav-item ${isActive('/Logout') ? 'active' : ''}`} onClick={() => navigate('/')}>
            <img src={logout} alt="Logout" className="nav-icon" />
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
