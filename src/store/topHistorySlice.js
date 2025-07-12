import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchCountries = createAsyncThunk("topHistory/fetchCountries", async () => {
    const res = await api.getCountries();
    return res.data;
});

export const fetchCategories = createAsyncThunk("topHistory/fetchCategories", async () => {
    const res = await api.getCategories();
    return res.data;
});

export const fetchChartData = createAsyncThunk(
    "topHistory/fetchChartData",
    async ({ countryId, period }) => {
        const res = await api.getChartData(countryId, period);
        return res.data;
    }
);

const topHistorySlice = createSlice({
    name: "topHistory",
    initialState: {
        countries: [],
        categories: [],
        selectedCountry: null,
        selectedPeriod: { start: null, end: null },
        chartData: {},
        visibleCategories: [],
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedCountry(state, action) {
            state.selectedCountry = action.payload;
        },
        setSelectedPeriod(state, action) {
            state.selectedPeriod = action.payload || { start: null, end: null };
        },
        toggleCategoryVisibility(state, action) {
            const id = action.payload;
            if (state.visibleCategories.includes(id)) {
                state.visibleCategories = state.visibleCategories.filter(catId => catId !== id);
            } else {
                state.visibleCategories.push(id);
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCountries.pending, state => { state.loading = true; })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.countries = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.visibleCategories = action.payload.map(cat => cat.id);
            })
            .addCase(fetchChartData.fulfilled, (state, action) => {
                state.chartData = action.payload;
            })
            .addMatcher(
                action => action.type.endsWith("rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                }
            );
    }
});

export const { setSelectedCountry, setSelectedPeriod, toggleCategoryVisibility } = topHistorySlice.actions;
export default topHistorySlice.reducer;
