import React, { useEffect, useState } from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import tw from 'twrnc'
import GameCard from './GameCard'
import { useTheme } from '../../context/ThemeContext'
import { get_flag } from '../../utils/match'
import { Button, Divider } from 'react-native-paper'

const LeagueCard = ({ league, isSwitchOn }) => {

    const { theme } = useTheme()
    const [isLeagueVisible, setIsLeagueVisible] = useState(isSwitchOn)


    useEffect(() => {

        setIsLeagueVisible(isSwitchOn ? true : false)

    }, [isSwitchOn])


    return (
        <View style={tw`bg-[${theme.colors.card}] flex flex-col shadow-md`}>

            <View style={tw`flex flex-row w-full `}>
                <TouchableNativeFeedback
                    style={tw`flex flex-row self-stretch w-full`}
                    onPress={() => { }}
                >
                    <View 
                        style={tw`flex flex-row items-center gap-2 pl-2 w-[80%]`}>
                        {get_flag(league, 30)}
                        <Text style={tw`text-[${theme.colors.text}] font-semibold`}>{league.name.replace("Argentine", "").toUpperCase()}</Text>
                    </View>

                </TouchableNativeFeedback>

                <Button
                    buttonColor={theme.colors.card}
                    textColor={theme.colors.text}
                    style={tw`rounded-0 w-[20%]`}
                    rippleColor={theme.colors.card100}
                    contentStyle={{ flexDirection: 'row-reverse', paddingVertical: 5 }}
                    onPress={() => { setIsLeagueVisible(!isLeagueVisible) }}
                    icon={`chevron-${isLeagueVisible ? "up" : "down"}`}
                ></Button>

            </View>


            <View style={tw`${isLeagueVisible ? "" : "hidden"}`}>
                {
                    league.events.map((game, i) => (
                        <View key={i}>
                            <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[97%] mx-auto`} />
                            <GameCard game={game} isTournament={league.isTournament} />
                        </View>
                    ))
                }

            </View>

        </View>
    )
}

export default LeagueCard