import { Settings, Visibility, VisibilityOff } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import wordApi from 'apis/wordApi';
import SlideShow from 'components/SlideShow';
import WordPack from 'components/WordPack';
import { equalArray } from 'helper';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from 'redux/slices/message.slice';
import flashCardStyles from './Flashcard.module.scss';
import Layout from 'components/Layout';

const perPage = 10;

const FlashCard = () => {
  const dispatch = useDispatch();
  const list = useRef([]); // list store all item to prevent call API when prev button click
  const [currentList, setCurrentList] = useState([]);
  const [isShowMean, setIsShowMean] = useState(false);
  const [openWordPack, setOpenWordPack] = useState(false);
  const currentSlide = useRef(0);
  const [total, setTotal] = useState(-1);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    packInfo: {
      type: '-1',
      level: '-1',
      specialty: '-1',
      topics: [],
    },
  });

  // get word pack when page change
  useEffect(() => {
    let isSubscribe = true;
    if (total !== -1) {
      return;
    }

    async function getFlashcardList() {
      try {
        const apiRes = await wordApi.getWordPack(pageInfo.page, perPage, pageInfo.packInfo);

        if (apiRes.status === 200 && isSubscribe) {
          const { data, pagination } = apiRes.data;
          setCurrentList(data);
          list.current = [...list.current, ...data];

          const [{ total = 0 }] = pagination;
          if (total === 0) {
            dispatch(
              setMessage({
                type: 'warning',
                message: 'Gói từ vựng hiện tại không đủ, vui lòng thử lại sau.',
                duration: 3000,
              }),
            );
          }
          setTotal(total);
        }
      } catch (error) {
        setTotal(0);
      }
    }

    isSubscribe && getFlashcardList();
    return () => (isSubscribe = false);
  }, [pageInfo]);

  const handleNextClick = () => {
    const { page } = pageInfo;
    if (page < total) {
      if (pageInfo.page < list.current.length / perPage) {
        const oldList = list.current.slice(page * perPage, (page + 1) * perPage);
        setCurrentList(oldList);
      }
      setPageInfo({ ...pageInfo, page: page + 1 });
    }
  };

  const handlePrevClick = () => {
    const { page } = pageInfo;
    if (page > 1) {
      const oldList = list.current.slice((page - 2) * perPage, (page - 1) * perPage);
      setCurrentList(oldList);
      setPageInfo({ ...pageInfo, page: page - 1 });
    }
  };

  const onWordPackChange = (newPackInfo) => {
    const { packInfo } = pageInfo;

    // check the similarity
    let isSame = true;
    const { topics } = newPackInfo;
    isSame = equalArray(topics, packInfo.topics);
    for (let k in packInfo) {
      if (k !== 'topics' && packInfo[k] !== newPackInfo[k]) {
        isSame = false;
        break;
      }
    }

    if (isSame) return;

    // reset and call API
    list.current = [];
    setPageInfo({
      page: 1,
      packInfo: newPackInfo,
    });
    setTotal(-1);
  };

  return (
    <Layout>
      <div className="container my-10">
        <div className="flex-center-between">
          <h1 className={flashCardStyles['title']}>Flashcard</h1>
          <div className={flashCardStyles['iconWrap']}>
            <Tooltip title="Xem nghĩa của từ" placement="bottom">
              {isShowMean ? (
                <VisibilityOff className={flashCardStyles['icon']} onClick={() => setIsShowMean(false)} />
              ) : (
                <Visibility className={flashCardStyles['icon']} onClick={() => setIsShowMean(true)} />
              )}
            </Tooltip>

            <Tooltip title="Cài đặt gói từ vựng" placement="bottom">
              <Settings className={flashCardStyles['icon']} onClick={() => setOpenWordPack(true)} />
            </Tooltip>
          </div>
        </div>
        <div className={flashCardStyles['break']} />

        {openWordPack && (
          <WordPack
            open={true}
            topicMultiples={true}
            onCancel={() => setOpenWordPack(false)}
            cancelBtnText="Đóng"
            onChoose={(packInfo) => {
              onWordPackChange(packInfo);
              setOpenWordPack(false);
            }}
          />
        )}

        <SlideShow
          list={currentList}
          total={total}
          onGetNewList={handleNextClick}
          onGetOldList={handlePrevClick}
          showMean={isShowMean}
          currentSlide={currentSlide.current}
          onSaveCurrentSlide={(v) => (currentSlide.current = v)}
          totalCurrentSlide={(pageInfo.page - 1) * perPage + currentSlide.current}
        />
      </div>
    </Layout>
  );
};

export default FlashCard;
