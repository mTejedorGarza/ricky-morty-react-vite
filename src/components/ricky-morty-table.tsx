// src/components/RickMortyTable/RickMortyTable.tsx
import React, { useEffect, useState } from 'react';
import type { Character } from '../types/api-response-character';
import { RickMortyCard } from '../components/ricky-morty-character-card';
import type { HandleCharactersResponse } from '../types/api-response';
import { rickAndMortyService } from '../services/ricky-morty-service';
import { Subscription } from 'rxjs';

export const RickMortyTable: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  useEffect(() => {
    const sub: Subscription = rickAndMortyService.characters$.subscribe({
      next: (data: HandleCharactersResponse) => {
        setCharacters(data.characters);
        setHasNext(data.hasNextPage);
        setHasPrev(data.hasPreviousPage);
        setLoading(false);
      },
      error: (err) => console.error(err),
    });

    return () => sub.unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => rickAndMortyService.prevPage()} disabled={!hasPrev}>
          Prev
        </button>
        <button onClick={() => rickAndMortyService.nextPage()} disabled={!hasNext}>
          Next
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {characters.map((char) => (
          <RickMortyCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
};
