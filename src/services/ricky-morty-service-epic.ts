import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import axios from 'axios';
import { 
  loadCharacters,
  loadCharactersSuccess,
  loadCharacterFailure,
  nextPage,
  prevPage 
} from './state/ricky-morty-slice';
import type { APIResponse } from '../types/api-response';
import type { RootState } from './state/ricky-morty-store';
import { RICK_MORTY_BASE_URL } from './state/types/ricky-morty-state';

let nextPageURL = '';
let prevPageURL = '';

const fetchCharacters = (url: string) =>
  from(axios.get<APIResponse>(url)).pipe(
    map((res) =>{
      nextPageURL = res.data.info.next || '';
      prevPageURL = res.data.info.prev || '';
      return loadCharactersSuccess({
        characters: res.data.results,
        hasNextPage: !!(res.data.info.next && res.data.info.next.trim().length > 0),
        hasPreviousPage: !!(res.data.info.prev && res.data.info.prev.trim().length > 0),
      })
    }),
    catchError((err) => {
      console.error('Error fetching characters:', err);
      return of(loadCharacterFailure(err.message));
    } 
  ));

export const loadCharactersEpic = (action$: any) =>
  action$.pipe(
    ofType(loadCharacters.type),
    mergeMap(() => fetchCharacters(RICK_MORTY_BASE_URL))
  );

export const nextPageEpic = (action$: any, state$: any) =>
  action$.pipe(
    ofType(nextPage.type),
    mergeMap(() => {
      const next = (state$.value as RootState).rickAndMorty.hasNextPage;
      return fetchCharacters(next ? nextPageURL : RICK_MORTY_BASE_URL);
    })
  );

export const prevPageEpic  = (action$: any, state$: any) =>
  action$.pipe(
    ofType(prevPage.type),
    mergeMap(() => {
      const prev = (state$.value as RootState).rickAndMorty.hasPreviousPage;
      return fetchCharacters(prev ? prevPageURL : RICK_MORTY_BASE_URL);
    })
  );

export const rickAndMortyEpics = [loadCharactersEpic, nextPageEpic, prevPageEpic];