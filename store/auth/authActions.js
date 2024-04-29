import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    {
      firstName,
      lastName,
      dob,
      contact,
      email,
      password,
      className,
      role,
      stream,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosConfig.post('/auth/register', {
        firstName,
        lastName,
        dob,
        contact,
        email,
        password,
        className,
        role,
        stream,
      });

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

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/auth/login', {
        email,
        password,
      });

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

export const verifyUserDetails = createAsyncThunk(
  'user/verifySession',
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/user/verifySession');
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

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/auth/logout');
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

export const forgetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/auth/resetPassword', { email });
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
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async ({ newPassword, otp, resetId }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/auth/updatePassword', {
        newPassword,
        otp,
        resetId,
      });
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
export const verification = createAsyncThunk(
  'user/verify',
  async ({ otp, email }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/auth/verifyEmail', {
        otp,
        email,
      });
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
