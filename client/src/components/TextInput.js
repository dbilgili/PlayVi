import React, { useState, useEffect } from 'react';

const TextInput = (props) => {
  const { placeholder, getField, validate, pattern, alert } = props;
  const [input, setInput] = useState('');

  useEffect(() => {
    getField(input);
    validate(Boolean(input.length));
  }, [input]);

  return (
    <input
      type="text"
      maxLength="15"
      pattern={pattern}
      className={alert ? 'custom-text-input alert' : 'custom-text-input'}
      placeholder={placeholder}
      onChange={e => setInput(e.target.value)}
    />
  );
};

export default TextInput;
