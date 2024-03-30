import React from 'react'
import { View, Text } from 'react-native'
import tw from 'twrnc'
import GameCard from './GameCard'
import { useTheme } from '../../context/ThemeContext'
import { get_flag } from '../../utils/match'
import { Divider } from 'react-native-paper'

const LeagueCard = ({ league }) => {

    const { theme } = useTheme()

    return (
        <View style={tw`bg-[${theme.colors.card}] flex flex-col shadow-md`}>

            <View style={tw`flex flex-row justify-start items-center gap-2 px-2 min-h-[42px]`}>
                {get_flag(league, 30)}
                <Text style={tw`text-[${theme.colors.text}] font-semibold`}>{league.name.replace("Argentine", "").toUpperCase()}</Text>
            </View>

            {
                league.events.map((game, i) => (
                    <View key={i}>
                        <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[97%] mx-auto`}/>
                        <GameCard  game={game} isTournament={league.isTournament} />
                    </View>
                ))
            }



        </View>
    )
}

export default LeagueCard