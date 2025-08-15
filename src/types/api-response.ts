import type { Character } from "./api-response-character";
import type { Info } from "./api-response-info";

export interface APIResponse {
  info: Info;
  results: Character[];
}

export interface HandleCharactersResponse {
    characters : Character[],
    hasNextPage: boolean,
    hasPreviousPage: boolean,
}
