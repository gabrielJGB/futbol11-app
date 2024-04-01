import React from 'react'
import { CommentaryTab, InfoTab, LineupsTab, PrevTab, StatsTab, VideosTab } from './tabs/index'
import { useTheme } from '../../context/ThemeContext'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Text } from 'react-native'

const TabComponents = () => {

    const { theme } = useTheme()
    const Tab = createMaterialTopTabNavigator();

    return (
        

        
            <Tab.Navigator
                screenOptions={{
                    tabBarIndicatorStyle: { backgroundColor: theme.colors.accent },
                    tabBarLabelStyle: { textTransform: 'capitalize',fontSize:13 },
                    tabBarInactiveTintColor: "#DFDFDF",
                    swipeEnabled: true,
                    tabBarScrollEnabled: true,
                    animationEnabled: true,
                    tabBarBounces:true,
                    lazy:true
                    
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

export default TabComponents