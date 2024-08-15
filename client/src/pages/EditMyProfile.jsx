import React from 'react'
import './EditMyProfile.css'
import { MdOutlineArrowBackIos } from "react-icons/md";
import img1 from "../assets/images/avatar-1.jpg"
const EditMyProfile = () => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // Process the loaded image, e.g., display it or store it
      console.log(reader.result); // For demonstration, log the base64 image data
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="edit-profile-container">
      <div className="edit-profile-sub-container">
        <div className="edit-profile-content">
          <span className='back-btn-span'><MdOutlineArrowBackIos /></span>
        <span className='edit-my-profile-header'>  Edit My Profile </span>

        </div>
        
        
      </div>
      <div className="edit-profile-form-content">
       <span className='edit-profile-form-bar'></span>
       <div className="edit-profile-info">
        <div className="edit-profile-info-container">
        <div className="edit-profile-info-image"  style={{color:'blue'}}>
          <img src={img1} alt="" className="edit-profile-image-tag" />
        </div>
        <div className="edit-profile-info-details"  style={{color:'green'}}>
          <span className='edit-profile-name'>Narzual Islam</span>
          <span className='edit-profile-status'>Never Give Up</span>
        </div>
        </div>
        <div className="account-description">
          <span className="account-description-span">
          All your account information can be accessed and edited here but your email will still remain un-edited
          </span>
        </div>
        <div className="input-container">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />

            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" name="phone" />

            <label htmlFor="bio">Bio</label>
            <input type="text" id="bio" name="bio" />
        </div>
        <div className="media-input">
      <div className="section">
        <h2>Images</h2>
        <div className="media-container">
          <div className="media-item">
            <img src={img1} alt="Preview" />
          </div>
          <div className="add-media" onClick={() => document.getElementById('image-upload').click()}>
            <span>+</span>
            <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} style={{display: 'none'}} />
          </div>
        </div>
      </div>
      <div className="section">
        <h2>Reels</h2>
        <div className="media-container">
          <div className="media-item">
            <img src={img1} alt="Preview" />
          </div>
          <div className="add-media" onClick={() => document.getElementById('reel-upload').click()}>
            <span>+</span>
            <input type="file" id="reel-upload" accept="image/*" onChange={handleImageChange} style={{display: 'none'}} />
          </div>
        </div>
      </div>
    </div>
    
       </div>
      
      
      </div>
      
       
       </div>
        
     
  )
}

export default EditMyProfile