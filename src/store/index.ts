import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import favoritesReducer from "./favoritesSlice";
import topAnimeReducer from "./topAnimeSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoritesReducer,
    topAnime: topAnimeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
