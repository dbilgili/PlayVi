import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group';
import ReactHtmlParser from 'react-html-parser';

const LoadingBar = (props) => {
  const {
    id,
    // element,
    // index,
    info,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isSeen, setIsSeen] = useState(false);

  /*
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const { top, left } = document.querySelectorAll(`.${element}`)[index].getBoundingClientRect();
    setPos({ top, left });
  }, []);
  */

  const close = () => {
    setIsOpen(prevState => !prevState);
  };

  const gotIt = () => {
    setIsOpen(prevState => !prevState);
    setIsSeen(true);
    localStorage.setItem(`seen-${id}`, true);
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector('.root').classList.add('blur');
    } else {
      document.querySelector('.root').classList.remove('blur');
    }
  }, [isOpen]);

  useEffect(() => {
    if (localStorage.getItem(`seen-${id}`)) {
      setIsSeen(true);
    }
  });

  return (
    <div className="info-indicator-container">
      <button
        type="button"
        className={isSeen ? 'attention-indicator remove-animation' : 'attention-indicator'}
        onClick={close}
        style={{ left: `${-30}px`, top: `${2}px` }}
      >
          i
      </button>
      {ReactDOM.createPortal(
        <CSSTransition
          in={isOpen}
          timeout={350}
          classNames="front-page-container"
          unmountOnExit
        >
          <div className="info-modal-container" onClick={close}>
            <div className="info-modal" onClick={e => e.stopPropagation()}>
              {ReactHtmlParser(info)}
              {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
              <button type="button" className="close-button" onClick={gotIt}><span role="img">👍🏻</span></button>
            </div>
          </div>
        </CSSTransition>,
        document.body,
      )}
    </div>
  );
};

export default LoadingBar;
