import { configureStore } from "@reduxjs/toolkit";
import episodeReducer from "./slices/episodeSlice";
import showsReducer from "./slices/showSlice";

const store = configureStore({
  reducer: {
    show: showsReducer,
    episode: episodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
