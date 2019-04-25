import React, { useState, useEffect } from 'react';

const TextInput = (props) => {
  const {
    placeholder,
    getField,
    validate,
    pattern,
    maxlength,
    alert,
    onChange,
  } = props;

  const [input, setInput] = useState('');

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    onChange();
  };

  useEffect(() => {
    getField(input);
    validate(Boolean(input.length));
  }, [input]);

  return (
    <input
      type="text"
      maxLength={maxlength}
      pattern={pattern}
      className={alert ? 'custom-text-input alert' : 'custom-text-input'}
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  );
};

TextInput.defaultProps = {
  maxLength: 15,
  onChange: () => {},
};

export default TextInput;
