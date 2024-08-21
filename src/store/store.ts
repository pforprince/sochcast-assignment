import { configureStore } from "@reduxjs/toolkit";
import episodeReducer from "./slices/episodeSlice";
import showsReducer from "./slices/showSlice";
import playerReducer from "./slices/playerSlice";

const store = configureStore({
  reducer: {
    show: showsReducer,
    episode: episodeReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
