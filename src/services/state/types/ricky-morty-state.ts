import type { HandleCharactersResponse } from "../../../types/api-response";

interface RickyAndMortyState {
    characters: HandleCharactersResponse['characters'];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    loading: boolean;
}

export const initialRickyAndMortyState: RickyAndMortyState = {
    characters: [],
    hasNextPage: false,
    hasPreviousPage: false,
    loading: false,
};

export const RICK_MORTY_BASE_URL = 'https://rickandmortyapi.com/api/character';