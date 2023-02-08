import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import selectStyles from './Select.module.scss';

const SelectCustom = (props) => {
  const { label, options, className, error, resetFlag, onChange, ...selectProps } = props;
  const [value, setValue] = useState(options[0]?.value);

  useEffect(() => {
    if (!resetFlag) return;
    // reset value if parent component reset, except first render
    setValue(options[0]?.value);
  }, [resetFlag]);

  return (
    <>
      <FormControl className={`${selectStyles['root']} ${className}`} variant="filled">
        <InputLabel classes={{ root: selectStyles['label'], focused: selectStyles['labelFocus'] }} id={label}>
          {label}
        </InputLabel>
        <Select
          classes={{
            root: selectStyles['selectRoot'],
            icon: selectStyles['selectIcon'],
          }}
          MenuProps={{ classes: { paper: selectStyles['selectMenu'] } }}
          disableUnderline
          error={error}
          labelId={label}
          label={label}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e);
          }}
          {...selectProps}
        >
          {options &&
            options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

SelectCustom.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  error: PropTypes.bool,
  resetFlag: PropTypes.number,
  onChange: PropTypes.func,
};

SelectCustom.defaultProps = {
  className: '',
  label: 'Label',
  options: [],
  error: false,
  resetFlag: 0,
  onChange: function () {},
};

export default SelectCustom;
