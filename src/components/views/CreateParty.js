import React, { useEffect, useState } from 'react';
import TextInput from '../TextInput';
import NavigationButtons from '../NavigationButtons';
import '../../assets/css/global.css';

const CreateParty = (props) => {
  const { screen } = props;
  const [nickname, setNickname] = useState('');

  useEffect(() => console.log(nickname), [nickname]);

  return (
    <div className="create-party-container">
      <TextInput
        getField={val => setNickname(val)}
        placeholder="Nickname"
      />
      <p className="info-text">Pick a nickname which will appear below the songs you added to the playlist.</p>
      <NavigationButtons
        leftButton='Back'
        rightButton='Create'
        backAction={() => screen('frontpage')}
        nextAction={null}
      />
    </div>
  );
};

export default CreateParty;
