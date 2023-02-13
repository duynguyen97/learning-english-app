import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import loadingStyles from './Loading.module.scss';

const Loading = ({ title }) => {
  return (
    <div className={loadingStyles['root']}>
      <CircularProgress className={loadingStyles['icon']} size="4.4rem" />
      <h2 className={loadingStyles['text']}>{title}</h2>
    </div>
  );
};

Loading.propTypes = {
  title: PropTypes.string,
};

Loading.defaultProps = {
  title: 'Đang tải dữ liệu ...',
};

export default Loading;
