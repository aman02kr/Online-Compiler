// Footer.jsx

import React from 'react';
import './footer.css'; // Import the CSS file

const Footer = () => {
    const supportedLanguages = ['C', 'C++', 'Java', 'Python', 'Ruby', 'C#', 'JavaScript', 'Go', 'PHP', 'Rust', 'TypeScript'];
  
    return (
      <footer>
        <div className="footer-container">
          <div className="compiler-box">
            <div className="supported-languages">
              <p>Supported Languages:</p>
              <div>
                {supportedLanguages.map((language, index) => (
                  <span key={index}>{language}</span>
                ))}
              </div>
            </div>
            <br/>
            <div className="copyright">
              <span>&copy; 2023 Compiler box. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
