// CharacterContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { Character } from "../types/api-response-character";

type CharacterContextType = {
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <CharacterContext.Provider value={{ selectedCharacter, setSelectedCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};

// Hook para usar el contexto
export const useCharacterContext = () => {
  const ctx = useContext(CharacterContext);
  if (!ctx) {
    throw new Error("useCharacterContext debe usarse dentro de CharacterProvider");
  }
  return ctx;
};
