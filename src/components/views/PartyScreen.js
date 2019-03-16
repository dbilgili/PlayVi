import React, { useEffect, useState, useRef } from 'react';
// import { CSSTransition } from 'react-transition-group';
import ReactSwipe from 'react-swipe';
import TabMenu from '../TabMenu';
import PlayList from './PlayList';
import AddSong from './AddSong';

const PartyScreen = (props) => {
  const { screen } = props;
  const reactSwipeEl = useRef(null);
  const [innerScreen, setInnerScreen] = useState('playlist');

  return (
    <div className="party-screen-container">
      <TabMenu
        logout={() => screen('frontpage')}
        setScreen={val => setInnerScreen(val)}
      />
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: false }}
        ref={reactSwipeEl}
      >
        <PlayList />
        <AddSong />
      </ReactSwipe>

      {/* <div className="party-screen-container generic-transition">
      <TabMenu
        logout={() => screen('frontpage')}
        setScreen={val => setInnerScreen(val)}
      />
      <CSSTransition
        in={innerScreen === 'playlist'}
        timeout={250}
        classNames="play-list-container"
        unmountOnExit
      >
        <PlayList />
      </CSSTransition>

      <CSSTransition
        in={innerScreen === 'search'}
        timeout={250}
        classNames="add-song-container"
        unmountOnExit
      >
        <AddSong />
      </CSSTransition>
    </div> */}
    </div>
  );
};

export default PartyScreen;
