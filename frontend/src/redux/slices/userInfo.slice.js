import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountApi from 'apis/accountApi';

export const getUserInfo = createAsyncThunk('userInfo/getUserInfo', async () => {
  try {
    const apiRes = await accountApi.getUserInfo();
    if (apiRes && apiRes.status === 200) {
      return apiRes.data.user;
    }
    return {};
  } catch (error) {
    throw error;
  }
});

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    isAuth: false,
    accountId: '',
    name: '',
    username: '',
    avt: '',
    favoriteList: [],
    loading: true,
  },
  reducers: {
    setAddFavorites(state, action) {
      const { word, isAdd = true } = action.payload;

      if (isAdd) {
        state.favoriteList.push(word);
      } else {
        state.favoriteList = state.favoriteList.filter((i) => i !== word);
      }
    },

    setUserAvt(state, action) {
      state.avt = action.payload;
    },
  },
  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      const { username, name, avt, favoriteList, accountId } = action.payload;
      if (!username || username === '') {
        state.isAuth = false;
        return;
      }
      return { isAuth: true, username, name, avt, favoriteList, accountId, loading: false };
    },
    [getUserInfo.rejected]: () => {
      return { isAuth: false, loading: false };
    },
  },
});

const { reducer, actions } = userInfoSlice;
export const { setAddFavorites, setUserAvt } = actions;
export default reducer;
