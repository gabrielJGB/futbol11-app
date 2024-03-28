import { NavigationContainer } from '@react-navigation/native';
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';


import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import DrawerContent from './DrawerContent';

import HomeScreen from '../screens/HomeScreen';


const RootNavigator = () => {
    const Drawer = createDrawerNavigator()
    const Stack = createStackNavigator();

    const { theme, isDarkMode } = useTheme()


    const MainStack = () => {

        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        headerShadowVisible: false,
                        headerTitleAlign: "center",
                        title: 'Inicio',
                        headerLeft: () => (
                            <DrawerToggleButton tintColor={theme.colors.text} />
                        ),

                    })}
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
                screenOptions={{ headerShown: false, drawerType: "slide" }}

            >
                <Drawer.Screen name="MainStack" component={MainStack} />
            </Drawer.Navigator>

        </NavigationContainer>
    )
}


export default RootNavigator
