import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { useDebounce } from 'use-debounce';

import SearchBar from '../SearchBar';
import { getCookie } from '../../utilities/CookieUtils';

import server from '../../server.json';

const AddSong = (props) => {
  const { refreshPlaylist, songs } = props;

  const [songName, setSongName] = useState('');
  const [response, setResponse] = useState([]);
  const [isPlaying, setIsPlaying] = useState({ id: null });
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [offset, setOffset] = useState(0);
  const [noResult, setNoResult] = useState(false);
  const [addingSong, setAddingSong] = useState({ id: null, index: null });
  const [inputDebounced] = useDebounce(songName, 300);

  let addSongTimeOut;

  const refEl = useRef(null);

  const getSong = async (input) => {
    try {
      const res = await axios({
        method: 'GET', url: `${server.url}/song/search?q=${input}&limit=20&offset=0`, withCredentials: true,
      });
      console.log(res.data.tracks);
      setResponse(res.data.tracks.items);
      if (!res.data.tracks.items.length) {
        setNoResult(true);
      }
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

  const addSongToPlaylist = async (songId) => {
    const headers = getCookie();
    const bodyFormData = new FormData();
    bodyFormData.set('songId', songId);

    try {
      await axios({
        method: 'POST', url: `${server.url}/party/addSong`, data: bodyFormData, headers, withCredentials: true,
      });
      setTimeout(() => setAddingSong({ id: null, index: null }), 100);
      refreshPlaylist();
    } catch (e) {
      setAddingSong({ id: null, index: null });
      console.log(e);
    }
  };

  const togglePreview = (id) => {
    if (isPlaying.id === id) {
      setIsPlaying({ id: null });
      setReadyToPlay(false);
    } else {
      setIsPlaying({ id });
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

  const detectScroll = () => {
    const element = refEl.current;

    document.querySelector('.custom-search-bar').blur();

    // Detect end of scroll
    if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
      setOffset(prevState => prevState + 20);
    }
  };

  const debouncedAddSong = (id, index) => {
    if (isPlaying.id === id) {
      togglePreview(id);
    }
    clearTimeout(addSongTimeOut);

    addSongTimeOut = setTimeout(() => {
      setAddingSong({ id, index });
    }, 200);
  };

  useEffect(() => {
    if (addingSong.id !== null) {
      addSongToPlaylist(addingSong.id);
    }
  }, [addingSong]);

  useEffect(() => {
    setReadyToPlay(false);
    setIsPlaying({ id: null });
  }, [songName]);

  useEffect(() => {
    refEl.current.addEventListener('scroll', () => detectScroll());
    return refEl.current.removeEventListener('scroll', () => detectScroll());
  }, []);

  const isSongExisting = songId => songs.some(e => e.id === songId);

  const song = (item, index) => (
    <div key={item.id} className={isSongExisting(item.id) ? 'song-wrapper greyed-out' : 'song-wrapper'}>
      <button type="button" className={item.preview_url ? 'album-cover' : 'album-cover no-click'} onClick={(isSongExisting(item.id) || !item.preview_url) ? null : () => togglePreview(item.id)}>
        {(isPlaying.id === item.id && readyToPlay)
          && (
          <div className="circle">
            <div className="square" />
          </div>
          )}
        {item.preview_url
          && (
            <div className="preview-indicator">
              <div className="arrow" />
            </div>
          )}
        <img alt="album-cover" className={(isPlaying.id === item.id && readyToPlay) ? 'playing' : null} src={item.album.images.length ? item.album.images[1].url : null} />
      </button>
      <div type="button" className={addingSong.index === index ? 'text-info short-ellipsis' : 'text-info'} onClick={isSongExisting(item.id) ? null : () => debouncedAddSong(item.id, index)}>
        <p>{item.name}</p>
        <p>{item.artists.map((artist, artistIndex) => <span key={artist.id}>{artistIndex !== item.artists.length - 1 ? `${artist.name}, ` : artist.name}</span>)}</p>
        <div className={(isPlaying.id === item.id && readyToPlay) ? 'playing-song-bar playing' : 'playing-song-bar'} />
        { /* eslint-disable-next-line jsx-a11y/media-has-caption */}
        {isPlaying.id === item.id && <audio src={item.preview_url} autoPlay onCanPlay={() => setReadyToPlay(true)} onEnded={() => setReadyToPlay(false)} />}
      </div>
      {addingSong.index === index && <span className="spinner" />}
    </div>
  );

  return (
    <div className="add-song-container">
      <SearchBar
        placeholder='Search a song'
        onChange={setSongName}
        onClear={() => setNoResult(false)}
      />
      <div ref={refEl} className="songs-container" data-scroll-lock-scrollable>
        {songName.length ? response.map((item, index) => song(item, index)) : <span className="add-song-message">Add a new song to playlist</span>}
        {noResult && <span className="add-song-message">No matching result</span>}
      </div>
      <div className="transparent-gradient" />
    </div>
  );
};

export default AddSong;
