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
    invalidMessage,
    invalidValue,
    initialValue,
  } = props;

  const [input, setInput] = useState(initialValue);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    onChange();
  };

  useEffect(() => {
    getField(input);
    validate(Boolean(input.length));
  }, [input]);

  return (
    <div className="custon-text-input-wrapper">
      <input
        type="text"
        maxLength={maxlength}
        pattern={pattern}
        className={alert ? 'custom-text-input alert' : 'custom-text-input'}
        placeholder={placeholder}
        onChange={onChangeHandler}
        defaultValue={initialValue}
      />
      {invalidValue && <span>{invalidMessage}</span>}
    </div>
  );
};

TextInput.defaultProps = {
  maxLength: 15,
  onChange: () => {},
  invalidValue: false,
  invalidMessage: '',
  initialValue: '',
};

export default TextInput;
