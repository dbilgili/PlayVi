import React from 'react';

import cross from '../assets/images/cross.png';


const SlidingMenu = (props) => {
  const { close, exit } = props;
  return (
    <div className="sliding-menu-container">
      <div className="vertical-wrapper">
        <div className="inner-wrapper">
          <p className="header">Playlist Name</p>
          <p className="text">fishycat-24-01-2019</p>
        </div>
        <div className="inner-wrapper">
          <p className="header">Party PIN</p>
          <p className="text">042501</p>
        </div>
        <button type="button" onClick={exit}>Leave the party</button>
      </div>

      <button type="button" className="close-button" onClick={close}>
        <img alt="more" src={cross} />
      </button>
    </div>
  );
};

export default SlidingMenu;
