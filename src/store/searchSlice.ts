import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type Anime = {
  mal_id: number;
  title: string;
  synopsis?: string | null;
  score?: number | null;
  images?: { jpg?: { image_url?: string } };
  genres?: { name: string }[];
  status?: { name: string };
};

export type SearchState = {
  query: string;
  page: number;
  list: Anime[];
  loading: boolean;
  hasNext: boolean;
  error?: string | null;
};

const initialState: SearchState = {
  query: "",
  page: 1,
  list: [],
  loading: false,
  hasNext: true,
  error: null,
};

export const ANIME_PAGE_LIMIT = 24;

let lastApiCall = 0;
const RATE_LIMIT_DELAY = 1800;

type CachedPage = { data: Anime[]; hasNext: boolean };
const cache: Record<string, Record<number, CachedPage>> = {};

export const fetchAnimePage = createAsyncThunk<
  { data: Anime[]; hasNext: boolean },
  { page: number; query?: string },
  { rejectValue: string }
>("search/fetchAnimePage", async ({ page, query }, { rejectWithValue }) => {
  try {
    const now = Date.now();
    const timeSinceLast = now - lastApiCall;

    if (timeSinceLast < RATE_LIMIT_DELAY) {
      const waitTime = RATE_LIMIT_DELAY - timeSinceLast;
      await new Promise((r) => setTimeout(r, waitTime));
    }

    lastApiCall = Date.now();

    const cacheKey = query || "default";
    if (cache[cacheKey]?.[page]) {
      return cache[cacheKey][page];
    }

    const params: Record<string, any> = { page, limit: ANIME_PAGE_LIMIT };
    if (query) params.q = query;

    const res = await axios.get("https://api.jikan.moe/v4/anime", { params });

    const result = {
      data: res.data.data as Anime[],
      hasNext: !!res.data.pagination?.has_next_page,
    };

    if (!cache[cacheKey]) cache[cacheKey] = {};
    cache[cacheKey][page] = result;

    return result;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 429) {
        console.warn("Rate limited. Retrying after cooldown...");
        await new Promise((r) => setTimeout(r, RATE_LIMIT_DELAY * 2));

        try {
          const params: Record<string, any> = { page, limit: ANIME_PAGE_LIMIT };
          if (query) params.q = query;
          const res = await axios.get("https://api.jikan.moe/v4/anime", {
            params,
          });

          const result = {
            data: res.data.data as Anime[],
            hasNext: !!res.data.pagination?.has_next_page,
          };

          return result;
        } catch (retryErr) {
          return rejectWithValue("Still rate-limited after retry.");
        }
      }

      return rejectWithValue(err.message || "API request failed");
    }

    return rejectWithValue("Unexpected error occurred");
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
      state.list = [];
      state.hasNext = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimePage.fulfilled, (state, action) => {
        state.loading = false;

        const fetchedPage = action.meta.arg.page;
        const incoming = action.payload.data;

        // ✅ Replace list only on first page
        if (fetchedPage === 1) {
          state.list = incoming;
        } else {
          // ✅ Append new data
          state.list = [...state.list, ...incoming];
        }

        // ✅ Update page and hasNext
        state.page = fetchedPage;
        state.hasNext = !!action.payload.hasNext;
      })
      .addCase(fetchAnimePage.rejected, (state, action) => {
        state.loading = false;
        if (action.error.name === "CanceledError") {
          // Request canceled — ignore
        } else {
          state.error =
            action.payload ?? action.error.message ?? "Unknown error";
        }
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
