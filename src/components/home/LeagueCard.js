import React, { useEffect, useState } from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import tw from 'twrnc'
import GameCard from './GameCard'
import { useTheme } from '../../context/ThemeContext'
import { get_flag } from '../../utils/match'
import { Button, Divider, Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const LeagueCard = ({ league, isSwitchOn }) => {

    const { theme } = useTheme()
    const navigation = useNavigation()
    const [isLeagueVisible, setIsLeagueVisible] = useState(isSwitchOn)


    useEffect(() => {

        setIsLeagueVisible(isSwitchOn ? true : false)

    }, [isSwitchOn])


    return (
        <View style={tw`bg-[${theme.colors.card}] flex flex-col shadow-md`}>


            <TouchableNativeFeedback
                onPress={() => setIsLeagueVisible(!isLeagueVisible)}
            >
                <View
                    style={tw`flex flex-row justify-between items-center px-2 py-3`}>
                    <View style={tw`flex flex-row items-center gap-2 `}>
                        {get_flag(league, 30)}
                        <Text style={tw`text-[${theme.colors.text}] font-semibold`}>{league.name.replace("Argentine", "").toUpperCase()}</Text>
                    </View>
                    <Icon source={`chevron-${isLeagueVisible ? "up" : "down"}`} size={20} color={theme.colors.text} />
                </View>

            </TouchableNativeFeedback>




            <View style={tw`${isLeagueVisible ? "" : "hidden"}`}>
                {
                    league.events.map((game, i) => (
                        <View key={i}>
                            <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[97%] mx-auto`} />
                            <GameCard game={game} isTournament={league.isTournament} />
                        </View>
                    ))
                }

                <View style={tw`py-3 mx-auto`}>

                    <Button
                        buttonColor="transparent"
                        textColor={theme.colors.text}
                        style={tw`w-[50%]`}
                        mode='outlined'
                        onPress={() => navigation.navigate("League",{ id: league.slug})}
                        
                    >Ver Competición</Button>

                </View>



            </View>



        </View>
    )
}

export default LeagueCard