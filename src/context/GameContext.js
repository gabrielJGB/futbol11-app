import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [game,setGame] = useState(null)
    const [isHDselected, setIsHDselected] = useState(false)

    return (
        <GameContext.Provider value={{ game,setGame,isHDselected, setIsHDselected }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);


