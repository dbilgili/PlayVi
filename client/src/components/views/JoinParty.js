import React, { useEffect, useState } from 'react';

import TextInput from '../TextInput';
import NavigationButtons from '../NavigationButtons';

import '../../assets/stylus/global.css';

const JoinParty = (props) => {
  const { screen, joinParty } = props;
  const [nickname, setNickname] = useState('');
  const [partyPin, setPartyPin] = useState('');
  const [areFieldsValid, setAreFieldsValid] = useState([false, false]);
  const [alertArray, setAlertArray] = useState([false, false]);

  const fieldValidation = () => {
    if (areFieldsValid[0] && areFieldsValid[1]) {
      joinParty(partyPin, nickname);
    } else {
      setAlertArray([!areFieldsValid[0], !areFieldsValid[1]]);
    }
  };

  useEffect(() => {
    if (partyPin.length) {
      setAlertArray([false, alertArray[1]]);
    }
    if (nickname.length) {
      setAlertArray([alertArray[0], false]);
    }
  }, [partyPin, nickname]);

  return (
    <div className="join-party-container">
      <div className="text-field-wrapper">
        <TextInput
          getField={val => setPartyPin(val)}
          placeholder="PARTY PIN"
          pattern="\d*"
          validate={val => setAreFieldsValid([val, areFieldsValid[1]])}
          alert={alertArray[0]}
        />
        <TextInput
          getField={val => setNickname(val)}
          placeholder="Nickname"
          validate={val => setAreFieldsValid([areFieldsValid[0], val])}
          alert={alertArray[1]}
        />
      </div>
      <p className="info-text">Pick a nickname which will appear below the songs you add to the playlist.</p>
      <NavigationButtons
        leftButton='Back'
        rightButton='Join'
        backAction={() => screen('frontpage')}
        nextAction={fieldValidation}
      />
    </div>
  );
};

export default JoinParty;
