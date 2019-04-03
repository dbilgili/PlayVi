import React, { useEffect, useState } from 'react';

import TextInput from '../TextInput';
import NavigationButtons from '../NavigationButtons';

import '../../assets/stylus/global.css';

const CreateParty = (props) => {
  const { screen, createPlaylist } = props;
  const [nickname, setNickname] = useState('');
  const [isFieldValid, setIsFieldValid] = useState(false);
  const [alert, setAlert] = useState(false);

  const fieldValidation = () => {
    if (isFieldValid) {
      createPlaylist(nickname);
    } else {
      setAlert(true);
    }
  };

  useEffect(() => {
    if (nickname.length) {
      setAlert(false);
    }
  }, [nickname]);

  return (
    <div className="create-party-container">
      <form onSubmit={() => alert('hey')}>
        <TextInput
          getField={val => setNickname(val)}
          placeholder="Nickname"
          validate={val => setIsFieldValid(val)}
          alert={alert}
        />
      </form>
      <p className="info-text">Pick a nickname which will appear below the songs you add to the playlist.</p>
      <NavigationButtons
        leftButton='Back'
        rightButton='Create'
        backAction={() => screen('frontpage')}
        nextAction={fieldValidation}
      />
    </div>
  );
};

export default CreateParty;
