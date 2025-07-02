import { useState, useRef ,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadPortfolio.css';
import Bg from '../assets/UploadPortfolio.png';
import FileUpload from './FileUpload.jsx';
import Trash from '../assets/Trash.png';
import { VendorContext } from '../contexts/VendorContext.jsx';

function UpdatePortfolio() {
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const { vendorData, setVendorData } = useContext(VendorContext);
  const navigate = useNavigate();

  const handleUploadFront = (e) => {
    const file = e.target.files[0];
    if (file) setCnicFront(file);
    e.target.value = ''; 
  };

  const handleUploadBack = (e) => {
    const file = e.target.files[0];
    if (file) setCnicBack(file);
    e.target.value = ''; 
  };

  const triggerFrontUpload = () => frontRef.current.click();
  const triggerBackUpload = () => backRef.current.click();

  return (
    <div className="vendor-card">
      <div className="left-bg" style={{ backgroundImage: `url(${Bg})` }}>
        <div className="text-group">
          <h1>Upload Portfolio</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
        </div>
      </div>

      <div className="vendor-info">
        <label className="label1">Add Portfolio</label>
        <FileUpload />

        <label className="label1">Add Your CNIC</label>
        <div className="CNIC-upload">
          <div className="cnic-buttons">
            <div className="upload-group">
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                ref={frontRef}
                style={{ display: 'none' }}
                onChange={handleUploadFront}
              />
              <button className="upload-button" onClick={triggerFrontUpload}>Upload Front</button>
            </div>

            <div className="upload-group">
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                ref={backRef}
                style={{ display: 'none' }}
                onChange={handleUploadBack}
              />
              <button className="upload-button" onClick={triggerBackUpload}>Upload Back</button>
            </div>
          </div>

          <div className="cnic-previews">
            {cnicFront && (
              <div className="cnic-info">
                  <span>{cnicFront.name}</span>
                <div>
                <span style={{ fontSize: '14px', color: '#666' }}>
                {cnicFront.size > 1024 * 1024
                  ? `${(cnicFront.size / (1024 * 1024)).toFixed(2)} MB, `
                  : `${(cnicFront.size / 1024).toFixed(2)} KB, `}
                {cnicFront.type.replace('image/', '')}
              </span>
                </div>
                <img
                  src={Trash}
                  alt="delete"
                  className="trash-icon"
                  onClick={() => setCnicFront(null)}
                />
              </div>
            )}
            {cnicBack && (
              <div className="cnic-info">
                  <span>{cnicBack.name}</span>
                <div>
                <span style={{ fontSize: '14px', color: '#666' }}>
                {cnicBack.size > 1024 * 1024
                  ? `${(cnicBack.size / (1024 * 1024)).toFixed(2)} MB, `
                  : `${(cnicBack.size / 1024).toFixed(2)} KB, `}
                {cnicBack.type.replace('image/', '')}
              </span>
                </div>
                <img
                  src={Trash}
                  alt="delete"
                  className="trash-icon"
                  onClick={() => setCnicBack(null)}
                />
              </div>
            )}
          </div>
        </div>

        <button className="next-button" onClick={() => {
          
          setVendorData(prevData => ({
            ...prevData, 
            cnicFront: cnicFront,
            cnicBack: cnicBack,
          }));
          
          navigate('/Dashboard')}}>
          Next
        </button>
      </div>
    </div>
  );
}

export default UpdatePortfolio;
