import React from 'react'
import { CommentaryTab, InfoTab, LineupsTab, PrevTab, StatsTab, VideosTab } from './tabs/index'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTheme } from '../../context/ThemeContext'
import PenaltiesTab from './tabs/PenaltiesTab';
import { ActivityIndicator } from 'react-native-paper';
import PositionsTab from './tabs/PositionsTab';

const GameTabsComponent = ({ tabs, video }) => {
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

      // initialRouteName={video ? "Videos" : ""}
      initialRouteName='Info'
      backBehavior='none'

    >

      <Tab.Screen
        name="Info"
        component={InfoTab}
        options={{ title: "Resumen", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

      />

      <Tab.Screen
        name="Prev"
        component={PrevTab}
        options={{ title: "Previa", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

      />

      {
        tabs.penales &&
        <Tab.Screen
          name="Penalties"
          component={PenaltiesTab}
          options={{ title: "Penales", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

        />
      }

      {
        tabs.formaciones &&
        <Tab.Screen
          name="Lineups"
          component={LineupsTab}
          options={{ title: "Formaciones", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

        />
      }



      {
        tabs.relato &&
        <Tab.Screen
          name="Commentary"
          component={CommentaryTab}
          options={{ title: "Relato", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

        />
      }

      {
        tabs.estadisticas &&
        <Tab.Screen
          name="Stats"
          component={StatsTab}
          options={{ title: "Estadísticas", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

        />
      }

      {
        tabs.posiciones &&
        <Tab.Screen
          name="Positions"
          component={PositionsTab}
          options={{ title: "Posiciones", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

        />
      }

      {
        tabs.videos &&

        <Tab.Screen
          name="Videos"
          component={VideosTab}
          options={{ title: "Videos", lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />) }}

        />
      }

    </Tab.Navigator>


  )
}

export default GameTabsComponent