import React from 'react';
import NavigationButtons from '../NavigationButtons';

const AboutPage = (props) => {
  const { screen } = props;

  return (
    <div className="about-page-container">
      <p>
        <b>One Night</b>
        {' '}
      makes it easy to collaborate on Spotify playlists mainly for home parties where several people get involved and want to have control on the songs to be played during the event.
      </p>
      <p>
      Even people who don’t have a Spotify account can still decide what to be played next!
      </p>
      <p>
    Just start a party and share the party PIN with people.
      </p>
      <NavigationButtons
        leftButton='Back'
        backAction={() => screen('frontpage')}
      />
    </div>
  );
};

export default AboutPage;
