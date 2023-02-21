import React from 'react';
import { SpeakerRounded } from '@mui/icons-material';
import { onPlayAudio, onTextToSpeech } from 'helper/speaker.helper';
import useSpeaker from 'hooks/useSpeaker';
import speakerStyles from './Speaker.module.scss';
import PropTypes from 'prop-types';

const Speaker = ({ className, type, text, audioSrc }) => {
  const { voice, speed, volume } = useSpeaker();

  const handleClick = () => {
    if (type) {
      onTextToSpeech(text, voice, speed, volume);
    } else {
      onPlayAudio(audioSrc);
    }
  };
  return <SpeakerRounded className={`${speakerStyles['speaker']} ${className}`} onClick={handleClick} />;
};

Speaker.propTypes = {
  audioSrc: PropTypes.any,
  className: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.bool, // type = false: play audio, true: play text
  isWrap: PropTypes.bool,
  children: PropTypes.any,
};

Speaker.defaultProps = {
  audioSrc: '',
  className: '',
  text: '',
  type: true,
  isWrap: false,
};

export default Speaker;
