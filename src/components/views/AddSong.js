import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';

const AddSong = () => {
  const [songName, setSongName] = useState('');
  useEffect(() => {
    console.log(songName);
  }, [songName]);

  return (
    <div className="add-song-container">
      <SearchBar
        placeholder='Search a song'
        onChange={setSongName}
      />
    </div>
  );
};

export default AddSong;
