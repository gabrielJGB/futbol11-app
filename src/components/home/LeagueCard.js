import React from 'react'
import { View, Text } from 'react-native'
import tw from 'twrnc'
import GameCard from '../game/GameCard'
import { useTheme } from '../../context/ThemeContext'
import { get_flag } from '../../utils/match'

const LeagueCard = ({ league }) => {

    const { theme } = useTheme()

    return (
        <View style={tw.style(`bg-[${theme.colors.card}]`,"flex flex-col px-2  shadow-md")}>
            <View style={tw`flex flex-row justify-center items-center gap-2 py-3`}>
                { get_flag(league,20) }
                <Text style={tw`text-white`}>{league.name.replace("Argentine", "").toUpperCase()}</Text>
            </View>

            {
                league.events.map((game,i) => (
                    <GameCard key={i} game={game} isTournament={league.isTournament}/>
                ))
            }



        </View>
    )
}

export default LeagueCard