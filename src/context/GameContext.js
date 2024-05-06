import React, { createContext, useContext, useEffect, useState } from 'react';
import { useApp } from './AppContext';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [game, setGame] = useState(null)
    const [isHDselected, setIsHDselected] = useState(false)
    const [sofaId, setSofaId] = useState(false)
    const [video,setVideo] = useState(false)

    const { sofaEvents } = useApp()

    useEffect(() => {

        if (game) {

            const home = game.data.header.competitions[0].competitors[0].team
            const away = game.data.header.competitions[0].competitors[1].team


            const respId = sofaEvents.find(event =>
                (event.homeTeam.name.toLowerCase().trim() === home.displayName.toLowerCase().trim() ||
                event.homeTeam.shortName.toLowerCase().trim() === home.name.toLowerCase().trim() ||
                event.homeTeam.shortName.toLowerCase().trim() === home.name.toLowerCase().trim() ||
                event.homeTeam.nameCode.toLowerCase().trim() === home.abbreviation.toLowerCase().trim()) &&

                (event.awayTeam.name.toLowerCase().trim() === away.displayName.toLowerCase().trim() ||
                event.awayTeam.shortName.toLowerCase().trim() === away.name.toLowerCase().trim() ||
                event.awayTeam.name.toLowerCase().trim() === away.displayName.toLowerCase().trim() ||
                event.awayTeam.nameCode.toLowerCase().trim() === away.abbreviation.toLowerCase().trim())
            )


            setSofaId(respId != undefined ? respId.id : false)
        }
    }, [game])



    return (
        <GameContext.Provider value={{ game, setGame, isHDselected, setIsHDselected, sofaId,video,setVideo }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);


