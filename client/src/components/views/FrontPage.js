import React from 'react';

import logo from '../../assets/images/logo.png';

const FrontPage = (props) => {
  const { screen } = props;

  return (
    <div className="front-page-container">
      <img alt="logo" className="logo" src={logo} />
      <button type="button" className="big-text-button" onClick={() => screen('create')}>Start a party</button>
      <button type="button" className="big-text-button" onClick={() => screen('join')}>Join to a party</button>
      <button type="button" className="small-text-button">About</button>
    </div>
  );
};

export default FrontPage;
