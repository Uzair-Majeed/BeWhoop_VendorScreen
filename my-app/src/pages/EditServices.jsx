import { useContext, useState, useRef } from 'react';
import { VendorContext } from '../contexts/VendorContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfile.css';
import Header from '../additional_components/Header';
import Sidebar from '../additional_components/Sidebar';
import mapImage from '../assets/mapImage.png'

function EditServices() {
  const { vendorData, setVendorData } = useContext(VendorContext);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [location, setLocation] = useState(vendorData?.location || '');
  const [googleMap, setGoogleMap] = useState(vendorData?.mapLink || '');
  const [eventInput, setEventInput] = useState('');
  const [events, setEvents] = useState(
    typeof vendorData?.services === 'string'
      ? vendorData.services.split(',')
      : Array.isArray(vendorData?.services)
      ? vendorData.services
      : []
  );

  const availableEvents = ['Photography', 'Decoration', 'Catering'];

  const handleAddEvent = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const newService = eventInput.trim().replace(',', '');
      if (newService && !events.includes(newService)) {
        setEvents([...events, newService]);
      }
      setEventInput('');
    }
  };

  const removeEvent = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
  };

  const addAvailableEvent = (eventName) => {
    if (!events.includes(eventName)) {
      setEvents([...events, eventName]);
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value === '') {
      e.target.setCustomValidity('City cannot be empty if changed.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleGoogleMapChange = (e) => {
    const value = e.target.value;
    setGoogleMap(value);
    if (value === '') {
      e.target.setCustomValidity('Google Map link cannot be empty if changed.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleEventInputChange = (e) => {
    setEventInput(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check HTML5 form validity
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity(); // Show browser validation messages
      return;
    }

    // Validate services
    if (events.length === 0) {
      alert('At least one service must be selected.');
      return;
    }

    const updatedData = {
      ...vendorData,
      location: location || vendorData.location,
      mapLink: googleMap || vendorData.mapLink,
      services: events.length > 0 ? events : vendorData.services,
    };

    // Validate required fields for context update
    if (
      !updatedData.services ||
      updatedData.services.length === 0 ||
      !updatedData.location
    ) {
      alert('Please fill all required fields!');
      return;
    }

    setVendorData(updatedData);
    navigate('/EditPortfolio');
  };

  return (
    <div className="editservices-dashboard-container">
      <Sidebar />
      <div className="editservices-main-content">
        <Header />
        <div className="editservices-scrollable">
          <form ref={formRef} onSubmit={handleSave}>
            <div className="editservices-form-wrapper">
              <label className="editservices-label1">What type of Services do you provide?</label>
              <div className="editservices-text-container">
                <input
                  className="editservices-events"
                  placeholder="Type and Press (,) to add Services..."
                  value={eventInput}
                  onChange={handleEventInputChange}
                  onKeyDown={handleAddEvent}
                />
                <div className="editservices-eventsAdded">
                  {events.map((ev, index) => (
                    <span key={index} className="editservices-event-chip">
                      {ev}
                      <button className="editservices-remove-btn" onClick={() => removeEvent(index)}>×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="editservices-available-events">
                {availableEvents.map((ev, index) => (
                  <span key={index} className="editservices-add-chip" onClick={() => addAvailableEvent(ev)}>
                    {ev} +
                  </span>
                ))}
              </div>

              <label className="editservices-label1">Type Your Location</label>
              <select
                className="editservices-select-input"
                value={location}
                onChange={handleLocationChange}
              >
                <option value="">Select City</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Quetta">Quetta</option>
              </select>

              <input
                className="editservices-simple-input"
                value={googleMap}
                onChange={handleGoogleMapChange}
                placeholder="Enter Google Map link here."
              />
              <img
                src={mapImage}
                alt="Map Preview"
                className="editservices-map-image"
              />
            </div>

            <div className="editservices-save-button-container">
              <button type="submit" className="editservices-save-button">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditServices;