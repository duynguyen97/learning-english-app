import { Settings, Visibility, VisibilityOff } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import wordApi from 'apis/wordApi';
import SlideShow from 'components/SlideShow';
import WordPack from 'components/WordPack';
import { equalArray } from 'helper';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from 'redux/slices/message.slice';
import flashCardStyles from './Flashcard.module.scss';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import { PAGE_SIZE } from 'constant';

const FlashCard = () => {
  const dispatch = useDispatch();
  const [currentList, setCurrentList] = useState([]);
  const [isShowMean, setIsShowMean] = useState(false);
  const [openWordPack, setOpenWordPack] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
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

    setLoading(true);
    async function getFlashcardList() {
      try {
        const apiRes = await wordApi.getWordPack(pageInfo.page, PAGE_SIZE, pageInfo.packInfo);
        if (apiRes.status === 200 && isSubscribe) {
          const { data, pagination } = apiRes.data;
          setCurrentList([...data]);
          if (!pagination?.length) {
            dispatch(
              setMessage({
                type: 'warning',
                message: 'Gói từ vựng hiện tại không đủ, vui lòng thử lại sau.',
                duration: 3000,
              }),
            );
          } else {
            const [{ total }] = pagination;
            setTotal(total);
          }
        }
        setLoading(false);
      } catch (error) {
        setTotal(0);
        setLoading(false);
      }
    }

    isSubscribe && getFlashcardList();
    return () => (isSubscribe = false);
  }, [pageInfo]);

  const handleNextClick = () => {
    const { page } = pageInfo;
    if (page < Math.ceil(total / PAGE_SIZE)) {
      setPageInfo({ ...pageInfo, page: page + 1 });
    }
  };

  const handlePrevClick = () => {
    const { page } = pageInfo;
    if (page > 1) {
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
    setCurrentList([]);
    setCurrentSlide(0);
    setPageInfo({
      page: 1,
      packInfo: newPackInfo,
    });
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

        {loading ? (
          <Loading />
        ) : (
          <SlideShow
            list={currentList}
            total={total}
            onGetNewList={handleNextClick}
            onGetOldList={handlePrevClick}
            showMean={isShowMean}
            currentSlide={currentSlide}
            totalCurrentSlide={(pageInfo.page - 1) * PAGE_SIZE + currentSlide}
            setCurrent={setCurrentSlide}
          />
        )}
      </div>
    </Layout>
  );
};

export default FlashCard;
