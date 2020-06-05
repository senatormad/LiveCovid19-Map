import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPlus,
  faTimes,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';

const calcChangeTime = (lastChange) => {
  const date = new Date(lastChange);
  const zone = (date.getTimezoneOffset() / (-60)).toString();
  let time = 0;
  if (zone >= 0) { time = `GMT+${zone.toString()}`; } else time = `GMT${zone.toString()}`;
  return (
    <span>
      {' '}
      {date.toLocaleString('default', { timeStyle: 'short', dateStyle: 'short' })}
      {' '}
      {time}
    </span>
  );
};

const Sidebar = ({ countryData, menuDisplayed }) => {
  if (countryData) {
    return (
      <div className={menuDisplayed}>
        <div className="sidebar-wrapper">
          <div className="countryMenu">
            <h2>{countryData.country}</h2>
            <p className="changed">
              Last change:
              {calcChangeTime(countryData.lastChange)}
            </p>
            <div className="displayedData">
              <button className="btn btn-warning btn-circle" type="button">
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <p>Confirmed</p>
              <p>{countryData.confirmed}</p>
            </div>
            <div className="displayedData">
              <button className="btn btn-success btn-circle" type="button">
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <p>Recovered</p>
              <p>{countryData.recovered}</p>
            </div>
            <div className="displayedData">
              <button className="btn btn-danger btn-circle" type="button">
                <FontAwesomeIcon icon={faExclamation} />
              </button>
              <p>Critical</p>
              <p>{countryData.critical}</p>
            </div>
            <div className="displayedData">
              <button type="button" className="btn btn-secondary btn-circle">
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <p>Deaths</p>
              <p>{countryData.deaths}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return '';
};

export default Sidebar;
