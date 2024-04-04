import { View, Text } from 'react-native'
import React from 'react'
import { CommentaryTab, InfoTab, LineupsTab, PrevTab, StatsTab, VideosTab } from './tabs/index'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTheme } from '../../context/ThemeContext'

const GameTabsComponent = () => {
  const Tab = createMaterialTopTabNavigator();
  const { theme } = useTheme()

  return (

    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: theme.colors.accent },
        tabBarLabelStyle: { textTransform: 'capitalize', fontSize: 14, minWidth: 70 },
        swipeEnabled: true,
        tabBarScrollEnabled: true,
        animationEnabled: true,
        tabBarItemStyle: { width: "auto", paddingHorizontal: 10 },
        tabBarGap: 10,
        tabBarStyle:{backgroundColor:theme.colors.background}
      }}
      
    >

      <Tab.Screen
        name="Info"
        component={InfoTab}
        options={{ title: "Información" }}

      />

      <Tab.Screen
        name="Lineups"
        component={LineupsTab}
        options={{ title: "Formaciones" }}

      />

      <Tab.Screen
        name="Prev"
        component={PrevTab}
        options={{ title: "Previa" }}

      />

      <Tab.Screen
        name="Stats"
        component={StatsTab}
        options={{ title: "Estadísticas" }}

      />

      <Tab.Screen
        name="Commentary"
        component={CommentaryTab}
        options={{ title: "Relato" }}

      />

      <Tab.Screen
        name="Videos"
        component={VideosTab}
        options={{ title: "Videos" }}

      />

    </Tab.Navigator>


  )
}

export default GameTabsComponent