import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AnimeItem = {
  mal_id: number;
  title: string;
  images?: { jpg?: { image_url?: string } };
  score?: number | null;
  genres?: { name: string }[];
  status?: string | { name: string } | null;
  rating?: string | null;
  [key: string]: any;
};

type FavoritesState = {
  items: AnimeItem[];
};

const getInitialFavorites = (): AnimeItem[] => {
  try {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  items: getInitialFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<AnimeItem>) => {
      const anime = action.payload;
      const exists = state.items.some((i) => i.mal_id === anime.mal_id);

      let updated: AnimeItem[];
      if (exists) {
        updated = state.items.filter((i) => i.mal_id !== anime.mal_id);
      } else {
        updated = [...state.items, anime];
      }

      state.items = updated;
      localStorage.setItem("favorites", JSON.stringify(updated));
    },

    clearFavorites: (state) => {
      state.items = [];
      localStorage.setItem("favorites", JSON.stringify([]));
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
