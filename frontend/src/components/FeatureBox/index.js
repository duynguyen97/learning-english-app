import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import featureBoxStyles from './FeatureBox.module.scss';

const FeatureBox = ({ to, imgUrl, title, subTitle }) => {
  return (
    <Link to={to} className={`${featureBoxStyles['root']} flex-center--ver w-100`}>
      <img className={featureBoxStyles['icon']} src={imgUrl} alt="Icon" />
      <div>
        <h2 className={featureBoxStyles['title']}>{title}</h2>
        <p className={featureBoxStyles['subTitle']}>{subTitle}</p>
      </div>
    </Link>
  );
};

FeatureBox.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string,
  subTitle: PropTypes.string,
};

FeatureBox.defaultProps = {
  imgUrl: '',
  title: '',
  to: '',
  subTitle: '',
};

export default FeatureBox;
