import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Venue, Country } from './type';

interface VenueSliceState {
    countriesList: Country[];
    stateList: string[];
    suburbsList: string[];
    venueList: Venue[];
}

const initialState: VenueSliceState = {
    countriesList: [],
    stateList: [],
    suburbsList: [],
    venueList: [],
};

const venueSlice = createSlice({
    name: 'venue',
    initialState,
    reducers: {
        setCountriesListAction: (state, action: PayloadAction<Country[]>) => {
            state.countriesList = action.payload;
        },
        setStateListAction: (state, action: PayloadAction<string[]>) => {
            state.stateList = action.payload;
        },
        setSuburbsListAction: (state, action: PayloadAction<string[]>) => {
            state.suburbsList = action.payload;
        },
        setVenueListAction: (state, action: PayloadAction<Venue[]>) => {
            state.venueList = action.payload;
        },
    },
});

export const {
    setCountriesListAction,
    setStateListAction,
    setSuburbsListAction,
    setVenueListAction,
} = venueSlice.actions;
export default venueSlice.reducer;
