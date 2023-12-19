// Mycodes.js

import React, { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Loading';
import axios from 'axios';
import './Mycodes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const Mycodes = () => {
  const { user } = useAuth0();
  const [userCodes, setUserCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [codesPerPage] = useState(10);

  useEffect(() => {
    fetchUserCodes();
  }, []);

  const fetchUserCodes = async () => {
    try {
      const userId = user.sub;
      const response = await axios.get(`https://compiler-box.onrender.com/user-codes/${userId}`);
      setUserCodes(response.data);
    } catch (error) {
      console.error('Error fetching user codes:', error);
    }
  };

  const openCodeView = (code) => {
    setSelectedCode(code);
  };

  const closeCodeView = () => {
    setSelectedCode(null);
  };

  const copyCodeToClipboard = () => {
    if (selectedCode) {
      navigator.clipboard.writeText(selectedCode.code);
      window.alert("code copied succesfully");
    }
  };
  const deleteCode = async (codeId) => {
    try {
      const response = await axios.delete(`https://compiler-box.onrender.com/delete-code/${codeId}`);
      if (response.status === 200) {
        // If code is deleted successfully, fetch updated codes
        fetchUserCodes();
      alert("Deleted successfully");

      }
    } catch (error) {
      console.error('Error deleting code:', error);
    }
  };

  const indexOfLastCode = currentPage * codesPerPage;
  const indexOfFirstCode = indexOfLastCode - codesPerPage;
  const currentCodes = userCodes.slice(indexOfFirstCode, indexOfLastCode);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='mycodes'>
      <h2 style={{ margin: '20px' }}>Your Saved Codes</h2>

      {/* Display codes in bars horizontally */}
      <div className="code-bars-container">
        {currentCodes.map((userCode) => (
          <div key={userCode._id} className="code-bar">
            <div className="file-name">{userCode.fileName}</div>
            <button className="view-button" onClick={() => openCodeView(userCode)}>
              View Code
            </button>
            <div className="language">{userCode.language}</div>
            <div className="date">{new Date(userCode.date).toLocaleString()}</div>
            <div>
              <button className="delete-button" onClick={() => deleteCode(userCode._id)}>
              <FontAwesomeIcon icon={faTrashAlt}  style={{color:"white"}} /> 
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(userCodes.length / codesPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* Code view */}
      {selectedCode && (
        <div className="code-view">
          <button className="close-button" onClick={closeCodeView}>
            &times;
          </button>
          <h3>Viewing Code - {selectedCode._id}</h3>
          <pre>{selectedCode.code}</pre>
          <button className="copy-button" onClick={copyCodeToClipboard}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default withAuthenticationRequired(Mycodes, {
  onRedirecting: () => <Loading />,
});
