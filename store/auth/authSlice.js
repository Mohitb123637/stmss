// import { createSlice } from '@reduxjs/toolkit';
// import {
//   loginUser,
//   logoutUser,
// //   registerUser,
//   verifyUserDetails,
// } from './authActions.js';

// const userAccessToken = localStorage.getItem('userAccessToken')
//   ? localStorage.getItem('userAccessToken')
//   : null;

// const initialState = {
//   loading: false,
//   user: null,
//   accessToken: userAccessToken,
//   error: null,
//   success: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.user = action.payload.user;
//       state.accessToken = action.payload.token;

//       localStorage.setItem('userAccessToken', action.payload.token);
//     },
//   },
//   extraReducers: {
//     // [registerUser.pending]: (state) => {
//     //   state.loading = true;
//     // },
//     // [registerUser.fulfilled]: (state, action) => {
//     //   state.loading = false;
//     //   state.user = action.payload;
//     //   state.error = null;
//     //   state.success = true;
//     // },
//     // [registerUser.rejected]: (state, action) => {
//     //   state.loading = false;
//     //   state.error = action.payload.error;
//     // },

//     [loginUser.pending]: (state) => {
//       state.loading = true;
//     },
//     [loginUser.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.user = action.payload.data;
//       state.accessToken = action.payload.data.token;
//       state.refreshToken = action.payload.refreshToken;
//       localStorage.setItem('userAccessToken', action.payload.data.token);
//       localStorage.setItem('refreshToken', action.payload.data.refreshToken);
//       state.error = null;
//     },
//     [loginUser.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload.error;
//     },

//     [logoutUser.pending]: (state) => {
//       state.loading = true;
//       console.log(state.data, 'hu');
//     },
//     [logoutUser.fulfilled]: (state) => {
//       state.loading = false;
//       console.log(state.user, 'hu');
//       state.user = null;
//       state.accessToken = null;
//       localStorage.removeItem('userAccessToken');
//       state.success = true;
//       state.error = null;
//     },
//     [logoutUser.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload.error;
//     },

//     [verifyUserDetails.pending]: (state) => {
//       state.loading = true;
//     },
//     [verifyUserDetails.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//       state.error = null;
//     },
//     [verifyUserDetails.rejected]: (state) => {
//       state.loading = false;
//     },
//   },
// });

// export default authSlice.reducer;

// export const { setCredentials } = authSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  forgetPassword,
  //   registerUser,
  verifyUserDetails,
} from './authActions.js';

const userAccessToken = localStorage.getItem('userAccessToken')
  ? localStorage.getItem('userAccessToken')
  : null;

const initialState = {
  loading: false,
  user: null,
  accessToken: userAccessToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.token;

      localStorage.setItem('userAccessToken', action.payload.token);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.accessToken = action.payload.data.token;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('userAccessToken', action.payload.data.token);
        localStorage.setItem('refreshToken', action.payload.data.refreshToken);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem('userAccessToken');
        state.success = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(verifyUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetId = action.payload;
        state.error = null;
      })
      .addCase(verifyUserDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;

export const { setCredentials } = authSlice.actions;
