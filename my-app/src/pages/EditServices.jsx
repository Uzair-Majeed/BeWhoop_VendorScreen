import { useContext, useState } from 'react';
import { VendorContext } from '../contexts/VendorContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfile.css';
import Header from '../additional_components/Header';
import Sidebar from '../additional_components/Sidebar';
import mapImage from '../assets/mapImage.png'

function EditServices() {
  const { vendorData, setVendorData } = useContext(VendorContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [location, setLocation] = useState(vendorData?.location || '');
  const [googleMap, setGoogleMap] = useState(vendorData?.googleMap || '');
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

  const handleSave = async () => {
    const updatedData = {
      ...vendorData,
      location: location || vendorData.location,
      mapLink: googleMap || vendorData.mapLink,
      services: events.length > 0 ? events : vendorData.services,
    };

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
    navigate('/EditPortfolio');
  };

  return (
    <div className="editservices-dashboard-container">
      <Sidebar />
      <div className="editservices-main-content">
        <Header />
        <div className="editservices-scrollable">
          <div className="editservices-form-wrapper">
            <label className="editservices-label1">What type of Services do you provide?</label>
            <div className="editservices-text-container">
              <input
                className="editservices-events"
                placeholder="Type and Press (,) to add Services..."
                value={eventInput}
                onChange={(e) => setEventInput(e.target.value)}
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
              onChange={(e) => setLocation(e.target.value)}
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
              onChange={(e) => setGoogleMap(e.target.value)}
              placeholder="Enter Google Map link here."
            />
            <img
                src={mapImage}
                alt="Map Preview"
                className="editservices-map-image"
            />
          </div>

          {error && <p className="editservices-error-fields">{error}</p>}

          <div className="editservices-save-button-container">
            <button className="editservices-save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditServices;