import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { disablePageScroll } from 'scroll-lock';

import SearchBar from '../SearchBar';

const AddSong = () => {
  const [songName, setSongName] = useState('muse');
  const [response, setResponse] = useState([]);
  const [inputDebounced] = useDebounce(songName, 300);
  const refEl = useRef(null);

  const getSong = async (input) => {
    const result = await axios(`https://one-night-backend.herokuapp.com/song/search?q=${input}&limit=50&offset=1`);
    setResponse(result.data.tracks.items);
    refEl.current.scrollTop = 0;
    console.log(result.data.tracks.items);
  };

  useEffect(() => {
    if (inputDebounced.length) {
      try {
        getSong(inputDebounced);
      } catch (e) {
        console.log(e);
      }
    } else {
      setResponse([]);
    }
  }, [inputDebounced]);

  const song = item => (
    <div key={item.id} className="song-wrapper">
      <img alt="album-cover" className="album-cover" src={item.album.images[1].url} />
      <div className="text-info">
        <p>{item.name}</p>
        <p>{item.artists[0].name}</p>
      </div>
    </div>
  );

  useEffect(() => {
    disablePageScroll(refEl.current);
  }, []);

  return (
    <div className="add-song-container">
      <SearchBar
        placeholder='Search a song'
        onChange={setSongName}
      />
      <div ref={refEl} className="songs-container">
        {Boolean(songName.length) && response.map(item => song(item))}
      </div>
      <div className="transparent-gradient" />
    </div>
  );
};

export default AddSong;
