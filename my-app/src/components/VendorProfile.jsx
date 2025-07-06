import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { VendorContext } from '../contexts/VendorContext.jsx';
import './VendorProfile.css';
import bg from '../assets/bg-pic.png';
import defaultImage from '../assets/UploadPic.png';

function VendorProfile() {
  const [profilePreview, setProfilePreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { vendorData, setVendorData } = useContext(VendorContext);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);
      setVendorData((prev) => ({
        ...prev,
        profileImageFile: file,
        profileImage: previewUrl,
      }));
    }
  };

  const handleNext = () => {
    const description = document.querySelector('.description-input').value.trim();

    // Error Handling
    if (!vendorData.profileImageFile) {
      setError('Please upload a profile picture.');
      return;
    }

    if (!description) {
      setError('Please enter a short description about your services.');
      return;
    }

    setError('');
    setVendorData((prevData) => ({
      ...prevData,
      description,
    }));

    navigate('/SettingUp');
  };

  return (
    <div className="vendor-card">
      <div className="left-bg" style={{ backgroundImage: `url(${bg})` }}>
        <div className="text-group">
          <h1>Get A Vendor Profile</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
        </div>
      </div>

      <div className="vendor-info">
        <h1>Let's set things up for you.</h1>
        <p>Share your vision, and we'll help make it real.</p>

        <label className="label">Add Profile Photo</label>
        <div
          className="upload-circle"
          onClick={handleUploadClick}
          style={{
            backgroundImage: `url(${profilePreview || defaultImage})`,
          }}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <label className="label2">Add Description</label>
        <textarea className="description-input" placeholder="Write here..." />

        {error && <p className="error-fields">{error}</p>}

        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default VendorProfile;
