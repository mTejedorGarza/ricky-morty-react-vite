import axios from 'axios'
import type { APIResponse, HandleCharactersResponse } from '../types/api-response';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const API_BASE = 'https://rickandmortyapi.com/api/character';

export class RickAndMortyService {
  private currentPage$ = new BehaviorSubject<string>(API_BASE);
  private nextUrl: string | null = null;
  private prevUrl: string | null = null;

  public characters$: Observable<HandleCharactersResponse> = this.currentPage$.pipe(
    switchMap(url => from(this.fetchCharacters(url)))
  );

  private async fetchCharacters(url: string): Promise<HandleCharactersResponse> {
    const response = await axios.get<APIResponse>(url);
    const data = response.data;

    this.nextUrl = data.info.next && data.info.next.trim() !== '' ? data.info.next : null;
    this.prevUrl = data.info.prev && data.info.prev.trim() !== '' ? data.info.prev : null;

    return {
      characters: data.results,
      hasNextPage: this.nextUrl !== null,
      hasPreviousPage: this.prevUrl !== null,
    };
  }

  public nextPage() {
    const url = this.nextUrl && this.nextUrl.trim() !== '' ? this.nextUrl : API_BASE;
    this.currentPage$.next(url);
  }

  public prevPage() {
    const url = this.prevUrl && this.prevUrl.trim() !== '' ? this.prevUrl : API_BASE;
    this.currentPage$.next(url);
  }
}

export const rickAndMortyService = new RickAndMortyService();