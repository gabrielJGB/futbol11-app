import { DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { Alert, Image, Share, Text, TouchableNativeFeedback, View } from 'react-native';
import { useEffect, useState } from 'react';
import { fetch_URL } from '../utils/fetch';
import leagues from '../../leagues.json'
import { Button, Divider, Icon, TextInput } from 'react-native-paper';
import tw from 'twrnc'
import { get_flag } from '../utils/match';
import icon from '../../assets/icon.png'

const onShare = async () => {
    try {
        const result = await Share.share({
            url: "https://www.futbol11.vercel.app",
            title: "Compartir",
            message:
                'Descarga Fútbol 11 en https://futbol11.vercel.app Resultados en vivo, información sobre partidos, ligas y jugadores',
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


// const ThemeButton = ({ navigation }) => {
//     const { toggleTheme } = useTheme()

//     return (
//         <DrawerItem
//             label="Cambiar tema"
//             onPress={() => {
//                 toggleTheme()
//                 navigation.dispatch(DrawerActions.closeDrawer());
//             }} />
//     );
// };

const DrawerContent = ({ navigation }) => {

    const { theme, toggleTheme } = useTheme()
    const [query, setQuery] = useState("")
    const { navigate, reset } = useNavigation()
    const SIZE = 50


    return (
        <DrawerContentScrollView >




            <TouchableNativeFeedback onPress={() => navigate("Home")}>
                <View style={tw`bg-[${theme.colors.card}] flex flex-row items-center gap-2 px-2 py-3 `}>
                    <Image source={icon} style={{ width: SIZE, height: SIZE }} />
                    <Text style={tw`text-[${theme.colors.text}] text-4xl font-semibold`}>Fútbol 11</Text>
                </View>
            </TouchableNativeFeedback>



            <TouchableNativeFeedback onPress={() => {
                toggleTheme()
                navigation.dispatch(DrawerActions.closeDrawer());
            }} >
                <View style={tw`flex flex-row items-center gap-2 px-2 py-3 `}>
                    <Icon source="theme-light-dark" size={22} color={theme.colors.text} />
                    <Text style={tw`text-[${theme.colors.text}]`}>Cambiar tema</Text>
                </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={onShare}>
                <View style={tw`flex flex-row items-center gap-2 px-2 py-3 `}>
                    <Icon source="share-variant" size={22} color={theme.colors.text} />
                    <Text style={tw`text-[${theme.colors.text}]`}>Compartir</Text>
                </View>
            </TouchableNativeFeedback>

            <View style={tw`px-1 mb-2`}>
                <TextInput
                    style={tw`bg-[${theme.colors.card100}]`}
                    textColor={theme.colors.text}
                    placeholderTextColor={theme.colors.text200}
                    underlineColor={theme.colors.accent}
                    selectionColor={theme.colors.accent}
                    underlineColorAndroid={theme.colors.accent}
                    activeUnderlineColor={theme.colors.accent}
                    placeholder="Buscar competición"
                    value={query.toLowerCase()}
                    onChangeText={text => setQuery(text.toLowerCase())}
                />
            </View>


            {
                leagues.filter(league =>
                    league.abbreviation.toLowerCase().includes(query) ||
                    league.name.toLowerCase().includes(query) ||
                    league.shortName.toLowerCase().includes(query) ||
                    league.slug.toLowerCase().includes(query) ||
                    league.slug.toLowerCase().includes(query.slice(0, 3))

                ).map((league, i) => (
                    <View key={i}>

                        <TouchableNativeFeedback
                            onPress={() => {
                                setQuery("")
                                navigation.navigate("Home")
                                navigation.navigate("League", { id: league.slug })
                            }}
                        >
                            <View style={tw`flex flex-row items-center gap-3 px-3 py-3`}>
                                {get_flag(league, 22)}
                                <Text style={tw`w-[85%] text-[${theme.colors.text}] font-semibold`} >{league.name}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[92%] mx-auto`} />
                    </View>
                ))
            }




            {/* ITEMS EN EL MENU */}
            {/* 
            <DrawerItem
                label="Fútbol 11"
                pressColor={isDakTheme ? "white" : "black"}
                labelStyle={{ fontSize: 32, color: theme.colors.text }}
                onPress={() => navigation.navigate("Home")}
            />

            


            {
                leagues &&
                leagues.map(league => (
                    <DrawerItem label={league.name.replace("Argentine", "")} onPress={() => { }} />

                ))
            } */}

            {/* 
            <ThemeButton navigation={navigation} />
            <DrawerItem label="Compartir" onPress={onShare} /> */}

        </DrawerContentScrollView>
    )
}


export default DrawerContent
