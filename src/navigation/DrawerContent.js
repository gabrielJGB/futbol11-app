import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { Alert, Share } from 'react-native';



const onShare = async () => {
    try {
        const result = await Share.share({
            url:"www.google.com.ar",
            title:"Compartilo",
            message:
                'Descarga FUTBOL 11: http://www.google.com.ar Resultados en vivo, partidos, ligas, jugadores',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        Alert.alert(error.message);
    }
};


const ThemeButton = ({ navigation }) => {
    const { toggleTheme } = useTheme()

    return (
        <DrawerItem
            label="Cambiar tema"
            onPress={() => {
                toggleTheme()
                navigation.dispatch(DrawerActions.closeDrawer());
            }} />
    );
};

const DrawerContent = ({ navigation }) => {

    const { isDakTheme, theme } = useTheme()

    return (
        <DrawerContentScrollView >

            {/* ITEMS EN EL MENU */}

            <DrawerItem
                label="Fútbol 11"
                pressColor={isDakTheme ? "white" : "black"}
                labelStyle={{ fontSize: 32, color: theme.colors.text }}
                onPress={() => navigation.navigate("Home")}
            />
            <DrawerItem label="Calendar" onPress={() => navigation.navigate("Calendar")} />
            <ThemeButton navigation={navigation} />
            <DrawerItem label="Compartir" onPress={onShare} />

        </DrawerContentScrollView>
    )
}


export default DrawerContent
