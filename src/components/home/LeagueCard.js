import React, { useEffect, useState } from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import tw from 'twrnc'
import GameCard from './GameCard'
import { useTheme } from '../../context/ThemeContext'
import { get_flag, live_match } from '../../utils/match'
import { Button, Divider, Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const LeagueCard = ({ league, isSwitchOn, showOnlyLive }) => {

    const { theme } = useTheme()
    const navigation = useNavigation()
    const [isLeagueVisible, setIsLeagueVisible] = useState(isSwitchOn)


    useEffect(() => {

        setIsLeagueVisible(isSwitchOn ? false : true)

    }, [isSwitchOn])



    return (
        <View style={tw`bg-[${theme.colors.card}] ${showOnlyLive && !live_match(league) ? "hidden" : "flex"}  flex-col shadow shadow-black rounded-lg`}>


            <TouchableNativeFeedback
                onPress={() => setIsLeagueVisible(!isLeagueVisible)}
            >
                <View
                    style={tw`flex flex-row justify-between items-center px-2 py-3`}>
                    <View style={tw`flex flex-row items-center gap-2 `}>
                        {get_flag(league, 30)}
                        <Text style={tw`text-[${theme.colors.text}] font-semibold`}>{league.name.replace("Argentine", "").toUpperCase()} </Text>

                        <Text style={tw`text-[${theme.colors.text100}] `}>({league.events.length})</Text>
                        

                    </View>
                    <Icon source={`chevron-${isLeagueVisible ? "up" : "down"}`} size={20} color={theme.colors.text} />
                </View>

            </TouchableNativeFeedback>





            <View style={tw`${isLeagueVisible ? "" : "hidden"}`}>
                {
                    league.events.map((game, i) => (
                        <View key={i}>

                            <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[97%] mx-auto`} />

                            <GameCard
                                id={game.id}
                                home={game.competitors.find(team => team.homeAway === "home")}
                                away={game.competitors.find(team => team.homeAway === "away")}
                                status={game.fullStatus}
                                tournament={league.isTournament && game.group.shortName}
                                date={game.date}
                                video={"video" in game ? game.video : false}
                                dateString={false}
                                showOnlyLive={showOnlyLive}
                            />
                        </View>
                    ))
                }

                <View style={tw`flex flex-col gap-3 w-full px-1 pb-2 `}>

                    <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[97%] mx-auto`} />

                    <View style={tw`flex flex-row items-center justify-center`}>
                        <Button
                            buttonColor="transparent"
                            style={tw`border-0`}
                            onPress={() => navigation.navigate("League", { id: league.slug })}

                        >
                            <View style={tw`flex flex-row items-center gap-2`}>
                                <Text style={tw`text-[${theme.colors.text}]`}> Calendario completo</Text>
                                <Icon source="chevron-right" size={19} color={theme.colors.text100} />
                            </View>
                        </Button>
                    </View>
                </View>



            </View>



        </View>
    )
}

export default LeagueCard