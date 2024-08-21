import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEpisode } from "../../types/Episode";

type Player = {
  episode: IEpisode | undefined;
  isPlaying: boolean;
};

const initialState: Player = {
  episode: undefined,
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setEpisode(_, action: PayloadAction<IEpisode>) {
      return {
        episode: action.payload,
        isPlaying: true,
      };
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    stopPlayer(state) {
      return {
        episode: state.episode,
        isPlaying: false,
      };
    },
  },
});

export const { setEpisode, togglePlay, stopPlayer } = playerSlice.actions;

export default playerSlice.reducer;
