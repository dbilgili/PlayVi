import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { disablePageScroll } from 'scroll-lock';

import FrontPage from './components/views/FrontPage';
import CreateParty from './components/views/CreateParty';
import JoinParty from './components/views/JoinParty';
import PartyScreen from './components/views/PartyScreen';

import './assets/stylus/global.css';

const App = () => {
  const [screen, setScreen] = useState('frontpage');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [playlistData, setPlaylistData] = useState({ user: null, data: null });

  const checkUser = async () => {
    const res = await axios('https://one-night-backend.herokuapp.com/party');
    console.log(res);
  };

  const createPlaylist = async (nickname) => {
    try {
      const res = await axios.post(`https://one-night-backend.herokuapp.com/party/create?username=${nickname}`, { withCredentials: true });
      setPlaylistData({ user: 'admin', data: res.data });
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const joinParty = async (pin, nickname) => {
    try {
      const res = await axios.post(`https://one-night-backend.herokuapp.com/party?username=${nickname}&pin=${pin}`);
      setPlaylistData({ user: 'participant', data: res.data });
      console.log(res.data);
    } catch (e) {
      console.log(e);
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
        <CreateParty screen={type => setScreen(type)} createPlaylist={createPlaylist} playlistData={playlistData} />
      </CSSTransition>
      <CSSTransition
        in={screen === 'join'}
        timeout={350}
        classNames="join-party-container"
        unmountOnExit
      >
        <JoinParty screen={type => setScreen(type)} joinParty={joinParty} playlistData={playlistData} />
      </CSSTransition>
      <CSSTransition
        in={screen === 'admin' || screen === 'participant'}
        timeout={350}
        classNames="party-page-container"
        unmountOnExit
      >
        <PartyScreen screen={type => setScreen(type)} userRole={screen} clearParty={clearParty} playlistData={playlistData.data} />
      </CSSTransition>
    </div>
  );
};


export default App;
