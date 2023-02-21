import React from 'react';
import { Box } from '@mui/system';
import Speaker from 'components/Speaker';
import PropTypes from 'prop-types';
import slideItemStyles from './SlideItem.module.scss';

function SliceExample({ word, example }) {
  const index = example.toLowerCase().indexOf(word.toLowerCase());

  return (
    <>
      {index === -1 ? (
        example
      ) : (
        <>
          {example.slice(0, index)}
          <b>{word}</b>
          {example.slice(index + word.length)}
        </>
      )}
    </>
  );
}

const SlideItem = ({ mean, word, type, phonetic, example, picture, showMean }) => {
  return (
    <div className={`${slideItemStyles['root']} ani-fade`}>
      {word && (
        <>
          <Box sx={{ backgroundImage: `url(${picture})` }} className={slideItemStyles['picture']} />
          <div className={`${slideItemStyles['content']} flex-center-col`}>
            {showMean && <h2 className={slideItemStyles['mean']}>{mean}</h2>}
            <h3 className={`${slideItemStyles['word']} flex-center--ver`}>
              <span>{word}</span> <Speaker className="ml-4" text={word} />
            </h3>
            {Boolean(type) && <p className={slideItemStyles['type']}>({type})</p>}
            {Boolean(phonetic) && <p className={slideItemStyles['phonetic']}>/{phonetic}/</p>}
            {example && example !== '' && (
              <p className={slideItemStyles['example']}>
                <SliceExample word={word} example={example} />
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

SlideItem.propTypes = {
  example: PropTypes.string,
  mean: PropTypes.string,
  phonetic: PropTypes.string,
  picture: PropTypes.string,
  showMean: PropTypes.bool,
  type: PropTypes.string,
  word: PropTypes.string,
};

SliceExample.propTypes = {
  example: PropTypes.string,
  word: PropTypes.string,
};

export default SlideItem;
