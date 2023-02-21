import axiosClient from './axiosClient';

const URL = '/word';

const wordApi = {
  postWord: (wordInfor) => {
    return axiosClient.post(`${URL}/add-word`, { ...wordInfor });
  },

  getCheckWordExistence: (word, type) => {
    return axiosClient.get(`${URL}/exist`, { params: { word, type } });
  },

  getWordPack: (page = 1, perPage = 8, packInfo) => {
    return axiosClient.get(`${URL}/pack`, {
      params: { page, perPage, packInfo: JSON.stringify(packInfo) },
    });
  },
};

export default wordApi;
