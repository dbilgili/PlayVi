import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import innerHeight from 'ios-inner-height';
import FrontPage from './components/views/FrontPage';
import CreateParty from './components/views/CreateParty';
import JoinParty from './components/views/JoinParty';
import PartyScreen from './components/views/PartyScreen';
import './assets/stylus/global.css';

const App = () => {
  const [screen, setScreen] = useState('admin');
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    console.log('Check for Cookie');
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
        classNames="front-page-container"
        unmountOnExit
      >
        <CreateParty screen={type => setScreen(type)} />
      </CSSTransition>
      <CSSTransition
        in={screen === 'join'}
        timeout={350}
        classNames="front-page-container"
        unmountOnExit
      >
        <JoinParty screen={type => setScreen(type)} />
      </CSSTransition>
      <CSSTransition
        in={screen === 'admin'}
        timeout={350}
        classNames="generic-transition"
        unmountOnExit
      >
        <PartyScreen screen={type => setScreen(type)} />
      </CSSTransition>
    </div>
  );
};


export default App;
