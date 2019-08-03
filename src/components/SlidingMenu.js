import React from 'react';

import cross from '../assets/images/cross.png';

const SlidingMenu = (props) => {
  const {
    close, exit, copyAccessLink, playlistData: {
      accessLink, spotifyName, pin,
    },
  } = props;

  return (
    <div className="sliding-menu-container" onClick={e => e.stopPropagation()}>
      <div className="cover" onClick={close} />
      <div className="vertical-wrapper">
        <div className="inner-wrapper">
          <p className="header">Playlist Name</p>
          <a className="text" href={accessLink}>{spotifyName}</a>
        </div>
        <div className="inner-wrapper">
          <p className="header">Party PIN</p>
          <p className="text">{pin}</p>
        </div>
        <div className="inner-wrapper-bottom">
          {/* <button type="button" onClick={copyAccessLink}>Access Link</button> */}
          <button type="button" onClick={exit}>Leave the party</button>
        </div>
      </div>

      <button type="button" className="close-button" onClick={close}>
        <img alt="more" src={cross} />
      </button>
    </div>
  );
};

export default SlidingMenu;
