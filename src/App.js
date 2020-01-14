import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { disablePageScroll } from 'scroll-lock';

import LoadingPage from './components/views/LoadingPage';
import FrontPage from './components/views/FrontPage';
import CreateParty from './components/views/CreateParty';
import JoinParty from './components/views/JoinParty';
import PartyScreen from './components/views/PartyScreen';
import AboutPage from './components/views/AboutPage';
import HowToPage from './components/views/HowToPage';

import { getSession, clearSession, setSession } from './utilities/CookieUtils';

import server from './server.json';
import './assets/stylus/global.css';


const App = () => {
  const [screen, setScreen] = useState('loading');
  const [loading, setLoading] = useState(false);
  const [initialPin, setInitialPin] = useState('');
  const [playlistData, setPlaylistData] = useState(null);
  const [isPinValid, setIsPinValid] = useState(null);

  const dummyReq = async () => {
    const headers = {
      Authorization: null,
    };

    await axios({
      method: 'GET', url: `${server.url}/party`, headers, withCredentials: true,
    });
  };

  const parseQueryString = () => {
    const queryString = window.location.search.substring(1).split('=');
    const key = queryString[0];
    const pin = queryString[1];

    // To wake up the heroku dyno for server.
    dummyReq();

    setTimeout(() => {
      if (key === 'pin' && pin !== undefined) {
        setInitialPin(pin);
        setScreen('join');
      } else {
        setScreen('frontpage');
      }
    }, 500);
  };

  const checkUser = async () => {
    const headers = getSession();

    if (headers.Authorization === null) {
      parseQueryString();
    } else {
      try {
        const res = await axios({
          method: 'GET', url: `${server.url}/party`, headers, withCredentials: true,
        });
        if (typeof res.data === 'object') {
          setTimeout(() => {
            if (res.data.creator.id === localStorage.getItem('userId')) {
              setPlaylistData(res.data);
              setScreen('admin');
            } else {
              setPlaylistData(res.data);
              setScreen('participant');
            }
          }, 300);
        } else {
          clearSession();
          parseQueryString();
        }
      } catch (e) {
        clearSession();
        parseQueryString();
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
      localStorage.setItem('userId', res.data.creator.id);
      setPlaylistData(res.data);
      setLoading(false);
      setSession(res);
    } catch (e) {
      setLoading(false);
    }
  };

  const joinParty = async (pin, nickname) => {
    setLoading(true);
    setIsPinValid(null);
    const bodyFormData = new FormData();
    bodyFormData.set('username', nickname);
    bodyFormData.set('pin', pin);

    try {
      const res = await axios({
        method: 'POST', url: `${server.url}/party`, data: bodyFormData, withCredentials: true,
      });
      setLoading(false);
      if (typeof res.data === 'object') {
        localStorage.setItem('userId', res.data.id);
        setIsPinValid(true);
        setSession(res);
        checkUser();
      } else {
        setIsPinValid(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const clearParty = () => setPlaylistData(null);

  useEffect(() => {
    disablePageScroll(null);
    checkUser();

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.addEventListener('gesturestart', e => e.preventDefault());
  }, []);


  return (
    <div className="App">
      {screen === 'loading' && <LoadingPage />}
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
          isPinValid={isPinValid}
          initialPin={initialPin}
        />
      </CSSTransition>
      <CSSTransition
        in={screen === 'admin' || screen === 'participant'}
        timeout={350}
        classNames="join-party-container"
        unmountOnExit
      >
        <PartyScreen
          screen={type => setScreen(type)}
          clearParty={clearParty}
          userRole={screen}
          playlistData={playlistData}
        />
      </CSSTransition>
      <CSSTransition
        in={screen === 'about'}
        timeout={350}
        classNames="join-party-container"
        unmountOnExit
      >
        <AboutPage
          screen={type => setScreen(type)}
        />
      </CSSTransition>
      <CSSTransition
        in={screen === 'how-to'}
        timeout={350}
        classNames="join-party-container"
        unmountOnExit
      >
        <HowToPage
          screen={type => setScreen(type)}
        />
      </CSSTransition>
    </div>
  );
};


export default App;
