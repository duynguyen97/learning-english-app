import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Button, Collapse, Grid } from '@mui/material';
import Tag from 'components/Tag';
import { TOPICS } from 'constant/topics';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import topicStyles from './TopicSelect.module.scss';

const TopicSelect = ({ onChange, resetFlag, buttonTitle, topicList, buttonWrapper, tagsWrapper }) => {
  const [visible, setVisible] = useState(false);
  const topics = useRef([]);

  const ButtonWrapper = buttonWrapper || Grid;
  const TagsWrapper = tagsWrapper || Grid;

  const handleTopicChange = (id, isActive) => {
    if (isActive) {
      topics.current.push(id);
    } else {
      topics.current = topics.current.filter((i) => i !== id);
    }

    onChange(topics.current);
  };

  useEffect(() => {
    if (!resetFlag) return;
    // reset value if parent component reset, except first render
    topics.current = [];
  }, [resetFlag]);

  return (
    <>
      <ButtonWrapper>
        <Button
          color="secondary"
          variant="contained"
          endIcon={visible ? <ExpandLess /> : <ExpandMore />}
          className={`${topicStyles['button']} w-100 h-100`}
          onClick={() => setVisible(!visible)}
        >
          {buttonTitle}
        </Button>
      </ButtonWrapper>
      <TagsWrapper className={visible ? '' : topicStyles['tagsWrap']}>
        <Collapse in={visible}>
          <div className={topicStyles['tags']}>
            {topicList.map((topic, index) => (
              <Tag
                resetFlag={resetFlag}
                iconSrc={topic.icon}
                title={topic.title}
                key={index}
                id={topic.key}
                onChange={handleTopicChange}
              />
            ))}
          </div>
        </Collapse>
      </TagsWrapper>
    </>
  );
};

TopicSelect.propTypes = {
  onChange: PropTypes.func,
  resetFlag: PropTypes.number,
  buttonTitle: PropTypes.string,
  topicList: PropTypes.array,
  buttonWrapper: PropTypes.any,
  tagsWrapper: PropTypes.any,
};

TopicSelect.defaultProps = {
  onChange: () => {},
  resetFlag: 0,
  buttonTitle: 'Chọn chủ đề',
  topicList: TOPICS,
};

export default TopicSelect;
