// src/store/topAnimeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AnimeItem } from "./favoritesSlice";

interface TopAnimeState {
  list: AnimeItem[];
  loading: boolean;
  error: string | null;
}

const initialState: TopAnimeState = { list: [], loading: false, error: null };

export const fetchTopAnime = createAsyncThunk("topAnime/fetch", async () => {
  const res = await axios.get("https://api.jikan.moe/v4/top/anime", {
    params: { limit: 10 },
  });
  return res.data.data;
});

const topAnimeSlice = createSlice({
  name: "topAnime",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTopAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load top anime";
      });
  },
});

export default topAnimeSlice.reducer;
