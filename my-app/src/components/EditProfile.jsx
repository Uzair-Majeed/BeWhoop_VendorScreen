import { useContext, useState, useRef } from 'react';
import { VendorContext } from '../contexts/VendorContext.jsx';
import './EditProfile.css';
import Header from './Header';
import Sidebar from './Sidebar';
import defaultImage from '../assets/UploadPic.png';
import FileUploadSplit from './FileUpload.jsx';

function EditProfile() {
  const { vendorData, setVendorData } = useContext(VendorContext);
  const [error, setError] = useState('');

  const [description, setDescription] = useState(vendorData?.description || '');
  const [minPrice, setMinPrice] = useState(vendorData?.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(vendorData?.maxPrice || '');
  const [location, setLocation] = useState(vendorData?.location || '');
  const [googleMap, setGoogleMap] = useState(vendorData?.googleMap || '');
  const [profilePreview, setProfilePreview] = useState(vendorData?.profileImage || null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [eventInput, setEventInput] = useState('');
  const [events, setEvents] = useState(
    typeof vendorData?.services === 'string'
      ? vendorData.services.split(',')
      : Array.isArray(vendorData?.services)
      ? vendorData.services
      : []
  );
  const [saved, setSaved] = useState(false);

  const fileInputRef = useRef(null);

  const availableEvents = ['Photography', 'Decoration', 'Catering'];

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
      setSaved(false);
    }
  };

  const handleAddEvent = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const newService = eventInput.trim().replace(',', '');
      if (newService && !events.includes(newService)) {
        setEvents([...events, newService]);
        setSaved(false);
      }
      setEventInput('');
    }
  };

  const removeEvent = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
    setSaved(false);
  };

  const addAvailableEvent = (eventName) => {
    if (!events.includes(eventName)) {
      setEvents([...events, eventName]);
      setSaved(false);
    }
  };

const handleSave = async () => {
  const updatedData = {
    ...vendorData,
    description: description || vendorData.description,
    minPrice: minPrice || vendorData.minPrice,
    maxPrice: maxPrice || vendorData.maxPrice,
    location: location || vendorData.location,
    mapLink: googleMap || vendorData.mapLink,
    services: events.length > 0 ? events : vendorData.services,
  };

  // Validate required fields
  if (!updatedData.firstName || !updatedData.lastName) {
    return setError('Full name is required.');
  }
  if (!updatedData.email) {
    return setError('Email is required.');
  }
  if (!updatedData.minPrice || !updatedData.maxPrice) {
    return setError('Price range must be filled.');
  }
  if (!updatedData.location) {
    return setError('City is required.');
  }
  if (!updatedData.mapLink) {
    return setError('Google Map link is required.');
  }
  if (!updatedData.services || updatedData.services.length === 0) {
    return setError('At least one service must be selected.');
  }

  setError('');
  setVendorData(updatedData);

  const payload = {
    fullName: `${updatedData.firstName} ${updatedData.lastName}`,
    email: updatedData.email,
    phone: updatedData.phone || '0000000000',
    services: updatedData.services,
    budgetRange: `$${updatedData.minPrice}-$${updatedData.maxPrice}`,
    city: updatedData.location,
    socialProof: updatedData.mapLink || '',
  };

  console.log('Final Payload:', payload);

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${baseURL}/onboarding/vendors`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log(result)

    if (result.status === 'success') {
      console.log(result.message);
      setSaved(true);
    } else {
      setError(result.message || 'Error saving data.');
      console.error('Error saving:', result.message);
    }
  } catch (error) {
    console.error('API request failed:', error);
    setError('Something went wrong. Please try again.');
  }
};



  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="edit-profile-scrollable">
          <div className="form-wrapper">
            <label className="label1">Edit Profile</label>
            <div
              className="upload-circle"
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

            <label className="label2">Edit Description</label>
            <textarea
              className="description-input"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setSaved(false);
              }}
              placeholder="Write here..."
            />

            <label className="label1">What type of Services do you provide?</label>
            <div className="text-container">
              <input
                className="events"
                placeholder="Type and Press (,) to add Services..."
                value={eventInput}
                onChange={(e) => setEventInput(e.target.value)}
                onKeyDown={handleAddEvent}
              />
              <div className="eventsAdded">
                {events.map((ev, index) => (
                  <span key={index} className="event-chip">
                    {ev}
                    <button className="remove-btn" onClick={() => removeEvent(index)}>×</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="available-events">
              {availableEvents.map((ev, index) => (
                <span key={index} className="add-chip" onClick={() => addAvailableEvent(ev)}>
                  {ev} +
                </span>
              ))}
            </div>

            <label className="label3">Type Your Location</label>
            <select
              className="select-input"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setSaved(false);
              }}
            >
              <option value="">Select City</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Quetta">Quetta</option>
            </select>

            <input
              className="simple-input"
              value={googleMap}
              onChange={(e) => {
                setGoogleMap(e.target.value);
                setSaved(false);
              }}
              placeholder="Enter Google Map link here."
            />

            <label className="label3">Price Range</label>
            <div className="price-range">
              <input
                className="input-range"
                placeholder="Minimum"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setSaved(false);
                }}
              />
              <input
                className="input-range"
                placeholder="Maximum"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setSaved(false);
                }}
              />
            </div>

            <label className="label1">Add Portfolio</label>
          </div>

          <div className="upload">
            <FileUploadSplit />
          </div>

        {error && <p className="error-fields">{error}</p>}
          <div className="save-button-container">
            <button
              className="save-button"
              onClick={handleSave}
              disabled={saved}
              style={{ backgroundColor: saved ? '#ccc' : '' }}
            >
              {saved ? 'Saved' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
