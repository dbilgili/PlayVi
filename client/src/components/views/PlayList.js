import React, { useEffect, useRef } from 'react';

import { disablePageScroll } from 'scroll-lock';

const PlayList = (props) => {
  const {
    userRole,
    playlistData: { accessLink, spotifyName, pin },
    songs,
  } = props;

  const refElPlaylist = useRef(null);

  const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const totalSongDuration = () => {
    let duration = 0;
    songs.map((song) => {
      duration += song.duration;
    });
    return millisToMinutesAndSeconds(duration);
  };

  useEffect(() => disablePageScroll(refElPlaylist.current), []);

  const songItem = item => (
    <button type="button" key={item.id} className="song-wrapper" onClick={null}>
      <img alt="album-cover" className="album-cover" src={item.albumCoverUrl} />
      <div className="text-info">
        <p>{item.name}</p>
        <p>{item.artistName}</p>
        <p>{`Added by ${item.creator.username}`}</p>
      </div>
    </button>
  );

  if (songs.length) {
    return (
      <div className="play-list-container">
        <div className="play-list-stats">
          <span>{songs.length > 1 ? `${songs.length} songs` : `${songs.length} song`}</span>
          <span>  -  </span>
          <span>{`${totalSongDuration()} minutes`}</span>
        </div>
        <div ref={refElPlaylist} className="songs-container">
          {songs.map(song => songItem(song))}
        </div>
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
