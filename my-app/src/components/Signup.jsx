import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import signup from '../assets/Signup-bg.png';
import googleIcon from '../assets/Google-Icon.png';
import fbIcon from '../assets/FB-Icon.png';
import whIcon from '../assets/WH-Icon.png';
import { VendorContext } from '../contexts/VendorContext.jsx';
import OTP from './OTP.jsx';

function Signup() {
  const [showOTP, setShowOTP] = useState(false);
  const { setVendorData } = useContext(VendorContext);
  const navigate = useNavigate();

  // Use controlled components
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignup = () => {
    setVendorData(prev => ({
      ...prev,
      firstName,
      lastName
    }));
    setShowOTP(true);
  };

  return (
    <div className="signup-vendor-card">
      <div className="signup-left-bg" style={{ backgroundImage: `url(${signup})` }}>
        <div className="signup-text-group">
          <h1>Connect with vendors</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
        </div>
      </div>

      <div className="signup-vendor-info">
        <div className="signup-title-group">
          <h1>Join as a Vendor</h1>
          <p>Create an account to join as a Vendor</p>
        </div>

        <label className="signup-label1">First Name</label>
        <input
          className="signup-simple-input"
          placeholder="Example: Henna"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="signup-label1">Last Name</label>
        <input
          className="signup-simple-input"
          placeholder="Example: Adam"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="signup-label1">Email</label>
        <input className="signup-simple-input" placeholder="Henna_Adam@gmail.com" />

        <div className="signup-password-container">
          <label className="signup-label1">Password</label>
          <label className="signup-label2">Forgot Password?</label>
        </div>

        <input className="signup-simple-input" placeholder="••••••••••" type="password" />

        <label className="signup-label3">
          <input type="checkbox" />
          I accept terms and conditions
        </label>

        <button className="signup-next-button" onClick={handleSignup}>
          SignUp
        </button>

        <label className="signup-label4">
          Already have an account? <span>Login</span><br />
        </label>

        <div className="signup-social-icons">
          <div className="signup-divider-with-text">
            <span className="signup-line"></span>
            <span className="signup-or-text">or</span>
            <span className="signup-line"></span>
          </div>

          <span className="signup-login-text">Login with Social Apps</span>

          <div className="signup-social-icons-icons">
            <img src={fbIcon} alt="fb-icon" />
            <img src={googleIcon} alt="google-icon" />
            <img src={whIcon} alt="whatsapp-icon" />
          </div>
        </div>
      </div>

      {showOTP && <OTP onClose={() => setShowOTP(false)} />}
    </div>
  );
}

export default Signup;
