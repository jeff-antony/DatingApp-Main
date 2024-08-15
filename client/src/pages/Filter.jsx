import React from 'react';
import './Filter.css';

const Filter = () => {
  return (
    <div className="filter-container">
      <div className="header">
        <h2>Filter</h2>
      </div>

      <div className="filter-section">
        <h3>Sort By</h3>
        <ul className="filter-list">
          <li>
            <label>
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              Newest Members
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              Last Active
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              Distance
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              Popularity
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              Age
            </label>
          </li>
        </ul>
      </div>

      <div className="filter-section">
        <h3>Filter By</h3>
        <ul className="filter-list">
          <li>
            <label>
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              Gender
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              Location
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              Interests/Hobbies
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              Languages Spoken
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              Relationship Goals
            </label>
          </li>
        </ul>
      </div>

      <div className="button-group">
        <button className="cancel-button">Cancel</button>
        <button className="apply-button">Apply</button>
      </div>
    </div>
  );
};

export default Filter;
