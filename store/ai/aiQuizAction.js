import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';
import { setSelectedChapter } from '../subject/subAction';

export const getExamToken = createAsyncThunk(
  'user/getExamToken',
  async ({ activityId }, { rejectWithValue }) => {
    try {
      const res = await axiosConfig.post(`/user/exam/${activityId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data
          ? error.response.data.message
          : error.message,
      });
    }
  }
);

export const startExam = createAsyncThunk(
  'user/startExam',
  async ({ id }, { rejectWithValue }) => {
    try {
      console.log(id);
      const res = await axiosConfig.post(`/user/startExam/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data
          ? error.response.data.message
          : error.message,
      });
    }
  }
);

export const updateTopic = createAsyncThunk(
  'user/completeTopic',
  async ({ data, type, chapterId, dispatch }, { rejectWithValue }) => {
    try {
      const body = type === 'complete' ? { complete: true } : { start: true };
      const res = await axiosConfig.post(`/user/updateTopic/${data}`, body);
      dispatch(setSelectedChapter(chapterId));
      return res;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data
          ? error.response.data.message
          : error.message,
      });
    }
  }
);

export const quizSubmit = createAsyncThunk(
  'user/submitExam',
  async ({ id, selectedDataObject }, { rejectWithValue }) => {
    // console.log(selectedDataObject);
    try {
      const response = await axiosConfig.patch(
        `/user/submitExam/${id}`,
        selectedDataObject
      );
      return await response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data
          ? error.response.data.message
          : error.message,
      });
    }
  }
);

export const finalSubmit = createAsyncThunk(
  'user/finalSubmit',
  async ({ id, selectedDataObject }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post(
        `/user/finalSubmit/${id}`,
        selectedDataObject
      );
      return await response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data
          ? error.response.data.message
          : error.message,
      });
    }
  }
);
