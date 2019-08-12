import React from 'react';

const FrontPage = (props) => {
  const { screen } = props;

  return (
    <div className="front-page-container">
      <div className="logo">PlayVi</div>
      <button
        type="button"
        className="big-text-button"
        onClick={() => screen('create')}
      >
        Start a party
      </button>
      <button
        type="button"
        className="big-text-button"
        onClick={() => screen('join')}
      >
        Join to a party
      </button>
      <button
        type="button"
        className="small-text-button second"
        onClick={() => screen('about')}
      >
        About
      </button>
    </div>
  );
};

export default FrontPage;
