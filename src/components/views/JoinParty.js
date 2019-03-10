import React, { useEffect, useState } from 'react';
import TextInput from '../TextInput';
import NavigationButtons from '../NavigationButtons';
import '../../assets/css/global.css';

const JoinParty = (props) => {
  const { screen } = props;
  const [nickname, setNickname] = useState('');
  const [partyPin, setpartyPin] = useState('');

  useEffect(() => console.log(nickname, ' - ', partyPin), [nickname, partyPin]);

  return (
    <div className="join-party-container">
      <div className="text-field-wrapper">
        <TextInput
          getField={val => setNickname(val)}
          placeholder="PARTY PIN"
          pattern="\d*"
        />
        <TextInput
          getField={val => setpartyPin(val)}
          placeholder="Nickname"
        />
      </div>
      <p className="info-text">Pick a nickname which will appear below the songs you added to the playlist.</p>
      <NavigationButtons
        backAction={() => screen('frontpage')}
        nextAction={null}
      />
    </div>
  );
};

export default JoinParty;
