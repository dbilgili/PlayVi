import React, { useState, useEffect } from 'react';

const TextInput = (props) => {
  const {
    placeholder,
    getField,
    validate,
    pattern,
    maxlength,
    isAlert,
    onChange,
    onReturnKeyPress,
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

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      onReturnKeyPress();
    }
  };

  return (
    <div className="custon-text-input-wrapper">
      <input
        type="text"
        maxLength={maxlength}
        pattern={pattern}
        className={isAlert ? 'custom-text-input alert' : 'custom-text-input'}
        placeholder={placeholder}
        onChange={onChangeHandler}
        defaultValue={initialValue}
        onKeyDown={handleKeyPress}
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
