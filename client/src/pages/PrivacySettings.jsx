import React from 'react';
import './PrivacySettings.css';


const PrivacySettings = () => {
  return (
    <div className="preference-container">
      <div className="header">
        <button className="back-button">&larr;</button>
        <h2>Privacy & Settings</h2>
      </div>
      <h3 className="section-title">Partner Preference</h3>
      <form className="preference-form">
        <div className="input-group">
          <label>Age</label>
          <input type="range" min="18" max="35" defaultValue="25" className="slider" />
          <span className="range-values">18-35</span>
        </div>
        
        <div className="input-group">
          <label>Gender</label>
          <select>
            <option>Value</option>
            {/* Add other options here */}
          </select>
        </div>
        
        <div className="input-group">
          <label>Locations</label>
          <div className="tags">
            <span className="tag">Kochi &times;</span>
            <span className="tag">Kollam &times;</span>
            <span className="tag">Aluva &times;</span>
          </div>
        </div>
        
        <div className="input-group">
          <label>Interest & Hobbies</label>
          <div className="tags">
            <span className="tag">yoga &times;</span>
            <span className="tag">jazz &times;</span>
            <span className="tag">reading &times;</span>
          </div>
        </div>
        
        <div className="input-group">
          <label>Relationship Goals</label>
          <select>
            <option>Value</option>
            {/* Add other options here */}
          </select>
        </div>
        
        <div className="input-group">
          <label>Education Level</label>
          <select>
            <option>Value</option>
            {/* Add other options here */}
          </select>
        </div>
        
        <div className="input-group">
          <label>Height</label>
          <input type="range" min="100" max="220" defaultValue="160" className="slider" />
          <span className="range-values">cm100-220</span>
        </div>
        
        <div className="input-group">
          <label>Weight</label>
          <input type="range" min="40" max="150" defaultValue="60" className="slider" />
          <span className="range-values">kg40-150</span>
        </div>
        
        <div className="input-group">
          <label>Lifestyle Choices</label>
          <select>
            <option>Value</option>
            {/* Add other options here */}
          </select>
        </div>
        
        <div className="input-group">
          <label>Religion</label>
          <select>
            <option>Value</option>
            {/* Add other options here */}
          </select>
        </div>
      </form>
    </div>
  )
}

export default PrivacySettings