import React from 'react';
import './FrameComponent.css'
import Tag from './Tag';
import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <section className={`avatar-background-parent ${className}`}>
      <div className="avatar-background" />
      <div className="avatar-container">
        <div className="avatar-wrapper">
          <div className="ellipse-parent">
            <img className="ellipse-icon" alt="" src="/ellipse-308@2x.png" />
            <div className="tag-group">
              <Tag icon="/icon.svg" showIcon km />
              <img className="icon2" loading="lazy" alt="" src="/icon-1.svg" />
            </div>
          </div>
          <div className="avatar-wrapper-inner">
            <div className="nazrul-islam-parent">
              <h1 className="nazrul-islam">Nazrul Islam</h1>
              <div className="user-bio">
                <div className="never-give-up">Never give up 💪</div>
              </div>
            </div>
          </div>
        </div>
        <div className="all-your-account-information-c-wrapper">
          <div className="all-your-account">
            All your account information can be accessed and edited here but
            your mail will still remain un-edited.
          </div>
        </div>
      </div>
      <div className="name-field">
        <div className="name-parent">
          <div className="name">Name</div>
          <div className="line3" />
        </div>
      </div>
    </section>
  )
};
FrameComponent1.propTypes = {
    className: PropTypes.string,
}

export default FrameComponent1