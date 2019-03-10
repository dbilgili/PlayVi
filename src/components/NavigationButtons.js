import React from 'react';

const NavigationButtons = (props) => {
  const { backAction, nextAction } = props;

  return (
    <div className="navigation-buttons-container">
      <button type="button" className="big-text-button grey" onClick={backAction}>Back</button>
      <button type="button" className="big-text-button" onClick={nextAction}>Next</button>
    </div>
  );
};

export default NavigationButtons;
