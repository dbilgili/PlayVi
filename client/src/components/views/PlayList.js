import React from 'react';

const PlayList = (props) => {
  const { userRole } = props;

  switch (userRole) {
    case 'participant':
      return (
        <div className="play-list-container">
          The playlist is empty.
          <br />
          Start adding songs to the playlist.
        </div>
      );
    case 'admin':
      return (
        <div className="play-list-container">
          <div className="playlist-name">
            <span>PLAYLIST NAME</span>
            <br />
            <span><a target='_new' href='https://open.spotify.com/user/11158904204/playlist/6G7sP8gjYK5hziuFUVwawg?si=wgUmU79kRhuLSSv7kVqukQ'>fishycat-24-01-2019</a></span>
            <br />
            <span>Click on the playlist name to open it in Spotify.</span>
          </div>
          <div className="playlist-pin">
            <span>PARTY PIN</span>
            <br />
            <span>24535</span>
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
