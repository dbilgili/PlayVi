import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { disablePageScroll } from 'scroll-lock';

import FrontPage from './components/views/FrontPage';
import CreateParty from './components/views/CreateParty';
import JoinParty from './components/views/JoinParty';
import PartyScreen from './components/views/PartyScreen';

import GetCookie from './utilities/GetCookie';

import server from './server.json';
import './assets/stylus/global.css';


const App = () => {
  const [screen, setScreen] = useState('frontpage');
  const [loading, setLoading] = useState(false);
  const [initialPin, setInitialPin] = useState('');
  const [playlistData, setPlaylistData] = useState({ user: null, data: null });

  const setCookie = (res) => {
    // Fix expiration date
    document.cookie = `SESSION=${res.headers.authorization}; expires=${new Date(new Date().setFullYear(new Date().getFullYear() + 1))}; path=/`;
    if (localStorage.getItem('songs') !== null) {
      localStorage.removeItem('songs');
    }
  };

  const parseQueryString = () => {
    const pin = window.location.search.substring(1).split('=')[1];
    if (pin !== undefined) {
      setInitialPin(pin);
      setScreen('join');
    }
  };

  const checkUser = async () => {
    const headers = GetCookie();

    if (headers.Authorization === undefined) {
      setScreen('frontpage');
      parseQueryString();
    } else {
      try {
        const res = await axios({
          method: 'GET', url: `${server.url}/party`, headers, withCredentials: true,
        });
        if (typeof res.data === 'object') {
          setPlaylistData({ user: 'participant', data: res.data });
          setScreen('participant');
        }

        console.log(res);
      } catch (e) {
        console.log(e);
        setScreen('frontpage');
      }
    }
  };

  const createPlaylist = async (nickname) => {
    setLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.set('username', nickname);

    try {
      const res = await axios({
        method: 'POST', url: `${server.url}/party/create`, data: bodyFormData, withCredentials: true,
      });
      setPlaylistData({ user: 'admin', data: res.data });
      setLoading(false);
      setCookie(res);
    } catch (e) {
      setLoading(false);
    }
  };

  const joinParty = async (pin, nickname) => {
    setLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.set('username', nickname);
    bodyFormData.set('pin', pin);

    try {
      const res = await axios({
        method: 'POST', url: `${server.url}/party`, data: bodyFormData, withCredentials: true,
      });
      setPlaylistData({ user: 'participant', data: res.data });
      setLoading(false);
      if (res.data !== '') {
        setCookie(res);
      }
    } catch (e) {
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
          initialPin={initialPin}
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
