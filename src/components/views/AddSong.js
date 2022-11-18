/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from 'react';

import { getFunctions, httpsCallableFromURL } from "firebase/functions";
import { getApp } from "firebase/app";

import { useDebounce } from 'use-debounce';

import SearchBar from '../SearchBar';
import { getDatabase, ref, set } from 'firebase/database'

let loaderTimeout = null;

const AddSong = (props) => {
  const { pin, songs, firebaseAuth } = props;

  const [songName, setSongName] = useState('');
  const [response, setResponse] = useState([]);
  const [isPlaying, setIsPlaying] = useState({ id: null });
  const [showSongLoading, setShowSongLoading] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [addingSong, setAddingSong] = useState({ id: null, index: null });
  const [inputDebounced] = useDebounce(songName, 300);

  const functions = getFunctions(getApp(), "europe-west1");
  const searchSongsCall = httpsCallableFromURL(
    functions,
    "https://searchsongs-dclj74qtzq-ew.a.run.app/searchsongs"
  );

  let addSongTimeOut;

  const refEl = useRef(null);

  const getSong = async (input) => {
    try {
      searchSongsCall({ q: input, limit:50, offset:0})
        .then((result) => {
          // Read result of the Cloud Function.
          const data = result.data;
          setResponse(data.tracks.items);
          if (!data.tracks.items.length) {
            setNoResult(true);
          }
          refEl.current.scrollTop = 0;
        });
    } catch (e) {
      console.log(e);
    }
  };

  const addSongToPlaylist = async (songId) => {

    try {
      const currentUser = firebaseAuth.currentUser;
      const addSongData = {
        creator: {
          id: currentUser.uid,
        },
        timestamp: Date.now(),
      };

      await set(ref(getDatabase(), `playlist/${pin}/songs/${songId}`), addSongData);

      setTimeout(() => setAddingSong({ id: null, index: null }), 100);
    } catch (e) {
      setAddingSong({ id: null, index: null });
      console.log(e);
    }
  };

  const onCanPlayThrough = () => {
    setReadyToPlay(true);
    setShowSongLoading(false);
    clearTimeout(loaderTimeout);
  };

  const handleSongLoadingSpinner = () => {
    loaderTimeout = setTimeout(() => setShowSongLoading(true), 200);
  };

  const togglePreview = (id) => {
    setReadyToPlay(false);
    if (isPlaying.id === id) {
      setIsPlaying({ id: null });
      setShowSongLoading(false);
    } else {
      setIsPlaying({ id });
      handleSongLoadingSpinner();
    }
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

  const detectScroll = () => {
    document.querySelector('.custom-search-bar').blur();
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

  const isSongExisting = songId => songs.some(e => e.id === songId);

  const song = (item, index) => (
    <div
      key={item.id}
      className="song-wrapper"
    >
      <button
        type="button"
        className={item.preview_url ? 'album-cover' : 'album-cover no-click'}
        onClick={() => togglePreview(item.id)}
      >
        {(isPlaying.id === item.id && readyToPlay)
          && (
          <div className="circle">
            <div className="square" />
          </div>
          )}
        {item.preview_url
          && (
            <div className="preview-indicator">
              {(isPlaying.id === item.id && showSongLoading) && <span className="spinner mini" />}
              <div className="arrow" />
            </div>
          )}
        <img
          alt="album-cover"
          className={(isPlaying.id === item.id && readyToPlay) ? 'playing' : null}
          src={item.album.images.length ? item.album.images[1].url : null}
        />
      </button>
      <div
        type="button"
        className={addingSong.index === index ? 'text-info short-ellipsis' : 'text-info'}
        onClick={isSongExisting(item.id) ? null : () => debouncedAddSong(item.id, index)}
      >
        <p
          className={isSongExisting(item.id) ? 'greyed-out' : undefined}
          style={item.preview_url && { paddingLeft: '17px' }}
        >
          {item.name}
        </p>
        <p className={isSongExisting(item.id) ?'greyed-out' : undefined}>
          {item.artists.map((artist, artistIndex) => (
            <span key={artist.id}>{artistIndex !== item.artists.length - 1 ? `${artist.name}, ` : artist.name}</span>))}
        </p>
        <div className={(isPlaying.id === item.id && readyToPlay) ? 'playing-song-bar playing' : 'playing-song-bar'} />
        {isPlaying.id === item.id && (
          <audio
            src={item.preview_url}
            autoPlay
            onCanPlayThrough={onCanPlayThrough}
            onEnded={togglePreview}
          />
        )}
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
      <div
        ref={refEl}
        className="songs-container"
        onScroll={detectScroll}
        data-scroll-lock-scrollable
      >
        {songName.length
          ? response.map((item, index) => song(item, index))
          : (
            <span className="add-song-message">
              Add a new song to playlist
            </span>
          )}
        {noResult && (
          <span className="add-song-message">
            No matching result
          </span>
        )}
      </div>
      <div className="transparent-gradient" />
    </div>
  );
};

export default AddSong;
