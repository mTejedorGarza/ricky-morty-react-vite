import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { HandleCharactersResponse } from "../../types/api-response";
import { initialRickyAndMortyState } from "./types/ricky-morty-state";

const rickyAndMortySlice = createSlice({
    name: 'rickyAndMorty',
    initialState:initialRickyAndMortyState,
    reducers:{
        loadCharacters:(state : any, _action: PayloadAction<string>) => {
            state.loading = true;

        },
        loadCharactersSuccess: (state: any, action: PayloadAction<HandleCharactersResponse>) => {
            state.characters = action.payload.characters;
            state.hasNextPage = action.payload.hasNextPage;
            state.hasPreviousPage = action.payload.hasPreviousPage;
            state.loading = false;
        },
        loadCharacterFailure: (state : any) => {
            state.loading = false;
        },
        nextPage: (_state) => {},
        prevPage: (_state) => {}
    }
});

export const { loadCharacters, loadCharactersSuccess, loadCharacterFailure, nextPage, prevPage } = rickyAndMortySlice.actions;
export default rickyAndMortySlice.reducer;

