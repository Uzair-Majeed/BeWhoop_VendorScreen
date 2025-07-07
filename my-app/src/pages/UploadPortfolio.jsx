import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UploadPortfolio.css';
import Bg from '../assets/UploadPortfolio.png';
import FileUpload from '../additional_components/FileUpload.jsx';
import Trash from '../assets/Trash.png';
import { VendorContext } from '../contexts/VendorContext.jsx';

function UpdatePortfolio() {
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const [error, setError] = useState('');
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const { vendorData, setVendorData } = useContext(VendorContext);
  const navigate = useNavigate();

  const handleUploadFront = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setCnicFront(file);
      setError('');
    }
    e.target.value = '';
  };

  const handleUploadBack = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setCnicBack(file);
      setError('');
    }
    e.target.value = '';
  };

  const validateFile = (file) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    const maxSizeMB = 5;

    if (!validTypes.includes(file.type)) {
      setError('Only PNG, JPG, JPEG or PDF files are allowed.');
      return false;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File must be under ${maxSizeMB}MB.`);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!cnicFront || !cnicBack) {
      setError('Please upload both front and back of your CNIC.');
      return;
    }

    setError('');
    setVendorData((prevData) => ({
      ...prevData,
      cnicFront: cnicFront,
      cnicBack: cnicBack,
    }));
    navigate('/MyProfile');
  };

  return (
    <div className="update-portfolio-card">
      <div className="update-portfolio-left-bg" style={{ backgroundImage: `url(${Bg})` }}>
        <div className="update-portfolio-text-group">
          <h1>Upload Portfolio</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
        </div>
      </div>

      <div className="update-portfolio-info">
        <label className="update-portfolio-label1">Add Portfolio</label>
        <FileUpload />

        <label className="update-portfolio-label1">Add Your CNIC</label>
        <div className="update-portfolio-cnic-upload">
          <div className="update-portfolio-cnic-buttons">
            <div className="update-portfolio-upload-group">
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                ref={frontRef}
                style={{ display: 'none' }}
                onChange={handleUploadFront}
              />
              <button className="update-portfolio-upload-button" onClick={() => frontRef.current.click()}>
                Upload Front
              </button>
            </div>

            <div className="update-portfolio-upload-group">
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                ref={backRef}
                style={{ display: 'none' }}
                onChange={handleUploadBack}
              />
              <button className="update-portfolio-upload-button" onClick={() => backRef.current.click()}>
                Upload Back
              </button>
            </div>
          </div>

          <div className="update-portfolio-cnic-previews">
            {cnicFront && (
              <div className="update-portfolio-cnic-info">
                <span>{cnicFront.name}</span>
                <div>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    {formatFileSize(cnicFront.size)}, {getFileType(cnicFront.type)}
                  </span>
                </div>
                <img
                  src={Trash}
                  alt="delete"
                  className="update-portfolio-trash-icon"
                  onClick={() => setCnicFront(null)}
                />
              </div>
            )}
            {cnicBack && (
              <div className="update-portfolio-cnic-info">
                <span>{cnicBack.name}</span>
                <div>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    {formatFileSize(cnicBack.size)}, {getFileType(cnicBack.type)}
                  </span>
                </div>
                <img
                  src={Trash}
                  alt="delete"
                  className="update-portfolio-trash-icon"
                  onClick={() => setCnicBack(null)}
                />
              </div>
            )}
          </div>
        </div>

        {error && <p className="error-fields">{error}</p>}

        <button className="update-portfolio-next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

//helper functions
function formatFileSize(size) {
  return size > 1024 * 1024
    ? `${(size / (1024 * 1024)).toFixed(2)} MB`
    : `${(size / 1024).toFixed(2)} KB`;
}

function getFileType(type) {
  return type.includes('image') ? type.replace('image/', '') : 'PDF';
}

export default UpdatePortfolio;
