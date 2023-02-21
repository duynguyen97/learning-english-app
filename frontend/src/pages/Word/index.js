import { yupResolver } from '@hookform/resolvers/yup';
import { Loop, ResetTv, Save } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import wordApi from 'apis/wordApi';
import Input from 'components/Input';
import Layout from 'components/Layout';
import PhoneticKeyboard from 'components/PhoneticKeyboard';
import SelectCustom from 'components/Select';
import TopicSelect from 'components/TopicSelect';
import UploadButton from 'components/UploadButton';
import { MAX, WORD_LEVELS, WORD_SPECIALTY, WORD_TYPES } from 'constant';
import { analysisExample, debounce } from 'helper';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from 'redux/slices/message.slice';
import * as yup from 'yup';
import wordStyles from './Word.module.scss';

const ButtonWrapper = (props) => <Grid {...props} item xs={12} md={6} lg={4} />;
const TagsWrapper = (props) => <Grid {...props} item xs={12} />;

const Word = () => {
  const [resetFlag, setResetFlag] = useState(0);
  const dispatch = useDispatch();
  const { accountId } = useSelector((state) => state.userInfo);
  const [submitting, setSubmitting] = useState(false);
  let delayTimer;
  const inputRef = useRef(null);
  const [openKeyboard, setOpenKeyboard] = useState(false);
  const [value, setValue] = useState('');

  const onCloseKeyboard = () => setOpenKeyboard(false);

  const onInput = (c) => {
    setValue(value + c);
    inputRef.current.focus();
  };

  useEffect(() => {
    if (!resetFlag) return;
    // reset value if parent component reset, except first render
    setValue('');
  }, [resetFlag]);

  const schema = yup.object().shape({
    word: yup
      .string()
      .trim()
      .required('Hãy nhập một từ vào đây')
      .lowercase()
      .max(MAX.WORD_LEN, `Từ dài tối đã ${MAX.WORD_LEN} ký tự`),
    mean: yup
      .string()
      .trim()
      .lowercase()
      .required('Hãy nhập ý nghĩa từ')
      .max(MAX.MEAN_WORD_LEN, `Từ dài tối đã ${MAX.MEAN_WORD_LEN} ký tự`),
    phonetic: yup
      .string()
      .trim()
      .lowercase()
      .required('Hãy nhập ký âm của từ')
      .max(MAX.PHONETIC_LEN, `Từ dài tối đã ${MAX.PHONETIC_LEN} ký tự`),
    type: yup
      .string()
      .required('Chọn loại của từ')
      .oneOf(WORD_TYPES.map((i) => i.value)),
    level: yup
      .string()
      .required('Chọn cấp bậc của từ')
      .oneOf(WORD_LEVELS.map((i) => i.value)),
    specialty: yup
      .string()
      .required('Chọn cấp bậc của từ')
      .oneOf(WORD_SPECIALTY.map((i) => i.value)),
    examples: yup.string().max(MAX.EXAMPLE_WORD_LEN, `Ví dụ tối đa ${MAX.EXAMPLE_WORD_LEN} ký tự`),
    synonyms: yup.string().max(MAX.SYNONYMS_WORD_LEN, `Từ đồng nghĩa tối đa ${MAX.SYNONYMS_WORD_LEN} ký tự`),
    antonyms: yup.string().max(MAX.SYNONYMS_WORD_LEN, `Từ trái nghĩa tối đa ${MAX.SYNONYMS_WORD_LEN} ký tự`),
    note: yup.string().max(MAX.NOTE_WORD_LEN, `Ghi chú tối đa ${MAX.NOTE_WORD_LEN} ký tự`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const topics = useRef([]);
  const picture = useRef(null);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const { examples, synonyms, antonyms, word, phonetic, ...rest } = data;

      // check examples validation
      const exampleArr = analysisExample(examples, word);
      if (typeof exampleArr === 'boolean' && !exampleArr) {
        dispatch(
          setMessage({
            type: 'warning',
            message: 'Câu ví dụ phải chứa từ vựng mới.',
          }),
        );
        setSubmitting(false);
        return;
      }

      // split synonyms string to an array synonyms
      const synonymArr = synonyms !== '' ? synonyms.split('\n') : [];

      // split antonyms string to an array synonyms
      const antonymArr = antonyms !== '' ? antonyms.split('\n') : [];

      // call API
      const dataSend = {
        ...rest,
        examples: exampleArr,
        synonyms: synonymArr,
        antonyms: antonymArr,
        word,
        accountId,
        phonetic: phonetic.replaceAll('/', ''),
      };

      const apiRes = await wordApi.postWord(dataSend);

      if (apiRes.status === 200) {
        dispatch(
          setMessage({
            type: 'success',
            message: 'Thêm thành công!',
            duration: 5000,
          }),
        );
        setSubmitting(false);
        onResetForm();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Thêm từ mới không thành công, thử lại';
      dispatch(
        setMessage({
          type: 'error',
          message,
        }),
      );
      setSubmitting(false);
    }
  };

  const onResetForm = () => {
    const initialValues = {
      word: '',
      mean: '',
      phonetic: '',
      type: 'n',
      level: 'A1',
      specialty: '0',
      examples: '',
      synonyms: '',
      antonyms: '',
      note: '',
    };
    topics.current = [];
    picture.current = null;
    reset(initialValues);
    setResetFlag(Math.random() + 1);
  };

  const handleCheckWordExistence = (eWord, eType) => {
    delayTimer = debounce(
      delayTimer,
      async () => {
        try {
          const word = eWord ? eWord.target?.value : getValues('word'),
            type = eType ? eType.target?.value : getValues('type');

          const apiRes = await wordApi.getCheckWordExistence(word, type);
          if (apiRes.status === 200) {
            const { isExist = false } = apiRes.data;
            if (isExist) {
              dispatch(
                setMessage({
                  type: 'warning',
                  message: `Từ ${word} (${type}) đã tồn tại!`,
                  duration: 2000,
                }),
              );
            }
          }
        } catch (error) {}
      },
      1000,
    );
  };

  return (
    <Layout>
      <div className="container h-100vh flex-center">
        <div className={wordStyles['root']}>
          <h1 className={wordStyles['title']}>Thêm từ mới</h1>
          <div className={wordStyles['break']}></div>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Grid className={wordStyles['grid']} container spacing={3}>
              {/* new word */}
              <Grid item xs={12} md={6} lg={4}>
                <Input
                  className="w-100"
                  label="Từ mới (*)"
                  error={Boolean(errors.word)}
                  inputProps={{
                    autoFocus: true,
                    maxLength: MAX.WORD_LEN,
                    name: 'word',
                    ...register('word'),
                  }}
                  errorMsg={errors.word}
                  onChange={(e) => handleCheckWordExistence(e, null)}
                />
              </Grid>

              {/* mean */}
              <Grid item xs={12} md={6} lg={4}>
                <Input
                  className="w-100"
                  label="Nghĩa của từ (*)"
                  error={Boolean(errors.mean)}
                  inputProps={{
                    maxLength: MAX.MEAN_WORD_LEN,
                    name: 'mean',
                    ...register('mean'),
                  }}
                  errorMsg={errors.mean}
                />
              </Grid>

              {/* phonetic */}
              <Grid item xs={12} md={6} lg={4}>
                <Input
                  onClick={() => setOpenKeyboard(true)}
                  className="w-100"
                  label="Ký âm (*)"
                  error={Boolean(errors.phonetic)}
                  value={value}
                  inputProps={{
                    maxLength: MAX.PHONETIC_LEN,
                    name: 'phonetic',
                    ...register('phonetic'),
                  }}
                  errorMsg={errors.phonetic}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Grid>
              {openKeyboard && (
                <Grid item xs={12}>
                  <PhoneticKeyboard onInput={onInput} onClose={onCloseKeyboard} />
                </Grid>
              )}

              {/* word type */}
              <Grid item xs={12} md={6} lg={4}>
                <SelectCustom
                  className="w-100"
                  label="Loại từ (*)"
                  options={WORD_TYPES}
                  error={Boolean(errors.type)}
                  resetFlag={resetFlag}
                  inputProps={{
                    name: 'type',
                    ...register('type'),
                  }}
                  onChange={(e) => handleCheckWordExistence(null, e)}
                />
                {errors.type && <p className="text-error">{errors.type?.message}</p>}
              </Grid>

              {/* word level */}
              <Grid item xs={12} md={6} lg={4}>
                <SelectCustom
                  className="w-100"
                  label="Cấp bậc của từ (*)"
                  options={WORD_LEVELS}
                  error={Boolean(errors.level)}
                  resetFlag={resetFlag}
                  inputProps={{ name: 'level', ...register('level') }}
                />
                {errors.level && <p className="text-error">{errors.level?.message}</p>}
              </Grid>

              {/* word specialty */}
              <Grid item xs={12} md={6} lg={4}>
                <SelectCustom
                  className="w-100"
                  label="Thuộc chuyên ngành"
                  options={WORD_SPECIALTY}
                  error={Boolean(errors.specialty)}
                  resetFlag={resetFlag}
                  inputProps={{
                    name: 'specialty',
                    ...register('specialty'),
                  }}
                />
                {errors.specialty && <p className="text-error">{errors.specialty?.message}</p>}
              </Grid>

              {/* examples */}
              <Grid item xs={12} md={6} lg={4}>
                <Input
                  className="w-100"
                  label="Câu ví dụ"
                  multiline
                  error={Boolean(errors.examples)}
                  inputProps={{
                    name: 'examples',
                    ...register('examples'),
                  }}
                  errorMsg={errors.examples}
                />
              </Grid>

              {/* synonyms */}
              <Grid item xs={12} md={6} lg={4}>
                <Input
                  className="w-100"
                  label="Các từ đồng nghĩa"
                  multiline
                  error={Boolean(errors.synonyms)}
                  inputProps={{
                    name: 'synonyms',
                    ...register('synonyms'),
                  }}
                  errorMsg={errors.synonyms}
                />
              </Grid>

              {/* antonyms */}
              <Grid item xs={12} md={6} lg={4}>
                <Input
                  className="w-100"
                  label="Các từ trái nghĩa"
                  multiline
                  error={Boolean(errors.antonyms)}
                  inputProps={{
                    name: 'antonyms',
                    ...register('antonyms'),
                  }}
                  errorMsg={errors.antonyms}
                />
              </Grid>

              {/* note */}
              <Grid item xs={12} md={6} lg={4}>
                <Input
                  className="w-100"
                  label="Ghi chú"
                  multiline
                  error={Boolean(errors.note)}
                  inputProps={{
                    name: 'note',
                    ...register('note'),
                  }}
                  errorMsg={errors.note}
                />
              </Grid>

              {/* picture */}
              <Grid item xs={12} md={6} lg={4}>
                <UploadButton
                  title="Thêm ảnh minh hoạ"
                  className="w-100 h-100"
                  resetFlag={resetFlag}
                  onChange={(imgSrc) => (picture.current = imgSrc)}
                />
              </Grid>

              {/* word topics */}
              <TopicSelect
                onChange={(topicList) => (topics.current = topicList)}
                resetFlag={resetFlag}
                buttonTitle="Thêm chủ đề"
                buttonWrapper={ButtonWrapper}
                tagsWrapper={TagsWrapper}
              />
            </Grid>

            <div className={wordStyles['break']}></div>
            {/* button group */}
            <div className="d-flex flex-end jus-content-end pt-5 w-100">
              <Button
                className={`${wordStyles['btn']} ${wordStyles['btnReset']}`}
                color="secondary"
                endIcon={<ResetTv />}
                variant="outlined"
                disabled={submitting}
                onClick={onResetForm}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className={`${wordStyles['btn']} _btn _btn-primary`}
                disabled={submitting}
                endIcon={submitting ? <Loop className="ani-spin" /> : <Save />}
                variant="contained"
              >
                Thêm từ
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Word;
