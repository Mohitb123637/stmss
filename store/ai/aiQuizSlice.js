import { createSlice } from '@reduxjs/toolkit';
// import { getTopicsAi } from './topicAction.js'; // assuming your actions file is in the same directory
import { getExamToken, startExam, finalSubmit } from './aiQuizAction';

const initialState = {
  examData: null,
  loading: false,
  error: null,
  resultData: null,
  examToken: null,
};

const topicDetailSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExamToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExamToken.fulfilled, (state, action) => {
        state.loading = false;
        state.examToken = action.payload;
        state.error = null;
      })
      .addCase(getExamToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : 'An error occurred';
      })
      .addCase(startExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startExam.fulfilled, (state, action) => {
        state.loading = false;
        state.examData = action.payload;
        state.error = null;
      })
      .addCase(startExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : 'An error occurred';
      })
      .addCase(finalSubmit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finalSubmit.fulfilled, (state, action) => {
        state.loading = false;
        state.resultData = action.payload;
        state.error = null;
      })
      .addCase(finalSubmit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : 'An error occurred';
      });
  },
});

export default topicDetailSlice.reducer;
