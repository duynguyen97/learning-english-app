import axiosClient from './axiosClient';

const URL = '/word';

const wordApi = {
  postWord: (wordInfor) => {
    return axiosClient.post(`${URL}/add-word`, { ...wordInfor });
  },

  getCheckWordExistence: (word, type) => {
    return axiosClient.get(`${URL}/exist`, { params: { word, type } });
  },
};

export default wordApi;
