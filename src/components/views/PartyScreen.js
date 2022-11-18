import React, {useState, useRef, useEffect} from 'react';

import { CSSTransition } from 'react-transition-group';

import ReactSwipe from '../ReactSwipe';
import TabMenu from '../TabMenu';
import PlayList from './PlayList';
import AddSong from './AddSong';
import SlidingMenu from '../SlidingMenu';
import {clearSession } from '../../utilities/CookieUtils';

const PartyScreen = (props) => {
  const {
    screen, userRole, playlistData, clearParty,firebaseDatabase,firebaseAuth,
  } = props;

  const reactSwipeEl = useRef(null);

  const [tabPos, setTabPos] = useState(0);
  const [toggleMore, setToggleMore] = useState(false);

  const detectChange = () => {
    setTabPos(reactSwipeEl.current.getPos());
    document.querySelector('.custom-search-bar').blur();
  };

  const leaveParty = () => {
    screen('frontpage');
    clearSession();
  };

  /*
  const copyAccessLink = () => {
    const url = process.env.REACT_APP_URL;
    navigator.clipboard.writeText(`${url}/?pin=${playlistData.pin}`);
  };
  */

  useEffect(() => {
    return () => {
      clearParty();
    };
  }, []);

  return (
    <div
      className="party-screen-container"
      onClick={() => toggleMore && setToggleMore(prev => !prev)}
    >
      <CSSTransition
        in={toggleMore}
        timeout={250}
        classNames="sliding-menu"
        unmountOnExit
      >
        <SlidingMenu
          close={() => setToggleMore(prev => !prev)}
          // copyAccessLink={copyAccessLink}
          exit={leaveParty}
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
        className={toggleMore ? 'carousel blur' : 'carousel'}
        swipeOptions={{ continuous: false, callback: detectChange }}
        ref={reactSwipeEl}
      >
        <PlayList
          userRole={userRole}
          playlistData={playlistData}
          songs={playlistData.songs  || []}
          firebaseDatabase={firebaseDatabase}
          firebaseAuth={firebaseAuth}
          /* copyAccessLink={copyAccessLink} */
        />
        <AddSong
          pin={playlistData.pin}
          songs={playlistData.songs || []}
          firebaseAuth={firebaseAuth}
        />
      </ReactSwipe>
    </div>
  );
};

export default PartyScreen;
