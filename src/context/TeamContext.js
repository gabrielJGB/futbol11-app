import React, { createContext, useContext, useState } from 'react';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
    const [team, setTeam] = useState(null)
    const [selectedLeagueSlug, setSelectedLeagueSlug] = useState(null)
    const [selectedSeason, setSelectedSeason] = useState(null)




    return (
        <TeamContext.Provider value={{
            team, setTeam,
            selectedLeagueSlug, setSelectedLeagueSlug,
            selectedSeason, setSelectedSeason
        }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeam = () => useContext(TeamContext);


