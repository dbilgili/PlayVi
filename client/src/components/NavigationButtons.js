import React from 'react';

const NavigationButtons = (props) => {
  const {
    backAction, nextAction, leftButton, rightButton,
  } = props;

  return (
    <div className="navigation-buttons-container">
      <button type="button" className="big-text-button" onClick={backAction}>{leftButton}</button>
      <button type="button" className="big-text-button" onClick={nextAction}>{rightButton}</button>
    </div>
  );
};

export default NavigationButtons;
