import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './VendorSetup.css';
import karaokeBg from '../assets/Karaoke.png';
import { VendorContext } from '../contexts/VendorContext.jsx';

function VendorSetup() {
  const [eventInput, setEventInput] = useState('');
  const [events, setEvents] = useState([]);

  //this is hardcoded for now,but if there is a recommendation system,u can fetch that later
  const [availableEvents, setavailableEvents] = useState(["Photography", "Catering", "Videography"]);
  const [error, setError] = useState('');
  const { vendorData, setVendorData } = useContext(VendorContext);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  //function to add services or events in the text box
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

  //function to remove services or events in the text box
  const removeEvent = (index) => {
    const removedEvent = events[index];
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);

    const originalAvailable = ["Photography", "Catering", "Videography"];
    if (originalAvailable.includes(removedEvent)) {
      setavailableEvents(prev => [...prev, removedEvent]);
    }
  };

  const addAvailableEvent = (eventName) => {
    if (!events.includes(eventName)) {
      setEvents([...events, eventName]);
      setavailableEvents(availableEvents.filter(ev => ev !== eventName));
    }
    
  };

  const handleNext = async () => {
    const selectedCity = document.querySelector('.select-input').value;
    const mapLink = document.querySelector('.simple-input').value;
    const minPrice = document.getElementById('1').value;
    const maxPrice = document.getElementById('2').value;

    // Input Validation
    if (events.length === 0) return setError('Please add at least one service you provide.');
    if (!mapLink.trim()) return setError('Please provide your Google Maps location link.');
    if (selectedCity === 'City') return setError('Please select a valid city.');
    if (!minPrice || !maxPrice || isNaN(minPrice) || isNaN(maxPrice)) return setError('Please enter valid numbers for price range.');
    if (parseFloat(minPrice) > parseFloat(maxPrice)) return setError('Minimum price cannot be greater than maximum price.');

    setError('');
    const budgetRange = `$${minPrice}-$${maxPrice}`;

    setVendorData((prevData) => ({
      ...prevData,
      services: events,
      mapLink,
      budgetRange,
      minPrice,
      maxPrice,
      location: selectedCity
    }));

    try {
      const response = await fetch(`${baseURL}/onboarding/vendors`, { //change the baseURL when db side is done
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${vendorData.firstName} ${vendorData.lastName}`,
          email: vendorData.email,
          phone: vendorData.phone || '0000000000', //optional as there is no field to take phone input in the design
          password: vendorData.password,
          services: events,
          budgetRange,
          city: selectedCity,
          socialProof: vendorData.mapLink || '',  //optional as there is no field to take social proof input in the design
        }),
      });

      const result = await response.json();
console.log(result);

if (result.status === 'success') {
  console.log('Vendor registered:', result);

  if (result.token) {
    localStorage.setItem('token', result.token); 
  }

  navigate('/UploadPortfolio');
} else {
     const message = result.error || 'Registration failed';
      setError(message);

  if (
    message.toLowerCase().includes('already exists') ||
    message.toLowerCase().includes('duplicate') ||
    message.toLowerCase().includes('already in use')
  ) {
    setError('Vendor already exists. Redirecting to signup...');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }
}
    } catch (err) {
      console.error('API error:', err);
      setError('Something went wrong. Please try again.');
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
        <select className="select-input" defaultValue="City">
          <option value="City">City</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Lahore">Lahore</option>
          <option value="Karachi">Karachi</option>
          <option value="Peshawar">Peshawar</option>
          <option value="Quetta">Quetta</option>
        </select>

        <input className="simple-input" placeholder="Enter Google Map link here." />

        <label className="label3">Price Range</label>
        <div className="price-range">
          <input className="input-range" placeholder="Minimum" id="1" />
          <input className="input-range" placeholder="Maximum" id="2" />
        </div>

        {error && <p className="error-fields">{error}</p>}

        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default VendorSetup;
