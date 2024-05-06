import React, { createContext, useContext, useState } from 'react';

const LeagueContext = createContext();

export const LeagueProvider = ({ children }) => {
    const [league, setLeague] = useState(false)
    


    return (
        <LeagueContext.Provider value={{ league, setLeague }}>
            {children}
        </LeagueContext.Provider>
    );
};

export const useLeague = () => useContext(LeagueContext);


