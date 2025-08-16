// src/components/RickMortyCard/RickMortyCard.tsx
import React from 'react';
import type { Character } from '../types/api-response-character';
import { useCharacterContext } from '../hooks/character-context';

interface Props {
  character: Character;
}

export const RickMortyCard: React.FC<Props> = ({ character }) => {
  const {setSelectedCharacter} = useCharacterContext();

  return (
    <div data-testid="card" style={{ border: '1px solid #ccc', padding: '1rem', width: '150px' }}>
      <img onClick={()=> setSelectedCharacter(character)} src={character.image} alt={character.name} style={{ width: '100%' }} />
      <h4>{character.name}</h4>
      <p>{character.species}</p>
      <p style={{ color: character.status === 'Alive' ? 'green' : 'red' }}>
        {character.status === 'Alive' ? 'Active' : 'Inactive'}
      </p>
    </div>
  );
};
