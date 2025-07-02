import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './VendorSetup.css';
import karaokeBg from '../assets/Karaoke.png';
import { VendorContext } from '../contexts/VendorContext.jsx';

function VendorSetup() {
  const [eventInput, setEventInput] = useState('');
  const [events, setEvents] = useState([]);
  const [availableEvents, setavailableEvents] = useState([ "Photography","Catering","Videography"]);
  const { vendorData, setVendorData } = useContext(VendorContext);
  const navigate = useNavigate();


  const handleAddEvent = (e) => {
    if (e.key === ',' && eventInput.trim() !== '') {
      e.preventDefault();
      const trimmed = eventInput.trim();
      if (!events.includes(trimmed)) {
        setEvents([...events, trimmed]);
      }
      setEventInput('');
    }
  };

  const removeEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const addAvailableEvent = (eventName) => {
    if (!events.includes(eventName)) {
      setEvents([...events, eventName]);
      setavailableEvents(availableEvents.filter(ev => ev !== eventName));
    }
  };

  return (
    <div className="vendor-card">
      <div className="left-bg" style={{ backgroundImage: `url(${karaokeBg})` }}>
        <div className="text-group">
          <h1>Get A Vendor Profile</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
        </div>
      </div>

      <div className="vendor-info">
        <label className="label1">What type of Services do you provide?</label>
        <div className="text-container">
          <input
            className="events"
            placeholder="Type and Press (,) to add Events..."
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
        <select className="select-input" placeholder="City">
          <option value="City">City</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Lahore">Lahore</option>
          <option value="Karachi">Karachi</option>
          <option value="Peshawar">Peshawar</option>
          <option value="Quetta">Quetta</option>
        </select>

        <input className="simple-input" placeholder="Enter google map link here." />

        <label className="label3">Price Range</label>
        <div className="price-range">
          <input className="input-range" placeholder="Minimum" id="1"/>
          <input className="input-range" placeholder="Maximum" id="2"/>
        </div>

        <button className="next-button" onClick={() => {
          setVendorData(prevData => ({
            ...prevData,
            services: events,
            location: document.querySelector('.select-input').value,
            mapLink: document.querySelector('.simple-input').value,
            minPrice: document.getElementById('1').value,
            maxPrice: document.getElementById('2').value,
          }))
          navigate('/UploadPortfolio')
            }
        }>Next</button>
      </div>
    </div>
  );
}

export default VendorSetup;
