import React, { useState } from 'react';
import more from '../assets/images/more.png';

const TabMenu = (props) => {
  const { logout, setScreen } = props;
  const [tab, setTab] = useState('playlist');

  const tabSwitch = (tabValue) => {
    setTab(tabValue);
    setScreen(tabValue);
  };

  return (
    <div className="tab-menu-container">
      <button type="button" className="tab-button" onClick={() => tabSwitch('playlist')}>Playlist</button>
      <button type="button" className="tab-button" onClick={() => tabSwitch('search')}>Add Songs</button>
      <button type="button" className="more-button" onClick={() => logout()}>
        <img alt="more" src={more} />
      </button>
      <span className={tab === 'playlist' ? 'underline' : 'underline slide'} />
    </div>
  );
};

export default TabMenu;
