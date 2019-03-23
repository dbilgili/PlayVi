import React, { useState, useEffect } from 'react';
import useLog from 'uselog-hook';

import more from '../assets/images/more.png';

const TabMenu = (props) => {
  const { logout, next, prev, tabPos } = props;
  const [tab, setTab] = useState(0);

  const tabSwitch = (type) => {
    if (type === 'next') {
      setTab(1);
      next();
    } else if (type === 'prev') {
      setTab(0);
      prev();
    }
  };

  if (tab === 0 && tabPos === 1) {
    setTab(1);
  } else if (tab === 1 && tabPos === 0) {
    setTab(0);
  }

  return (
    <div className="tab-menu-container">
      <button type="button" className="tab-button" onClick={() => tabSwitch('prev')}>Playlist</button>
      <button type="button" className="tab-button" onClick={() => tabSwitch('next')}>Add Songs</button>
      <button type="button" className="more-button" onClick={() => logout()}>
        <img alt="more" src={more} />
      </button>
      <span className={tab ? 'underline slide' : 'underline'} />
    </div>
  );
};

export default TabMenu;
