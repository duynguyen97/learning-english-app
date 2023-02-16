import React from 'react';
import { SpeakerRounded } from '@mui/icons-material';
import { onPlayAudio, onTextToSpeech } from 'helper/speaker.helper';
import useSpeaker from 'hooks/useSpeaker';
import speakerStyles from './Speaker.module.scss';

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

export default Speaker;
