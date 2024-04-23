import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

export const getTopicsAi = createAsyncThunk(
  'user/topicDetail',
  async (activityId, { rejectWithValue }) => {
    // Ensure that activityId is directly passed
    try {
      const res = await axiosConfig.patch(`/user/help/summarize/${activityId}`);
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
