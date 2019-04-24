import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

import ReactSwipe from '../ReactSwipe';
import TabMenu from '../TabMenu';
import PlayList from './PlayList';
import AddSong from './AddSong';
import SlidingMenu from '../SlidingMenu';
import GetCookie from '../../utilities/GetCookie';

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
    // setLoading(true);
    const headers = GetCookie();

    try {
      const res = await axios({
        method: 'GET', url: `${server.url}/party`, headers, withCredentials: true,
      });
      if (typeof res.data === 'object') {
        setSongs(res.data.songList);
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const leaveParty = () => {
    screen('frontpage');
    localStorage.removeItem('songs');
    document.cookie = 'SESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  useEffect(() => {
    setSongs(playlistData.songList);
    return () => clearParty();
  }, []);

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
        className="carousel"
        swipeOptions={{ continuous: false, callback: detectChange }}
        ref={reactSwipeEl}
      >
        <PlayList userRole={userRole} playlistData={playlistData} songs={songs} />
        <AddSong refreshPlaylist={refreshPlaylist} />
      </ReactSwipe>
    </div>
  );
};

export default PartyScreen;
