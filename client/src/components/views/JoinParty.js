import React, { useEffect, useState } from 'react';

import TextInput from '../TextInput';
import NavigationButtons from '../NavigationButtons';
import LoadingBar from '../LoadingBar';

import '../../assets/stylus/global.css';

const JoinParty = (props) => {
  const {
    screen, joinParty, playlistData, loading, clearParty,
  } = props;
  const [nickname, setNickname] = useState('');
  const [partyPin, setPartyPin] = useState('');
  const [areFieldsValid, setAreFieldsValid] = useState([false, false]);
  const [alertArray, setAlertArray] = useState([false, false]);
  const [partyPinError, setPartyPinError] = useState(false);

  useEffect(() => {
    console.log(playlistData);
    if (playlistData.user === 'participant' && playlistData.data !== null) {
      // pin validation (returns empty string if the pin is incorrect)
      if (typeof playlistData.data === 'object') {
        screen('participant');
      } else {
        setPartyPinError(true);
      }
    }
  }, [playlistData]);

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

  return (
    <div className="join-party-container">
      <div className="text-field-wrapper">
        <TextInput
          getField={val => setPartyPin(val)}
          placeholder="PARTY PIN"
          pattern="\d*"
          validate={val => setAreFieldsValid([val, areFieldsValid[1]])}
          alert={alertArray[0]}
          maxlength={5}
          onChange={() => setPartyPinError(false)}
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
        backAction={goBack}
        nextAction={loading ? null : fieldValidation}
      />
      {loading && <LoadingBar />}
      {partyPinError && <div style={{ color: '#bf3131', fontWeight: '300' }}>Error</div>}
    </div>
  );
};

export default JoinParty;
