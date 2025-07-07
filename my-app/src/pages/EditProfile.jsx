import { useContext, useState, useRef } from 'react';
import { VendorContext } from '../contexts/VendorContext.jsx';
import '../styles/EditProfile.css';
import Header from '../additional_components/Header';
import Sidebar from '../additional_components/Sidebar';
import defaultImage from '../assets/UploadPic.png';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const { vendorData, setVendorData } = useContext(VendorContext);
  const [error, setError] = useState('');

  const [description, setDescription] = useState(vendorData?.description || '');
  const [profilePreview, setProfilePreview] = useState(vendorData?.profileImage || null);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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

  const handleSave = async () => {
    const updatedData = {
      ...vendorData,
      description: description || vendorData.description,
    };

    setError('');
    setVendorData(updatedData);
    navigate('/EditServices');
  };

  return (
    <div className="editprofile-dashboard-container">
      <Sidebar />
      <div className="editprofile-main-content">
        <Header />
        <div className="editprofile-scrollable">
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
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write here..."
            />
          </div>

          {error && <p className="editprofile-error-fields">{error}</p>}

          <div className="editprofile-save-button-container">
            <button className="editprofile-save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;