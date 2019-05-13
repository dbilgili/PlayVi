import React, { useEffect, useState } from 'react';

import TextInput from '../TextInput';
import NavigationButtons from '../NavigationButtons';
import LoadingBar from '../LoadingBar';

// import '../../assets/stylus/global.css';

const CreateParty = (props) => {
  const {
    screen, createPlaylist, playlistData, loading,
  } = props;
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

  useEffect(() => {
    if (playlistData !== null) {
      screen('admin');
    } else {
      // server error
    }
  }, [playlistData]);

  return (
    <div className="create-party-container">
      <TextInput
        getField={val => setNickname(val)}
        placeholder="Name"
        validate={val => setIsFieldValid(val)}
        isAlert={alert}
        onReturnKeyPress={loading ? null : fieldValidation}
      />
      <p className="info-text">Pick a name which will appear below the songs you add to the playlist.</p>
      <p className="info-text">Note that the party is going to expire after 7 days.</p>
      <NavigationButtons
        leftButton='Back'
        rightButton='Create'
        backAction={() => screen('frontpage')}
        nextAction={loading ? null : fieldValidation}
      />
      {loading && <LoadingBar />}
    </div>
  );
};

export default CreateParty;
