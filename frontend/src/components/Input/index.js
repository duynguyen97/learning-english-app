import React from 'react';
import PropTypes from 'prop-types';
import StyledInput from './style';

const Input = (props) => {
  const { endAdornment, error, inputProps, errorMsg, ...propRest } = props;

  return (
    <div>
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
      {errorMsg && <p className="text-error">{errorMsg?.message}</p>}
    </div>
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
