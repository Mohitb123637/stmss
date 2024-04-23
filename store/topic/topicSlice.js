import { createSlice } from '@reduxjs/toolkit';
import { getTopicsAi } from './topicAction.js'; // assuming your actions file is in the same directory

const initialState = {
  topicDetail: null,
  loading: false,
  error: null,
};

const topicDetailSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopicsAi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopicsAi.fulfilled, (state, action) => {
        state.loading = false;
        state.topicDetail = action.payload;
        state.error = null;
      })
      .addCase(getTopicsAi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : 'An error occurred';
      });
  },
});

export default topicDetailSlice.reducer;
