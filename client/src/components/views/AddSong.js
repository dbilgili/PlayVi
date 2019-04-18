import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { disablePageScroll } from 'scroll-lock';

import server from '../../server.json';

import SearchBar from '../SearchBar';

const AddSong = () => {
  const [songName, setSongName] = useState('');
  const [response, setResponse] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inputDebounced] = useDebounce(songName, 300);
  const refEl = useRef(null);

  const getCookie = () => {
    const cookieVal = document.cookie.split('=')[1];
    const headers = { Authorization: cookieVal };
    return headers;
  };

  const getSong = async (input) => {
    try {
      const res = await axios({
        method: 'GET', url: `${server.url}/song/search?q=${input}&limit=20&offset=0`, withCredentials: true,
      });
      setResponse(res.data.tracks.items);
      console.log(res.data.tracks.items);
      refEl.current.scrollTop = 0;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMore = async () => {
    try {
      const res = await axios({
        method: 'GET', url: `${server.url}/song/search?q=${inputDebounced}&limit=20&offset=${offset}`, withCredentials: true,
      });
      setResponse(prevState => [...prevState, ...res.data.tracks.items]);
    } catch (e) {
      console.log(e);
    }
  };

  const addSong = async (songId) => {
    const headers = getCookie();
    const bodyFormData = new FormData();
    bodyFormData.set('songId', songId);

    try {
      const res = await axios({
        method: 'POST', url: `${server.url}/party/addSong`, data: bodyFormData, headers, withCredentials: true,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
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
    <button type="button" key={item.id} className="song-wrapper" onClick={() => addSong(item.id)}>
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
