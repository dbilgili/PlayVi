import React, { useState, useRef } from 'react';

import { CSSTransition } from 'react-transition-group';

import ReactSwipe from '../ReactSwipe';
import TabMenu from '../TabMenu';
import PlayList from './PlayList';
import AddSong from './AddSong';
import SlidingMenu from '../SlidingMenu';

const PartyScreen = (props) => {
  const { screen, userRole, playlistData } = props;
  const reactSwipeEl = useRef(null);
  const [tabPos, setTabPos] = useState(0);
  const [toggleMore, setToggleMore] = useState(false);

  const detectChange = () => {
    setTabPos(reactSwipeEl.current.getPos());
    document.querySelector('.custom-search-bar').blur();
  };

  return (
    <div className="party-screen-container">
      <CSSTransition
        in={toggleMore}
        timeout={250}
        classNames="sliding-menu"
        unmountOnExit
      >
        <SlidingMenu
          close={() => setToggleMore(prev => !prev)}
          exit={() => screen('frontpage')}
          playlistData={playlistData}
        />
      </CSSTransition>
      <TabMenu
        moreButton={() => setToggleMore(prev => !prev)}
        next={() => reactSwipeEl.current.next()}
        prev={() => reactSwipeEl.current.prev()}
        tabPos={tabPos}
      />
      <ReactSwipe
        key="swipe"
        className="carousel"
        swipeOptions={{ continuous: false, callback: detectChange }}
        ref={reactSwipeEl}
      >
        <PlayList userRole={userRole} key='playlist' playlistData={playlistData} />
        <AddSong key='addsong' />
      </ReactSwipe>
    </div>
  );
};

export default PartyScreen;
