import { createSlice } from "@reduxjs/toolkit";
import { IEpisode } from "../../types/Episode";

type Value = {
  slug: string;
  episodes: IEpisode[];
};

type EpisodeSlice = {
  values: Value[];
  loading: boolean;
  error: string | null;
};

const initialState: EpisodeSlice = {
  values: [],
  loading: false,
  error: null,
};

const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {
    fetchEpisodesStart(state) {
      state.loading = true;
    },
    fetchEpisodes(state, action) {
      state.loading = false;
      const episode = state.values.find(
        (episode) => episode.slug === action.payload.slug
      );
      if (episode) {
        episode.episodes = action.payload.episodes;
      } else {
        state.values.push(action.payload);
      }
    },
    fetchEpisodesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchEpisodes, fetchEpisodesFailure, fetchEpisodesStart } =
  episodeSlice.actions;
export default episodeSlice.reducer;
