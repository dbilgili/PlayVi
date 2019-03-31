import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    console.log('Check for Cookie');

    disablePageScroll(null);

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    document.addEventListener('gesturestart', (e) => {
      e.preventDefault();
    });
  }, []);

  useEffect(() => console.log({screen}), [screen]);

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
        <CreateParty screen={type => setScreen(type)} />
      </CSSTransition>
      <CSSTransition
        in={screen === 'join'}
        timeout={350}
        classNames="join-party-container"
        unmountOnExit
      >
        <JoinParty screen={type => setScreen(type)} />
      </CSSTransition>
      <CSSTransition
        in={screen === 'admin' || screen === 'participant'}
        timeout={350}
        classNames="party-page-container"
        unmountOnExit
      >
        <PartyScreen userRole={screen} screen={type => setScreen(type)} />
      </CSSTransition>
    </div>
  );
};


export default App;
