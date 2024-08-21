import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShow } from "../../types/Show";

type ShowSlice = {
  shows: IShow[];
  loading: boolean;
  error: string | null;
};

const initialState: ShowSlice = {
  shows: [],
  loading: false,
  error: null,
};

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    fetchShowsStart(state) {
      state.loading = true;
    },
    fetchShowsSuccess(state, action: PayloadAction<IShow[]>) {
      state.loading = false;
      state.shows = action.payload;
    },
    fetchShowsFailure(state, action: PayloadAction<string>) {
      state.shows = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchShowsSuccess, fetchShowsFailure, fetchShowsStart } =
  showSlice.actions;

export default showSlice.reducer;
