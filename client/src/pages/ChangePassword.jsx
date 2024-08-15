import React from 'react';
import './ChangePassword.css';
import { MdOutlineArrowBackIos } from "react-icons/md";

const ChangePassword = () => {
  return (
    <div className="change-password-container">
      <div className="header">
        {/* <button className="back-button">&larr;</button> */}
        <button className="back-button"><MdOutlineArrowBackIos/></button>   
        <h2>Change Password</h2>
      </div>
      <p className="info-text">
        Feeling worried about your account been easily preyed on? Then change that password now!
      </p>
      <form className="password-form">
        <div className="input-group">
          <label>Current Password</label>
          <input type="password" placeholder="Current Password" />
        </div>
        <div className="input-group">
          <label>New Password</label>
          <input type="password" placeholder="New Password" />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password" />
        </div>
        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
  );
}

export default ChangePassword;
