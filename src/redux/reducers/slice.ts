import { createSlice } from "@reduxjs/toolkit";

export const createAppSlice = (sliceName, initState) => {
  const slice = createSlice({
    name: sliceName,
    initialState: initState,
    reducers: {
      clear: (state) => ({
        ...state,
        ...initState,
      }),
      request: (state) => ({
        ...state,
        loading: true,
      }),
      success: (state, action) => ({
        ...state,
        data: action.payload,
        loading: false,
      }),
      failure: (state, action) => ({
        ...state,
        errors: action.payload,
        loading: false,
      }),
    },
  });
  return slice;
};
