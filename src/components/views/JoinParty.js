import React, { useEffect, useState } from 'react';

import TextInput from '../TextInput';
import NavigationButtons from '../NavigationButtons';
import LoadingBar from '../LoadingBar';

const JoinParty = (props) => {
  const {
    screen, joinParty, isPinValid, loading, clearParty, initialPin,
  } = props;
  const [nickname, setNickname] = useState('');
  const [partyPin, setPartyPin] = useState(initialPin);
  const [areFieldsValid, setAreFieldsValid] = useState([false, false]);
  const [alertArray, setAlertArray] = useState([false, false]);
  const [partyPinError, setPartyPinError] = useState(false);

  useEffect(() => {
    if (isPinValid !== null && !isPinValid) {
      setPartyPinError(true);
    }
  }, [isPinValid]);

  const fieldValidation = () => {
    if (areFieldsValid[0] && areFieldsValid[1]) {
      joinParty(partyPin, nickname);
    } else {
      setAlertArray([!areFieldsValid[0], !areFieldsValid[1]]);
    }
  };

  const goBack = () => {
    screen('frontpage');
    clearParty();
  };

  useEffect(() => {
    if (partyPin.length) {
      setAlertArray(prevState => [false, prevState[1]]);
    }
    if (nickname.length) {
      setAlertArray(prevState => [prevState[0], false]);
    }
  }, [partyPin, nickname]);

  useEffect(() => {
    if (initialPin !== '') {
      setAreFieldsValid([true, false]);
    }
    return setPartyPinError(false);
  }, []);

  return (
    <div className="join-party-container">
      <div className="text-field-wrapper">
        <TextInput
          getField={val => setPartyPin(val)}
          placeholder="PARTY PIN"
          initialValue={partyPin}
          pattern="\d*"
          validate={val => setAreFieldsValid([val, areFieldsValid[1]])}
          isAlert={alertArray[0]}
          maxlength={4}
          invalidValue={partyPinError}
          invalidMessage="Invalid PIN"
          onChange={() => setPartyPinError(false)}
        />
        <TextInput
          getField={val => setNickname(val)}
          placeholder="Nickname"
          validate={val => setAreFieldsValid([areFieldsValid[0], val])}
          isAlert={alertArray[1]}
          onReturnKeyPress={loading ? null : fieldValidation}
        />
      </div>
      <p className="info-text">Pick a nickname which will appear below the songs you add to the playlist.</p>
      <NavigationButtons
        leftButton='Back'
        rightButton='Join'
        backAction={goBack}
        nextAction={loading ? null : fieldValidation}
      />
      {loading && <LoadingBar />}
    </div>
  );
};

export default JoinParty;
