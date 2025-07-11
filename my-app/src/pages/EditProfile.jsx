import { useContext, useState, useRef } from 'react';
import { VendorContext } from '../contexts/VendorContext.jsx';
import '../styles/EditProfile.css';
import Header from '../additional_components/Header';
import Sidebar from '../additional_components/Sidebar';
import defaultImage from '../assets/UploadPic.png';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const { vendorData, setVendorData } = useContext(VendorContext);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const [description, setDescription] = useState(vendorData?.description || '');
  const [profilePreview, setProfilePreview] = useState(vendorData?.profileImage || null);

  const handleUploadClick = () => fileInputRef.current.click();

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

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (value === '') {
      e.target.setCustomValidity('Description cannot be empty if changed.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleSave = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check HTML5 form validity
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity(); // Show browser validation messages
      return;
    }

    // Validate profile picture
    if (!vendorData.profileImage && !profilePreview) {
      alert('Please select a profile picture.');
      return;
    }

    const updatedData = {
      ...vendorData,
      description: description || vendorData.description,
    };

    setVendorData(updatedData);
    navigate('/EditServices');
  };

  return (
    <div className="editprofile-dashboard-container">
      <Sidebar />
      <div className="editprofile-main-content">
        <Header />
        <div className="editprofile-scrollable">
          <form ref={formRef} onSubmit={handleSave}>
            <div className="editprofile-form-wrapper">
              <label className="editprofile-label1">Edit Profile</label>
              <div
                className="editprofile-upload-circle"
                onClick={handleUploadClick}
                style={{ backgroundImage: `url(${profilePreview || defaultImage})` }}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>

              <label className="editprofile-label2">Edit Description</label>
              <textarea
                className="editprofile-description-input"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Write here..."
              />
            </div>

            <div className="editprofile-save-button-container">
              <button type="submit" className="editprofile-save-button">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;