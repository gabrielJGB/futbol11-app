import React, { createContext, useState, useContext, useEffect } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);


    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };



    const CustomDarkTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            text: '#ffffff',
            background: '#000000',
            primary: '#ffffff',
            card: '#232323',
            card100:"#383636",
            border: '#454545',
            border100: '#C2C2C2',
            notification: 'rgb(255, 69, 58)',
            secondary: '#215e40',
            accent: '#1D769F',
            textLive: '#FF3434',
            text100:"#C3C3C3",
            text200: '#A0A0A0'

        },

    };

    const CustomLightTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            text: '#000000',
            background: "#E7E7E7",
            card: "#FFFFFF",
            card100:"#E1E1E1",
            border: "#E6E6E6",
            border100: "#959595",
            textLive: '#FF3434',
            text100:"#161616",
            text200: '#1F1F1F',
            accent: '#316a8c',

        },

    };




    const theme = isDarkMode ? CustomDarkTheme : CustomLightTheme;


    return (
        <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);


