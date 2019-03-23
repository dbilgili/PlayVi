import React, { useState, useRef } from 'react';
import ReactSwipe from '../ReactSwipe';
import TabMenu from '../TabMenu';
import PlayList from './PlayList';
import AddSong from './AddSong';

const PartyScreen = (props) => {
  const { screen } = props;
  const reactSwipeEl = useRef(null);
  const [tabPos, setTabPos] = useState(0);

  const detectChange = () => {
    console.log('change');
    setTabPos(reactSwipeEl.current.getPos());
  };

  return (
    <div className="party-screen-container">
      <TabMenu
        logout={() => screen('frontpage')}
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
        <PlayList key='playlist' />
        <AddSong key='addsong' />
      </ReactSwipe>
    </div>
  );
};

export default PartyScreen;
