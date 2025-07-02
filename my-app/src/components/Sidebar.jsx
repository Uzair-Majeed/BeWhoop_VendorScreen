import logo from '../assets/BeWhoopLogo.png';
import msgLogo from '../assets/message-outline.png';
import personLogo from '../assets/person-outline.png';
import dot from '../assets/Dot.png';
import settings from '../assets/Settings.png';
import logout from '../assets/Logout.png';
import './Sidebar.css';

function Sidebar(){
    return (
        <aside className="sidebar">
            <div className="logo">
                <img src={logo} alt="Company Logo"></img>
            </div>

            <div className="nav-links">
                <ul>
                    <li className="nav-item">
                        <img src={msgLogo} alt="Messages" className="nav-icon" />
                        <a href="/Messages">Messages</a>
                    </li>
                    <li className="nav-item">
                        <img src={personLogo} alt="Person" className="nav-icon" />
                        <a href="/MyProfile">My Profile</a>
                    </li>
                    <li className="nav-item">
                        <img src={dot} alt="Dot" className="dot-icon" />
                        <a href="/ViewProfile">View Profile</a>
                    </li>

                    <li className="nav-item">
                        <img src={dot} alt="Dot" className="dot-icon" />
                        <a href="/EditProfile">Edit Profile</a>
                    </li>

                </ul>
            </div>

            <hr className="sidebar-divider" /> 

            <div className="nav-links">
                <ul>
                    <li className="nav-item">
                        <img src={settings} alt="Settings" className="nav-icon" />
                        <a href="/Settings">Settings</a>
                    </li>
                    <li className="nav-item">
                        <img src={logout} alt="Logout" className="nav-icon" />
                        <a href="/Logout">Logout</a>
                    </li>

                </ul>
            </div>

        </aside>


    );
}

export default Sidebar;