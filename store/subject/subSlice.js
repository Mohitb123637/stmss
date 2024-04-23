import { createSlice } from '@reduxjs/toolkit';
import * as subActions from './subAction.js';

const initialState = {
  subjects: [],
  selectedSubject: {},
  selectedChapter: {},
  loading: false,
  error: null,
  success: false,
};

const subSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(subActions.fetchSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(subActions.fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload.data;
        state.error = null;
        state.success = true;
      })
      .addCase(subActions.fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(subActions.setSelectedSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(subActions.setSelectedSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSubject = action.payload.data;
        state.error = null;
        state.success = true;
      })
      .addCase(subActions.setSelectedSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(subActions.setSelectedChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(subActions.setSelectedChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedChapter = action.payload.data;
        state.error = null;
        state.success = true;
      })
      .addCase(subActions.setSelectedChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { setSelectedSubject, setSelectChapter } = subSlice.actions;
export default subSlice.reducer;
