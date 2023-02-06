import React from 'react';
import PropTypes from 'prop-types';
import phoneticKeyboardSyles from './PhoneticKeyboard.module.scss';

const IPA_CHARS = [
  "'",
  'ɪ',
  'iː',
  'ʊ',
  'uː',
  'e',
  'ə',
  'ɜː',
  'ɔː',
  'æ',
  'ʌ',
  'aː',
  'ɒ',
  'ɪə',
  'eɪ',
  'ʊə',
  'ɔɪ',
  'əʊ',
  'aɪ',
  'aʊ',
  'tʃ',
  'dʒ',
  'θ',
  'ð',
  'ʃ',
  'ŋ',
  'ʒ',
];

const PhoneticKeyboard = ({ onClose, onInput }) => {
  return (
    <div className={`${phoneticKeyboardSyles['root']}`}>
      {IPA_CHARS.map((c, index) => (
        <span key={index} onClick={() => onInput(c)}>
          {c}
        </span>
      ))}

      <span onClick={onClose} className="close">
        Close
      </span>
    </div>
  );
};

PhoneticKeyboard.propTypes = {
  onClose: PropTypes.func,
  onInput: PropTypes.func,
};

PhoneticKeyboard.defaultProps = {
  onClose: function () {},
  onInput: function () {},
};

export default PhoneticKeyboard;
