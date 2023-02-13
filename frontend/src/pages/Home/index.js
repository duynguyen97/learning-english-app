import Layout from 'components/Layout';
import { ROUTES } from 'constant';
import React from 'react';
import flashcardIcon from 'assets/icons/flashcard.png';
import dictionaryIcon from 'assets/icons/dictionary.png';
import favoriteIcon from 'assets/icons/favorite.png';
import editIcon from 'assets/icons/edit.png';
import { Grid } from '@mui/material';
import FeatureBox from 'components/FeatureBox';

const HomePage = () => {
  const FEATURE_LIST = [
    {
      title: 'Từ vựng với Flashcard',
      subTitle: 'Flashcard phương pháp học từ vựng nổi tiếng. Cùng trải nghiệm trên EasyEnglish',
      imgUrl: flashcardIcon,
      to: ROUTES.FLASHCARD,
    },
    {
      title: 'Từ điển trong EasyEnglish',
      subTitle: 'Danh sách từ vựng được phân loại theo cấp độ, loại từ, ...',
      imgUrl: dictionaryIcon,
    },
    {
      title: 'Từ vựng yêu thích của bạn',
      imgUrl: favoriteIcon,
      subTitle: 'Danh sách những từ vựng yêu thích mà bạn đã lưu',
    },
    {
      title: 'Thêm từ vựng',
      imgUrl: editIcon,
      subTitle: 'Bạn có thể thêm từ mới, sửa lỗi sai',
      to: ROUTES.WORD,
    },
  ];
  return (
    <Layout>
      <div className="container my-10">
        <Grid container spacing={3}>
          {FEATURE_LIST.map((box, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <FeatureBox imgUrl={box.imgUrl} title={box.title} to={box.to} subTitle={box.subTitle} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
};

export default HomePage;
