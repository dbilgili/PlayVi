import React, { useEffect, useState } from 'react';

import { CSSTransition } from 'react-transition-group';
import { disablePageScroll } from 'scroll-lock';
import { getApp, initializeApp } from 'firebase/app'
import {getAuth, signInAnonymously, signOut} from "firebase/auth";
import { getDatabase, ref, onValue, get} from "firebase/database";

import LoadingPage from './components/views/LoadingPage';
import FrontPage from './components/views/FrontPage';
import CreateParty from './components/views/CreateParty';
import JoinParty from './components/views/JoinParty';
import PartyScreen from './components/views/PartyScreen';
import AboutPage from './components/views/AboutPage';
import HowToPage from './components/views/HowToPage';

import './assets/stylus/global.css';
import {updateProfile} from "@firebase/auth";
import { getFunctions, httpsCallableFromURL } from 'firebase/functions'


const App = () => {
  const [screen, setScreen] = useState('loading');
  const [loading, setLoading] = useState(false);
  const [initialPin, setInitialPin] = useState('');
  const [playlistData, setPlaylistData] = useState(null);
  const [isPinValid, setIsPinValid] = useState(null);

  const firebaseConfig = {
    apiKey: "AIzaSyDxDlBDqLsuFgwEWi9hUO0ebOeC3XyUIEc",
    authDomain: "playvi.firebaseapp.com",
    projectId: "playvi",
    storageBucket: "playvi.appspot.com",
    messagingSenderId: "815991548965",
    appId: "1:815991548965:web:7565c1da50cad0e46a63cc",
    databaseURL: "https://playvi-default-rtdb.europe-west1.firebasedatabase.app"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseDatabase = getDatabase(firebaseApp);
  const firebaseAuth = getAuth();

  const functions = getFunctions(getApp(), "europe-west1");
  const createPlaylistCall = httpsCallableFromURL(
    functions,
    "https://createplaylist-dclj74qtzq-ew.a.run.app/createplaylist"
  );

  let unsubscribePlaylist = () => { // TODO how should this function be set?
  }

  const parseQueryString = () => {
    const queryString = window.location.search.substring(1).split('=');
    const key = queryString[0];
    const pin = queryString[1];

    setTimeout(() => {
      if (key === 'pin' && pin !== undefined) {
        setInitialPin(pin);
        setScreen('join');
      } else {
        setScreen('frontpage');
      }
    }, 500);
  };

  const createPlaylist = async (nickname) => {
    setLoading(true);

    await signInAnonymouslyWithNickname(nickname);

    createPlaylistCall()
      .then((response) => {
        const playlistData = response.data;
        setPlaylistData(playlistData);
        setScreen('admin');
        setLoading(false);
        subscribePlaylist(playlistData.pin);
      }).catch(() => {
      setLoading(false);
    });
  };

  const joinParty = async (playlistPin, nickname) => {
    setLoading(true);
    setIsPinValid(null);

    await signInAnonymouslyWithNickname(nickname);

    const playlistReference = ref(firebaseDatabase, 'playlist/' + playlistPin);
    get(playlistReference).then((snapshot) => {
          if (!snapshot.exists()) {
              setIsPinValid(false);
              setLoading(false);
          } else {
              const playlistData = snapshot.val();

            // TODO any better way?
            if(playlistData.songs) {
              playlistData.songs = Object.entries(playlistData.songs)
                .map(payload => payload[1])
                .filter(song => song.name);
            }

              setPlaylistData(playlistData);
              setScreen('participant');
              setLoading(false);

              subscribePlaylist(playlistPin);
          }
      }).catch(() => {
          setLoading(false);
      });
  };

  const clearParty = () => {
      console.log(unsubscribePlaylist);
      signOut(firebaseAuth);
      unsubscribePlaylist();
      setPlaylistData(null);
  }

  useEffect(() => {
    disablePageScroll(null);
    parseQueryString();

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.addEventListener('gesturestart', e => e.preventDefault());
  }, []);

  const signInAnonymouslyWithNickname = async (nickname)  => {
      const userCredential = await signInAnonymously(firebaseAuth);
      await updateProfile(userCredential.user, {displayName: nickname})
  }

  const subscribePlaylist = async (playlistPin) => {
    const playlistReference = ref(firebaseDatabase, 'playlist/' + playlistPin);
    unsubscribePlaylist = onValue(playlistReference, (snapshot) => {
          if(!snapshot.exists()) {
              clearParty();
          } else {
              const playlistData = snapshot.val();
              // TODO any better way?
            if(playlistData.songs) {
              playlistData.songs = Object.entries(playlistData.songs)
                .map(payload =>  payload[1])
                .filter(song => song.name);
            }

            console.log(playlistData.songs);

            setPlaylistData(playlistData);
          }
    });

  }

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
          firebaseDatabase={firebaseDatabase}
          firebaseAuth={firebaseAuth}
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
