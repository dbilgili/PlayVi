import React, { useEffect, useState } from 'react';
import FrontPage from './components/views/FrontPage';
import CreateParty from './components/views/CreateParty';
import JoinParty from './components/views/JoinParty';
import './assets/css/global.css';

const App = () => {
  const [screen, setScreen] = useState('frontpage');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    console.log('Check for Cookie');
  }, []);

  return (
    <div className="App">
      {screen === 'frontpage' && <FrontPage screen={type => setScreen(type)} />}
      {screen === 'create' && <CreateParty screen={type => setScreen(type)} />}
      {screen === 'join' && <JoinParty screen={type => setScreen(type)} />}
    </div>
  );
};


export default App;
