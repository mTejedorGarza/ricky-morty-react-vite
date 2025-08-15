// src/components/RickMortyTable/RickMortyTable.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../services/state/ricky-morty-store';
import { loadCharacters,nextPage,prevPage } from '../services/state/ricky-morty-slice'; 
import { RickMortyCard } from './ricky-morty-character-card';

export const RickMortyTable: React.FC = () => {
const dispatch = useDispatch<AppDispatch>();
const { characters, hasNextPage, hasPreviousPage, loading } = useSelector((state: RootState) => state.rickAndMorty);

  useEffect(() => {
     dispatch(loadCharacters('First Load'));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => dispatch(prevPage())} disabled={!hasPreviousPage}>
          Prev
        </button>
        <button onClick={() => dispatch(nextPage())} disabled={!hasNextPage}>
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
