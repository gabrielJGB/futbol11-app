import React from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { get_status, translate_title } from '../../utils/match'
import { useTheme } from '../../context/ThemeContext'
import Team from './Team'

const GameCard = ({ game, isTournament }) => {

    const { theme } = useTheme()
    const navigation = useNavigation()
    const home = game.competitors.find(team => team.homeAway === "home")
    const away = game.competitors.find(team => team.homeAway === "away")


    const get_status_color = (status) => {

        switch (status) {
            case "pre":
                return theme.colors.text
            case "in":
                return theme.colors.textLive
            case "post":
                return theme.colors.text
        }
    }

    return (
        <TouchableNativeFeedback
            style={tw.style(`flex flex-col justify-start`)}
            onPress={() => navigation.navigate("Game", { id: game.id,video:false })}
        >
            <View style={tw`flex flex-col px-2 py-3`}>
                {
                    isTournament &&
                    <Text style={tw`text-[${theme.colors.text100}] text-xs`}>{translate_title(game.group.shortName)}</Text>
                }
                <View style={tw`flex flex-row gap-1 w-full `}>

                    <View style={tw.style(`w-[65%] flex flex-col py-3 `)}>
                        {<Team key={0} team={home} />}
                        {<Team key={1} team={away} />}
                    </View>

                    <View style={tw`w-[35%] flex flex-col justify-center gap-1 items-center`}>

                        <Text style={tw.style(`font-semibold text-center text-${game.fullStatus.type.state==="in"?"lg":"sm"} text-[${get_status_color(game.fullStatus.type.state)}]`)}>

                            {get_status(game.fullStatus.type, game.date)}

                        </Text>
                        {
                            "video" in game &&
                            <Button
                                labelStyle={{ fontSize: 14 }}
                                mode='outlined'
                                buttonColor={theme.colors.background}
                                textColor={theme.colors.text}
                                onPress={() => { navigation.navigate("Game", { id: game.id,video:true }) }}
                            >Videos</Button>
                        }


                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

export default GameCard