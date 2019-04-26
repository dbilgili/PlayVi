import React, { useState, useRef } from 'react';
import '../assets/stylus/global.css';
import search from '../assets/images/search.png';
import cross from '../assets/images/cross.png';

const SearchBar = (props) => {
  const { onChange, onClear, placeholder } = props;

  const inputEl = useRef('');

  const [songName, setSongName] = useState('');

  const handleChange = (e) => {
    setSongName(e.target.value);
    onChange(e.target.value);
  };

  const clearInput = () => {
    onClear();
    setSongName('');
    onChange('');
    inputEl.current.value = '';
    inputEl.current.focus();
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        ref={inputEl}
        className="custom-search-bar"
        placeholder={placeholder}
        onChange={handleChange}
        style={{
          backgroundImage: `url(${search})`,
          backgroundPosition: '10px center',
          backgroundSize: '18px 18px',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {Boolean(songName.length) && (
      <button
        type="button"
        className="delete-button"
        onClick={clearInput}
        style={{
          backgroundImage: `url(${cross})`,
          backgroundPosition: 'center',
          backgroundSize: '14px 14px',
          backgroundRepeat: 'no-repeat',
        }}
      />
      )}
    </div>
  );
};

export default SearchBar;
