import React from 'react';
import NavigationButtons from '../NavigationButtons';

const AboutPage = (props) => {
  const { screen } = props;

  return (
    <div className="how-to-page-container">
      <ul>
        <li>Start a party.</li>
        <li>Share the party pin & app link with people before the actual party.</li>
        <li>Wait for people to add songs.</li>
        <li>When the party day comes, click the playlist name to open & play it in Spotify.</li>
      </ul>
      <p>
        For more information refer to
        {' '}
        <a
          href="https://github.com/dbilgili/PlayVi/blob/master/README.md"
          rel="noopener noreferrer"
          target="_blank"
        >
          README
        </a>
        {' '}
          file of the Github repo.
      </p>

      <NavigationButtons
        leftButton='Back'
        backAction={() => screen('frontpage')}
      />
    </div>
  );
};

export default AboutPage;
