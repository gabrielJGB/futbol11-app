import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ActivityIndicator } from 'react-native-paper';
import ArticlesTab from './tabs/ArticlesTab';
import InfoTab from './tabs/InfoTab';
import HistoryTab from './tabs/HistoryTab';
import StatsTab from './tabs/StatsTab';
import VideosTab from './tabs/VideosTab';
import { usePlayer } from '../../context/PlayerContext';



const PlayerTabsComponent = () => {
    const Tab = createMaterialTopTabNavigator();
    const { player } = usePlayer()
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

            initialRouteName="Info"
            backBehavior='none'

        >


            <Tab.Screen
                name="Info"
                component={InfoTab}
                options={{ title: "Información", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

            />
            
            {
                "statistics" in player &&  Object.keys(player.statistics).length != 0 &&
                <Tab.Screen
                    name="Stats"
                    component={StatsTab}
                    options={{ title: "Estadísticas", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

                />
            }

            {
                player.teamHistory &&
                <Tab.Screen
                    name="History"
                    component={HistoryTab}
                    options={{ title: "Trayectoria", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

                />
            }

            <Tab.Screen
                name="Articles"
                component={ArticlesTab}
                options={{ title: "Noticias", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

            />
            {
                player.videos &&
                <Tab.Screen
                    name="VideosTab"
                    component={VideosTab}
                    options={{ title: "Videos", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

                />
            }


        </Tab.Navigator>

    )
}

export default PlayerTabsComponent