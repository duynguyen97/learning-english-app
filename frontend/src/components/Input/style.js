import { TextField } from '@mui/material';
import styled from '@emotion/styled';

const StyledInput = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: 'var(--bg-color-accent)',
    borderRadius: 'var(--border-radius)',
    border: 'solid 1px var(--border-color)',
    color: 'var(--text-color)',
    fontSize: '1.6rem',

    '& ::placeholder': {
      color: 'var(--text-color)',
      fontSize: '1.6rem',
    },
  },

  '& .MuiInputBase-root.Mui-focused': {
    borderColor: 'var(--secondary-color)',
  },

  '& .MuiFormLabel-root': {
    color: 'var(--label-color)',
    fontSize: '1.5rem',
  },

  '& label.Mui-focused': {
    color: 'var(--secondary-color)',
  },

  '& .MuiFormLabel-root.Mui-error': {
    color: 'var(--error-color)',
  },

  '& .MuiInputBase-root.Mui-error': {
    borderColor: 'var(--error-color)',
  },
});

export default StyledInput;
