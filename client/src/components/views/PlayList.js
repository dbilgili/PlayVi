import React, { useState } from 'react';

import axios from 'axios';

import GetCookie from '../../utilities/GetCookie';

import server from '../../server.json';
import cross from '../../assets/images/cross.png';

const PlayList = (props) => {
  const {
    userRole,
    playlistData: { accessLink, spotifyName, pin },
    songs,
    refreshPlaylist,
  } = props;

  const [removeStatus, setRemoveStatus] = useState({ isRemoving: false, songId: null });

  const millisToHoursAndMinutesAndSeconds = (millis) => {
    let hours = 0;
    let minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    if (minutes > 60) {
      minutes %= 60;
      hours = 60 / 60;
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes} hours`;
    }
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} minutes`;
  };

  const totalSongDuration = () => {
    let duration = 0;
    songs.map((song) => {
      duration += song.duration;
    });
    return millisToHoursAndMinutesAndSeconds(duration);
  };

  const removeSong = async (songId, position) => {
    const headers = GetCookie();
    const bodyFormData = new FormData();
    bodyFormData.set('songId', songId);
    bodyFormData.set('position', position);

    setRemoveStatus({ isRemoving: true, songId });

    try {
      await axios({
        method: 'DELETE', url: `${server.url}/party/removeSong`, data: bodyFormData, headers, withCredentials: true,
      });
      let localSongs = JSON.parse(localStorage.getItem('songs'));
      localSongs = localSongs.filter(item => item !== songId);
      localStorage.setItem('songs', JSON.stringify(localSongs));
      setTimeout(() => {
        setRemoveStatus({ isRemoving: false, songId: null });
      }, 100);

      refreshPlaylist();
    } catch (e) {
      setRemoveStatus({ isRemoving: false, songId: null });
      console.log(e);
    }
  };

  const isValidToDelete = (songId) => {
    if (localStorage.getItem('songs')) {
      return JSON.parse(localStorage.getItem('songs')).includes(songId);
    }
    return null;
  };

  const songItem = (item, index) => (
    <div type="button" key={item.id} className="song-wrapper" onClick={null}>
      <img alt="album-cover" className="album-cover" src={item.albumCoverUrl} />
      <div className={isValidToDelete(item.id) ? 'text-info short-ellipsis' : 'text-info'}>
        <p>{item.name}</p>
        <p>{item.artists.map((artist, artistIndex) => <span key={artist.id}>{artistIndex !== item.artists.length - 1 ? `${artist.name}, ` : artist.name}</span>)}</p>
        <p>{`Added by ${item.creator.username}`}</p>
      </div>
      {isValidToDelete(item.id)
        ? (
          (removeStatus.isRemoving && removeStatus.songId === item.id) ? <span className="spinner" />
            : (
              <button
                type="button"
                className="delete-button"
                onClick={() => removeSong(item.id, index)}
                style={{
                  backgroundImage: `url(${cross})`,
                  backgroundPosition: 'center',
                  backgroundSize: '14px 14px',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )
        )
        : null}
    </div>
  );

  if (songs.length) {
    return (
      <div className="play-list-container">
        <div className="play-list-stats">
          <span>{songs.length > 1 ? `${songs.length} songs` : `${songs.length} song`}</span>
          <span>  -  </span>
          <span>{totalSongDuration()}</span>
        </div>
        <div className="playlist-songs-container" data-scroll-lock-scrollable>
          {songs.map((song, index) => songItem(song, index))}
        </div>
        <div className="transparent-gradient" />
      </div>
    );
  } else {
    switch (userRole) {
      case 'participant':
        return (
          <div className="play-list-container center">
            <p>
            The playlist is empty.
              <br />
            Start adding songs to the playlist.
            </p>
          </div>
        );
      case 'admin':
        return (
          <div className="play-list-container center">
            <div className="playlist-name">
              <span>PLAYLIST NAME</span>
              <br />
              <span><a target='_new' href={accessLink}>{spotifyName}</a></span>
              <br />
              <span>Click on the playlist name to open it in Spotify.</span>
            </div>
            <div className="playlist-pin">
              <span>PARTY PIN</span>
              <br />
              <span>{pin}</span>
              <br />
              <span>Share this with your friends.</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  }
};

export default PlayList;
