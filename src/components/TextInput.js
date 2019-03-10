import React, { useState, useEffect } from 'react';

const TextInput = (props) => {
  const { placeholder, getField, pattern } = props;
  const [nickname, setNickname] = useState('');
  useEffect(() => getField(nickname), [nickname]);

  return (
    <input
      type="text"
      pattern={pattern}
      className="custom-text-input"
      placeholder={placeholder}
      onChange={e => setNickname(e.target.value)}
    />
  );
};

export default TextInput;
