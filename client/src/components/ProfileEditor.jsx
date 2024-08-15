import React from 'react'
import './ProfileEditor.css'
import { useMemo } from "react";
import PropTypes from "prop-types";
const ProfileEditor = (
    {
        className = "",
        exclude,
        exclude1,
        vector,
        editProfileHeaderWidth,
        backIconFlex,
        backIconGap,
        back,
        editMyProfile,
      }
) => {
    const frameDivStyle = useMemo(() => {
        return {
          width: editProfileHeaderWidth,
        };
      }, [editProfileHeaderWidth]);
    
      const editProfileHeaderStyle = useMemo(() => {
        return {
          flex: backIconFlex,
          gap: backIconGap,
        };
      }, [backIconFlex, backIconGap]);

  return (
    <div className={`profile-editor  ${className}`}>
    <header className="status-bar2">
      <div className="placeholder">9:41</div>
      <div className="status-bar-content1">
        <div className="status-bar-icons">
          <img
            className="exclude-icon4"
            loading="lazy"
            alt=""
            src={exclude}
          />
          <img
            className="exclude-icon5"
            loading="lazy"
            alt=""
            src={exclude1}
          />
          <div className="group2">
            <img
              className="vector-icon2"
              loading="lazy"
              alt=""
              src={vector}
            />
            <div className="rectangle2" />
            <div className="rectangle3" />
          </div>
        </div>
      </div>
    </header>
    <div className="edit-profile-header-wrapper"
     style={frameDivStyle}
     >
      <div className="edit-profile-header" 
      style={editProfileHeaderStyle}
      >
        <img className="back-icon" loading="lazy" alt=""
         src={back}
          />
        <div className="edit-profile-title">
          <h1 className="edit-my-profile1">
            {editMyProfile}
            </h1>
        </div>
      </div>
    </div>
  </div>
  )
}
ProfileEditor.propTypes = {
    className: PropTypes.string,
    exclude: PropTypes.string,
    exclude1: PropTypes.string,
    vector: PropTypes.string,
    back: PropTypes.string,
    editMyProfile: PropTypes.string,
  
    /** Style props */
    editProfileHeaderWidth: PropTypes.any,
    backIconFlex: PropTypes.any,
    backIconGap: PropTypes.any,
}

export default ProfileEditor