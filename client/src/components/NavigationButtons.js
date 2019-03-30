import React from 'react';

const NavigationButtons = (props) => {
  const {
    backAction, nextAction, leftButton, rightButton,
  } = props;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      nextAction();
    }
  };

  return (
    <div className="navigation-buttons-container">
      <button type="button" className="big-text-button grey" onClick={backAction}>{leftButton}</button>
      <button type="button" className="big-text-button" onClick={nextAction} onKeyPress={handleKeyPress}>{rightButton}</button>
    </div>
  );
};

export default NavigationButtons;
