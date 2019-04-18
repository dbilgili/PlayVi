import React from 'react';

const PlayList = (props) => {
  const { userRole, playlistData } = props;

  const { accessLink, spotifyName, pin } = playlistData;

  switch (userRole) {
    case 'participant':
      return (
        <div className="play-list-container">
          <p>
            The playlist is empty.
            <br />
            Start adding songs to the playlist.
          </p>
        </div>
      );
    case 'admin':
      return (
        <div className="play-list-container">
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
};

export default PlayList;
