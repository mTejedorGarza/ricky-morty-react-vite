// src/components/RickMortyTable/RickMortyTable.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../services/state/ricky-morty-store';
import { loadCharacters,nextPage,prevPage } from '../services/state/ricky-morty-slice'; 
import { RickMortyCard } from './ricky-morty-character-card';
import { useCharacterContext } from '../hooks/character-context';

export const RickMortyTable: React.FC = () => {
const dispatch = useDispatch<AppDispatch>();
const { characters, hasNextPage, hasPreviousPage, loading } = useSelector((state: RootState) => state.rickAndMorty);
const {selectedCharacter} = useCharacterContext();

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

      {selectedCharacter ? 
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <RickMortyCard key={selectedCharacter.id} character={selectedCharacter} />
        </div>
        : <p>Select a character to view details</p>
      }

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {characters.map((char) => (
          <RickMortyCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
};
