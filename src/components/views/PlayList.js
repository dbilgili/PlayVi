import React from 'react';

const PlayList = (props) => {
  const {key} = props;
  return (
    <div className="play-list-container">
      The playlist is empty.
      <br/>
      Start adding songs to the playlist.
    </div>
  );
};

export default PlayList;
