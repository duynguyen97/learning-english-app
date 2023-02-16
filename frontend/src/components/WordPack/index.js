import React, { useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import SelectCustom from 'components/Select';
import { WORD_LEVELS, WORD_SPECIALTY, WORD_TYPES } from 'constant';
import { TOPIC_OPTIONS } from 'constant/topics';
import PropTypes from 'prop-types';
import wordPackStyles from './WordPack.module.scss';
import TopicSelect from 'components/TopicSelect';

function addAllOption(optionList = []) {
  return [{ value: '-1', label: 'Tất cả' }, ...optionList];
}

function WordPack(props) {
  const { onChoose, onCancel, open, topicMultiples, title, okBtnText, cancelBtnText, okBtnProps, cancelBtnProps } =
    props;
  const topics = useRef([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    const type = target.type?.value || '-1',
      specialty = target.specialty?.value || '-1',
      topic = target.topic?.value || '-1',
      level = target.level?.value || '-1';

    onChoose({
      type,
      specialty,
      level,
      topics: topicMultiples ? topics.current : topic === '-1' ? [] : [topic],
    });
  };

  return (
    <Dialog classes={{ paper: wordPackStyles['dialogPaper'] }} maxWidth="md" fullWidth disableBackdropClick open={open}>
      <DialogTitle classes={{ root: wordPackStyles['title'] }}>{title}</DialogTitle>

      <DialogContent dividers classes={{ dividers: wordPackStyles['breakLine'] }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SelectCustom
                label="Loại từ"
                className="w-100"
                options={addAllOption(WORD_TYPES)}
                inputProps={{ name: 'type' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectCustom
                label="Cấp độ"
                className="w-100"
                options={addAllOption(WORD_LEVELS)}
                inputProps={{ name: 'level' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectCustom
                label="Chuyên ngành"
                className="w-100"
                options={addAllOption(WORD_SPECIALTY)}
                inputProps={{ name: 'specialty' }}
              />
            </Grid>

            {topicMultiples ? (
              <TopicSelect
                onChange={(topicList) => (topics.current = topicList)}
                buttonWrapper={(props) => <Grid {...props} item xs={12} md={6} />}
                tagsWrapper={(props) => <Grid {...props} item xs={12} />}
              />
            ) : (
              <Grid item xs={12} md={6}>
                <SelectCustom
                  label="Chủ đề"
                  className="w-100"
                  options={addAllOption(TOPIC_OPTIONS)}
                  inputProps={{ name: 'topic' }}
                />
              </Grid>
            )}

            {Boolean(props.children) && (
              <Grid item xs={12} md={6}>
                {props.children}
              </Grid>
            )}
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} className="_btn _btn-stand" variant="outlined" {...cancelBtnProps}>
          {cancelBtnText}
        </Button>
        <Button
          autoFocus
          disableFocusRipple
          component="button"
          type="submit"
          className="_btn _btn-primary"
          variant="contained"
          {...okBtnProps}
        >
          {okBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WordPack.propTypes = {
  cancelBtnProps: PropTypes.object,
  cancelBtnText: PropTypes.string,
  okBtnProps: PropTypes.object,
  okBtnText: PropTypes.string,
  onCancel: PropTypes.func,
  onChoose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  topicMultiples: PropTypes.bool,
};

WordPack.defaultProps = {
  onChoose: function () {},
  open: true,
  topicMultiples: true,
  title: 'Gói từ vựng',
  okBtnText: 'Ok',
  cancelBtnText: 'Đóng',
  okBtnProps: {},
  cancelBtnProps: {},
};

export default WordPack;
