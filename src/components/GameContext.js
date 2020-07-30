import { createContext } from 'react';

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
};
