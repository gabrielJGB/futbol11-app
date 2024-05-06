import { useRoute } from '@react-navigation/native';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [sofaEvents, setSofaEvents] = useState(false)
    const [sofaDate, setSofaDate] = useState(false)


    return (
        <AppContext.Provider value={{ sofaEvents, setSofaEvents, sofaDate, setSofaDate }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
