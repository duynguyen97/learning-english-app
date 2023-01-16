import React from 'react';
import PropTypes from 'prop-types';
import StyledInput from './style';

const Input = (props) => {
  const { endAdornment, error, inputProps, ...propRest } = props;

  return (
    <StyledInput
      error={error}
      InputProps={{
        disableUnderline: true,
        endAdornment,
      }}
      inputProps={inputProps}
      InputLabelProps={{
        shrink: true,
      }}
      variant="filled"
      {...propRest}
    />
  );
};

Input.propTypes = {
  endAdornment: PropTypes.any,
  error: PropTypes.bool,
  inputProps: PropTypes.any,
};

Input.defaultProps = {
  endAdornment: null,
  error: false,
  inputProps: {},
};

export default Input;
