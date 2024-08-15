import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import './BioField.css';
import PropTypes from "prop-types";

const BioField = ( { className = "" } ) => {
    const navigate = useNavigate();
    const onPhoneNumberTextClick = useCallback(() => {
        navigate("/change-password");
      }, [navigate]);
  return (
    <section className={`bio-field ${className}`}>
    <div className="bio-parent">
      <div className="bio">Bio</div>
      <div className="line4" />
      <div className="bio-content">
        <a className="bio1">Images</a>
        <div className="frame-parent1">
          <div className="frame-parent2">
            <div className="frame-wrapper2">
              <div className="frame-parent3">
                <div className="frame-parent4">
                  <div className="frame-wrapper3">
                    <div className="avatar-parent">
                      <img
                        className="avatar-icon"
                        loading="lazy"
                        alt=""
                        src="/avatar@2x.png"
                      />
                      <img
                        className="avatar-icon1"
                        loading="lazy"
                        alt=""
                        src="/avatar-1@2x.png"
                      />
                    </div>
                  </div>
                  <div className="bio2">Reels</div>
                </div>
                <div className="frame-wrapper4">
                  <div className="frame-parent5">
                    <div className="avatar-frame">
                      <img
                        className="avatar-icon2"
                        loading="lazy"
                        alt=""
                        src="/avatar-2@2x.png"
                      />
                    </div>
                    <img
                      className="avatar-icon3"
                      loading="lazy"
                      alt=""
                      src="/avatar-3@2x.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="phone-number2" onClick={onPhoneNumberTextClick}>
              {" "}
              Change Password
            </div>
          </div>
          <div className="add-contacts">
            <div className="add-contact-button">
              <div className="add-contact-icon">
                <img
                  className="avatar-icon4"
                  loading="lazy"
                  alt=""
                  src="/avatar-4@2x.png"
                />
              </div>
              <img
                className="plus-icon"
                loading="lazy"
                alt=""
                src="/plus.svg"
              />
            </div>
            <img
              className="plus-icon1"
              loading="lazy"
              alt=""
              src="/plus-1.svg"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
BioField.propTypes = {
    className: PropTypes.string,
}

export default BioField