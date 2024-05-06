import { NavigationContainer } from '@react-navigation/native';
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';


import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import DrawerContent from './DrawerContent';

import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import LeagueScreen from '../screens/LeagueScreen';
import PlayerScreen from '../screens/PlayerScreen';
import TeamScreen from '../screens/TeamScreen';
import { Text } from 'react-native';
import ArticleScreen from '../screens/ArticleScreen';
import VideoScreen from '../screens/VideoScreen';


const RootNavigator = () => {
    const Drawer = createDrawerNavigator()
    const Stack = createStackNavigator();

    const { theme, isDarkMode } = useTheme()


    const MainStack = () => {

        return (
            <Stack.Navigator


            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        headerShadowVisible: false,
                        headerTitleAlign: "center",
                        title: 'Fútbol 11',
                        headerLeft: () => (
                            <DrawerToggleButton tintColor={theme.colors.text} />
                        ),

                    })}
                />

                <Stack.Screen
                    name="Game"
                    component={GameScreen}
                    options={{
                        headerShadowVisible: false,
                    }}

                />

                <Stack.Screen
                    name="League"
                    component={LeagueScreen}
                    options={{
                        headerShadowVisible: false,
                    }}

                />

                <Stack.Screen
                    name="Player"
                    component={PlayerScreen}
                    options={{
                        headerShadowVisible: false,
                        title:""    
                    }}

                />

                <Stack.Screen
                    name="Team"
                    component={TeamScreen}
                    options={{ title: "" }}

                />


                <Stack.Screen
                    name="Article"
                    component={ArticleScreen}
                    options={{ title: "" }}

                />


                  <Stack.Screen
                    name="Video"
                    component={VideoScreen}
                    options={{ title: "" }}

                />


            </Stack.Navigator>
        )
    }


    return (
        <NavigationContainer theme={theme} >
            <StatusBar style={isDarkMode ? "light" : "dark"} backgroundColor={theme.colors.card} />

            <Drawer.Navigator
                drawerContent={props => <DrawerContent {...props} />}
                initialRouteName='MainStack'
                screenOptions={{ headerShown: false, drawerType: "front" }}
                backBehavior='history'

            >
                <Drawer.Screen name="MainStack" component={MainStack} />
            </Drawer.Navigator>

        </NavigationContainer>
    )
}


export default RootNavigator
