import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { disablePageScroll } from 'scroll-lock';

import server from './server.json';

import FrontPage from './components/views/FrontPage';
import CreateParty from './components/views/CreateParty';
import JoinParty from './components/views/JoinParty';
import PartyScreen from './components/views/PartyScreen';

import './assets/stylus/global.css';

const App = () => {
  const [screen, setScreen] = useState('frontpage');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playlistData, setPlaylistData] = useState({ user: null, data: null });

  const checkUser = async () => {
    setLoading(true);
    try {
      const res = await axios(`${server.url}/party`, { withCredentials: true });
      console.log(res);
      if (typeof res.data === 'object') {
        setIsLoggedIn(true);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => console.log({isLoggedIn}), [isLoggedIn]);

  const createPlaylist = async (nickname) => {
    setLoading(true);
    try {
      const bodyFormData = new FormData();
      bodyFormData.set('username', nickname);
      const res = await axios.post(`${server.url}/party/create`, bodyFormData, { withCredentials: true });
      setPlaylistData({ user: 'admin', data: res.data });
      console.log(res);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const joinParty = async (pin, nickname) => {
    setLoading(true);
    try {
      const bodyFormData = new FormData();
      bodyFormData.set('username', nickname);
      bodyFormData.set('pin', pin);
      const res = await axios.post(`${server.url}/party`, bodyFormData, { withCredentials: true });
      setPlaylistData({ user: 'participant', data: res.data });
      console.log(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const clearParty = () => setPlaylistData({ user: null, data: null });

  useEffect(() => {
    checkUser();
    disablePageScroll(null);

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    document.addEventListener('gesturestart', (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <div className="App">
      <CSSTransition
        in={screen === 'frontpage'}
        timeout={350}
        classNames="front-page-container"
        unmountOnExit
      >
        <FrontPage screen={type => setScreen(type)} />
      </CSSTransition>
      <CSSTransition
        in={screen === 'create'}
        timeout={350}
        classNames="join-party-container"
        unmountOnExit
      >
        <CreateParty
          screen={type => setScreen(type)}
          loading={loading}
          clearParty={clearParty}
          createPlaylist={createPlaylist}
          playlistData={playlistData}
        />
      </CSSTransition>
      <CSSTransition
        in={screen === 'join'}
        timeout={350}
        classNames="join-party-container"
        unmountOnExit
      >
        <JoinParty
          screen={type => setScreen(type)}
          loading={loading}
          clearParty={clearParty}
          joinParty={joinParty}
          playlistData={playlistData}
        />
      </CSSTransition>
      <CSSTransition
        in={screen === 'admin' || screen === 'participant'}
        timeout={350}
        classNames="party-page-container"
        unmountOnExit
      >
        <PartyScreen
          screen={type => setScreen(type)}
          clearParty={clearParty}
          userRole={screen}
          playlistData={playlistData.data}
        />
      </CSSTransition>
    </div>
  );
};


export default App;
