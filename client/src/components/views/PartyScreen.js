import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

import ReactSwipe from '../ReactSwipe';
import TabMenu from '../TabMenu';
import PlayList from './PlayList';
import AddSong from './AddSong';
import SlidingMenu from '../SlidingMenu';
import { getCookie, clearCookie } from '../../utilities/CookieUtils';

import server from '../../server.json';

const PartyScreen = (props) => {
  const {
    screen, userRole, playlistData, clearParty,
  } = props;

  const reactSwipeEl = useRef(null);

  const [tabPos, setTabPos] = useState(0);
  const [toggleMore, setToggleMore] = useState(false);
  const [songs, setSongs] = useState([]);

  const detectChange = () => {
    setTabPos(reactSwipeEl.current.getPos());
    document.querySelector('.custom-search-bar').blur();
  };

  const refreshPlaylist = async () => {
    const headers = getCookie();

    try {
      const res = await axios({
        method: 'GET', url: `${server.url}/party`, headers, withCredentials: true,
      });
      if (typeof res.data === 'object') {
        setSongs(res.data.songList);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const leaveParty = () => {
    screen('frontpage');
    localStorage.removeItem('userId');
    clearCookie();
  };

  const copyAccessLink = () => {
    const url = process.env.REACT_APP_URL;
    navigator.clipboard.writeText(`${url}/?pin=${playlistData.pin}`);
  };

  useEffect(() => {
    setSongs(playlistData.songList);
    const autoFetch = setInterval(() => {
      refreshPlaylist();
    }, 5000);
    return () => {
      clearParty();
      clearInterval(autoFetch);
    };
  }, []);

  return (
    <div className="party-screen-container" onClick={() => toggleMore && setToggleMore(prev => !prev)}>
      <CSSTransition
        in={toggleMore}
        timeout={250}
        classNames="sliding-menu"
        unmountOnExit
      >
        <SlidingMenu
          close={() => setToggleMore(prev => !prev)}
          copyAccessLink={copyAccessLink}
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
        <PlayList userRole={userRole} playlistData={playlistData} songs={songs} refreshPlaylist={refreshPlaylist} copyAccessLink={copyAccessLink} />
        <AddSong refreshPlaylist={refreshPlaylist} songs={songs} />
      </ReactSwipe>
    </div>
  );
};

export default PartyScreen;
