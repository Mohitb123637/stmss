// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axiosConfig from '../../utils/axiosConfig';

// export const fetchSubjects = createAsyncThunk(
//   'user/subject',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosConfig.post('/user/subject');
//       return response.data;
//     } catch (error) {
//       return rejectWithValue({
//         error: error.response.data
//           ? error.response.data.message
//           : error.message,
//       });
//     }
//   }
// );

// export const setSelectedSubject = createAsyncThunk(
//   'user/subject',
//   async (subject, { rejectWithValue }) => {
//     try {
//       return subject;
//     } catch (error) {
//       return rejectWithValue({
//         error: error.response.data
//           ? error.response.data.message
//           : error.message,
//       });
//     }
//   }
// );

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

export const fetchSubjects = createAsyncThunk(
  'user/fetchSubjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get('/user/subjects');
      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data
          ? error.response.data.message
          : error.message,
      });
    }
  }
);

export const setSelectedSubject = createAsyncThunk(
  'user/setSelectedSubject',
  async (clickedSubject, { rejectWithValue }) => {
    try {
      const res = await axiosConfig.get(`/user/chapters/${clickedSubject}`);
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
export const setSelectedChapter = createAsyncThunk(
  'user/setSelectedChapter',
  async (clickedChapter, { rejectWithValue }) => {
    try {
      const res = await axiosConfig.get(`/user/topics/${clickedChapter}`);
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
