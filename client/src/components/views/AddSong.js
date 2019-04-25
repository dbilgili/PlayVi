import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { useDebounce } from 'use-debounce';

import SearchBar from '../SearchBar';
import GetCookie from '../../utilities/GetCookie';

import server from '../../server.json';

const AddSong = (props) => {
  const { refreshPlaylist, songs } = props;

  const [songName, setSongName] = useState('');
  const [response, setResponse] = useState([]);
  const [offset, setOffset] = useState(0);
  const [inputDebounced] = useDebounce(songName, 300);

  const refEl = useRef(null);

  const getSong = async (input) => {
    try {
      const res = await axios({
        method: 'GET', url: `${server.url}/song/search?q=${input}&limit=20&offset=0`, withCredentials: true,
      });
      setResponse(res.data.tracks.items);
      console.log(res.data.tracks.items)
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
    const headers = GetCookie();
    const bodyFormData = new FormData();
    bodyFormData.set('songId', songId);

    try {
      const res = await axios({
        method: 'POST', url: `${server.url}/party/addSong`, data: bodyFormData, headers, withCredentials: true,
      });
      console.log(res);
      const localSongs = localStorage.getItem('songs');
      if (localSongs === null) {
        const songsArray = [];
        songsArray.push(songId);
        localStorage.setItem('songs', JSON.stringify(songs));
      } else {
        const songsArray = JSON.parse(localSongs);
        songsArray.push(songId);
        localStorage.setItem('songs', JSON.stringify(songs));
      }
      refreshPlaylist();
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
    refEl.current.addEventListener('scroll', () => detectEndOfScroll());
    return refEl.current.removeEventListener('scroll', () => detectEndOfScroll());
  }, []);

  const isSongExisting = songId => songs.some(e => e.id === songId);

  const song = item => (
    <button type="button" key={item.id} className={isSongExisting(item.id) ? 'song-wrapper greyed-out' : 'song-wrapper'} onClick={isSongExisting(item.id) ? null : () => addSong(item.id)}>
      <img alt="album-cover" className="album-cover" src={item.album.images.length ? item.album.images[1].url : null} />
      <div className="text-info">
        <p>{item.name}</p>
        <p>{item.artists.map((artist, index) => <span key={artist.id}>{index !== item.artists.length - 1 ? `${artist.name}, ` : artist.name}</span>)}</p>
      </div>
    </button>
  );


  return (
    <div className="add-song-container">
      <SearchBar
        placeholder='Search a song'
        onChange={setSongName}
      />
      <div ref={refEl} className="songs-container" data-scroll-lock-scrollable>
        {songName.length ? response.map(item => song(item)) : <span>Add a new song to playlist</span>}
      </div>
      <div className="transparent-gradient" />
    </div>
  );
};

export default AddSong;
