import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import signup from '../assets/Signup-bg.png';
import googleIcon from '../assets/Google-Icon.png';
import fbIcon from '../assets/FB-Icon.png';
import whIcon from '../assets/WH-Icon.png';
import { VendorContext } from '../contexts/VendorContext.jsx';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const { setVendorData } = useContext(VendorContext);
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = () => {
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill out all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (!termsAccepted) {
      setError('You must accept the terms and conditions');
    return;
    }

    const FullName=firstName + lastName;
    setError('');
    setVendorData(prev => ({
      ...prev,
      firstName,
      lastName,
      email,
      password
    }));
    navigate('/VendorProfile'); 
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
        <input
          className="signup-simple-input"
          placeholder="Henna_Adam@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="signup-password-container">
          <label className="signup-label1">Password</label>
          <label className="signup-label2">Forgot Password?</label>
        </div>

        <input
          className="signup-simple-input"
          placeholder="••••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="signup-label3">
          <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}
          /> I accept terms and conditions
        </label>

        
        {error && <p className="error-fields">{error}</p>}

        <button className="signup-next-button" onClick={handleSignup}>
          SignUp
        </button>


        <label className="signup-label4">
          Already have an account? <span>Signup</span><br />
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
    </div>
  );
}

export default Signup;
