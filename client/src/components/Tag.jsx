import React from 'react'
import './Tag.css'
import { useMemo } from "react";
import PropTypes from "prop-types";

const Tag = (
    {
        className = "",
        onTagContainerClick,
        propPosition,
        propTop,
        propLeft,
        propBorder,
        propPadding,
        propHeight,
        propMarginLeft,
        icon,
        showIcon,
        km,
        propWidth,
        propMinWidth,
      }
) => {
    const tagStyle = useMemo(() => {
        return {
          position: propPosition,
          top: propTop,
          left: propLeft,
          border: propBorder,
          padding: propPadding,
          height: propHeight,
          marginLeft: propMarginLeft,
        };
      }, [
        propPosition,
        propTop,
        propLeft,
        propBorder,
        propPadding,
        propHeight,
        propMarginLeft,
      ]);
    
      const kmStyle = useMemo(() => {
        return {
          width: propWidth,
          minWidth: propMinWidth,
        };
      }, [propWidth, propMinWidth]);
  return (
    <div
    className={`tag ${className}`}
    onClick={onTagContainerClick}
    style={tagStyle}
  >
    {showIcon && <img className="icon1" alt="" src={icon} />}
    {!km && (
      <div className="km" style={kmStyle}>
        Edit
      </div>
    )}
  </div>
  )
}
Tag.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    showIcon: PropTypes.bool,
    km: PropTypes.bool,
  
    /** Style props */
    propPosition: PropTypes.any,
    propTop: PropTypes.any,
    propLeft: PropTypes.any,
    propBorder: PropTypes.any,
    propPadding: PropTypes.any,
    propHeight: PropTypes.any,
    propMarginLeft: PropTypes.any,
    propWidth: PropTypes.any,
    propMinWidth: PropTypes.any,
  
    /** Action props */
    onTagContainerClick: PropTypes.func,
}

export default Tag