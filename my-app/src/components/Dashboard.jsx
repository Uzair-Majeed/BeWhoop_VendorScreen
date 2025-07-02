import { useContext } from 'react';
import { VendorContext } from '../contexts/VendorContext.jsx';
import './Dashboard.css';
import Header from './Header';
import Sidebar from './Sidebar';

function Dashboard() {
  const { vendorData } = useContext(VendorContext);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="dashboard-body">

          {vendorData?.profileImage && (
            <img
              src={vendorData.profileImage}
              alt="Profile"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #ccc'
              }}
            />
          )}

          {!vendorData?.profileImage && (
            <p>No profile image uploaded.</p>
          )}
          
          <h2>Vendor Name!</h2>
          <p>Event Organizer</p>
        </div>

          <div className="info-block">
            <h3>Price Range : ${vendorData.minPrice || '-'} - ${vendorData.maxPrice || '-'}</h3>
            <hr className="divider"/>
            <h3>Location : {vendorData.location || '-'}</h3>
          </div>

          <div className="dashboard-body">
          
            <p>{vendorData?.description || 'Description'}!</p>
          </div>



          <div className="portfolio-grid">
              {vendorData.portfolio?.map((file, index) => (
                file.type.startsWith('image/') ? (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`portfolio-${index}`}
                    className="portfolio-image"
                  />
                ) : (
                  <div key={index} className="file-box">
                    {file.name}
                  </div>
                )
              ))}
            </div>

        </div>
      </div>
  );
}
export default Dashboard;