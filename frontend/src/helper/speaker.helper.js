// play an audio
export const onPlayAudio = (audioSrc) => {
  const audio = new Audio(audioSrc);
  audio.play();
};

// speak a text
export const onTextToSpeech = (text = '', voice, speed = 1, volume = 1) => {
  let speech = new SpeechSynthesisUtterance();
  window.speechSynthesis.cancel();

  speech.lang = 'en';
  speech.text = text;
  speech.volume = volume;
  speech.voice = voice;
  speech.rate = speed;

  window.speechSynthesis.speak(speech);
};
