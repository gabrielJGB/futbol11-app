import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTheme } from '../../context/ThemeContext'

import { ActivityIndicator } from 'react-native-paper';
import HomeTeamTab from './tabs/HomeTeamTab';
import Roster from './tabs/RosterTab';
import ArticlesTab from './tabs/ArticlesTab';
import { useTeam } from '../../context/TeamContext';


const TeamTabsComponent = () => {
  const Tab = createMaterialTopTabNavigator();
  const { theme } = useTheme()
  const { team } = useTeam()

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


      backBehavior='none'

    >

      <Tab.Screen
        name="HomeTeam"
        component={HomeTeamTab}
        options={{
          title: "Fixture",
          lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />)

        }}

      />

      <Tab.Screen
        name="RosterTeam"
        component={Roster}
        options={{
          title: "Plantel",
          lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />)

        }}

      />

      {

        

        <Tab.Screen
          name="ArticlesTab"
          component={ArticlesTab}
          options={{
            title: "Noticias",
            lazy: true, lazyPlaceholder: () => (<ActivityIndicator color='white' style={{ marginTop: 20 }} />)

          }}

        />
      }



    </Tab.Navigator>


  )
}

export default TeamTabsComponent