import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { disablePageScroll } from 'scroll-lock';

import SearchBar from '../SearchBar';

const AddSong = () => {
  const [songName, setSongName] = useState('');
  const [response, setResponse] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inputDebounced] = useDebounce(songName, 300);
  const refEl = useRef(null);

  const getSong = async (input) => {
    const res = await axios(`https://one-night-backend.herokuapp.com/song/search?q=${input}&limit=20&offset=0`);
    setResponse(res.data.tracks.items);
    console.log(res.data.tracks.items);
    refEl.current.scrollTop = 0;
  };

  const fetchMore = async () => {
    const res = await axios(`https://one-night-backend.herokuapp.com/song/search?q=${inputDebounced}&limit=20&offset=${offset}`);
    setResponse(prevState => [...prevState, ...res.data.tracks.items]);
  };

  const addSong = async (songId) => {
    const res = await axios.post(`https://one-night-backend.herokuapp.com/party/addSong?songId=${songId}`);
    console.log(res);
  };

  useEffect(() => {
    if (inputDebounced.length) {
      setOffset(0);
      try {
        getSong(inputDebounced);
      } catch (e) {
        console.log(e);
      }
    } else {
      setResponse([]);
    }
  }, [inputDebounced]);

  useEffect(() => {
    if (offset > 0) {
      try {
        fetchMore();
      } catch (e) {
        console.log(e);
      }
    }
  }, [offset]);

  const detectEndOfScroll = () => {
    const element = refEl.current;
    if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
      setOffset(prevState => prevState + 20);
    }
  };

  useEffect(() => {
    disablePageScroll(refEl.current);
    refEl.current.addEventListener('scroll', () => detectEndOfScroll());
    return refEl.current.removeEventListener('scroll', () => detectEndOfScroll());
  }, []);

  const song = item => (
    <button key={item.id} className="song-wrapper" onClick={() => addSong(item.id)} onPress={() => addSong(item.id)}>
      <img alt="album-cover" className="album-cover" src={item.album.images[1].url} />
      <div className="text-info">
        <p>{item.name}</p>
        <p>{item.artists[0].name}</p>
      </div>
    </button>
  );

  return (
    <div className="add-song-container">
      <SearchBar
        placeholder='Search a song'
        onChange={setSongName}
      />
      <div ref={refEl} className="songs-container">
        {songName.length ? response.map(item => song(item)) : <span>Add a new song to playlist</span>}
      </div>
      <div className="transparent-gradient" />
    </div>
  );
};

export default AddSong;
