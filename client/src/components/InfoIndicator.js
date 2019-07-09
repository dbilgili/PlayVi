import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const LoadingBar = (props) => {
  const { id, element, index } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const { top, left } = document.querySelectorAll(`.${element}`)[index].getBoundingClientRect();
    setPos({ top, left });
  }, []);

  const close = () => {
    setIsOpen(prevState => !prevState);
  };

  const gotIt = () => {
    localStorage.setItem(`seen-${id}`, true);
    setIsOpen(prevState => !prevState);
  };

  if (!localStorage.getItem(`seen-${id}`)) {
    return (
      <div className="info-indicator-container">
        <button type="button" className="attention-indicator" style={{ left: `${-20}px`, top: `${-20}px` }} onClick={close}>i</button>
        {isOpen && ReactDOM.createPortal(
          <div className="info-modal-container" onClick={close}>
            <div className="info-modal" onClick={e => e.stopPropagation()}>
              <p>
                This is the auto-generated Spotify playlist for your party.
              </p>
              <p>
                Songs added will appear both under the Playlist tab and the actual playlist in Spotify.
              </p>
              <p>
                Tap on the playlist name to open it with Spotify or tap and hold to copy the link to the playlist.
              </p>
              <button type="button" className="close-button" onClick={gotIt}>Got it!</button>
            </div>
          </div>,
          document.body,
        )}
      </div>
    );
  }

  return null;
};

export default LoadingBar;
