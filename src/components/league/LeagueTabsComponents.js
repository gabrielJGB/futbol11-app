import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import HomeLeagueTab from './tab/HomeLeagueTab';
import CalendarLeagueTab from './tab/CalendarLeagueTab';
import TeamsLeagueTab from './tab/TeamsLeagueTab';


const LeagueTabsComponent = ({ tabs, video }) => {
    const Tab = createMaterialTopTabNavigator();
    const { theme } = useTheme()


    return (

        <Tab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: theme.colors.accent },
                tabBarLabelStyle: { textTransform: 'uppercase', fontSize: 12, fontWeight: 500, minWidth: 70 },
                swipeEnabled: true,
                tabBarScrollEnabled: true,
                animationEnabled: true,
                tabBarItemStyle: { width: "auto" },
                tabBarGap: 5,
                tabBarStyle: { backgroundColor: theme.colors.card, elevation: 15, borderBottomWidth: 1, borderBottomColor: theme.colors.background },
                tabBarShadowStyle: { borderBottomWidth: 1, borderBottomColor: 'black' },

            }}

            initialRouteName={video ? "Videos" : ""}
            backBehavior='none'

        >

            <Tab.Screen
                name="HomeLeague"
                component={HomeLeagueTab}
                options={{ title: "Eventos", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

            />

            <Tab.Screen
                name="CalendarLeague"
                component={CalendarLeagueTab}
                options={{ title: "Calendario", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

            />

            <Tab.Screen
                name="TeamsLeague"
                component={TeamsLeagueTab}
                options={{ title: "Equipos", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

            />



        </Tab.Navigator>


    )
}

export default LeagueTabsComponent