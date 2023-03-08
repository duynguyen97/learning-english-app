import { Skeleton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SlideItem from './SlideItem';
import slideShowStyles from './slideShow.module.scss';

const PAGE_SIZE = 10;

const SlideShow = ({
  list,
  total,
  onGetNewList,
  onGetOldList,
  showMean,
  currentSlide,
  setCurrent,
  totalCurrentSlide,
}) => {
  const count = totalCurrentSlide + currentSlide;

  const onPrev = () => {
    if (currentSlide !== 0) {
      setCurrent(currentSlide - 1);
    } else {
      setCurrent(PAGE_SIZE - 1);
      onGetOldList();
    }
  };

  const onNext = () => {
    if (currentSlide < list.length - 1) {
      setCurrent(currentSlide + 1);
    } else {
      onGetNewList();
      setCurrent(0);
    }
  };

  return (
    <div className={`${slideShowStyles['wrapper']} flex-center--ver position-rel`}>
      {list && list.length > 0 ? (
        <>
          <SlideItem {...list[currentSlide]} example={list[currentSlide]?.examples[0]} showMean={showMean} />

          {/* navigation arrow */}
          {count > 0 && (
            <Tooltip title="Lùi trang cũ">
              <span className={`${slideShowStyles['navArrow']} ${slideShowStyles['prev']}`} onClick={onPrev} />
            </Tooltip>
          )}
          {count + 1 < total && (
            <Tooltip title="Trang kế tiếp">
              <span className={`${slideShowStyles['navArrow']} ${slideShowStyles['next']}`} onClick={onNext} />
            </Tooltip>
          )}
        </>
      ) : (
        <Skeleton
          variant="rect"
          className={`${slideShowStyles['skeleton']} w-100`}
          animation="wave"
          style={{ height: '576px' }}
        />
      )}
    </div>
  );
};

SlideShow.propTypes = {
  list: PropTypes.array,
  onGetNewList: PropTypes.func,
  onGetOldList: PropTypes.func,
  onSaveCurrentSlide: PropTypes.func,
  showMean: PropTypes.bool,
  total: PropTypes.number,
  currentSlide: PropTypes.number,
  totalCurrentSlide: PropTypes.number,
};

SlideShow.defaultProps = {
  list: [],
  total: 0,
  currentSlide: 0,
};

export default SlideShow;
