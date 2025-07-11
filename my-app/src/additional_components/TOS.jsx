import './TOS.css';

function TOS({ onClose }) {
  return (
    <div className="tos-overlay">
      <div className="tos-modal">
        <h2>Terms and Conditions</h2>
        <p>Please read the terms below to continue.</p>
        <div className="tos-content">
          <h3>1. Introduction</h3>
          <p>Welcome to our platform. By using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.</p>
          
          <h3>2. User Responsibilities</h3>
          <p>You agree to provide accurate information during registration and to use the platform in accordance with all applicable laws and regulations. You are responsible for maintaining the confidentiality of your account credentials.</p>
          
          <h3>3. Vendor Services</h3>
          <p>As a vendor, you agree to deliver services as described in your profile and to adhere to agreed-upon terms with clients. Any disputes must be resolved promptly and professionally.</p>
          
          <h3>4. Payment Terms</h3>
          <p>All payments for services will be processed through our platform. You agree to the applicable fees and payment schedules outlined in your vendor agreement.</p>
          
          <h3>5. Limitation of Liability</h3>
          <p>Our platform is not liable for any damages arising from the use of our services, including but not limited to direct, indirect, or consequential damages.</p>
          
          <h3>6. Termination</h3>
          <p>We reserve the right to terminate or suspend your account for violations of these terms, including fraudulent activity or failure to meet service standards.</p>
          
          <h3>7. Changes to Terms</h3>
          <p>We may update these terms periodically. Continued use of the platform constitutes acceptance of the updated terms.</p>
        </div>
        <button className="tos-okay" onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  );
}

export default TOS;