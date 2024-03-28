import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import tw from 'twrnc'
import { get_logo } from '../../utils/match'

const Team = ({ team }) => {

    const { theme } = useTheme()

    return (
        <View style={tw.style(`border-[${team.winner ? theme.colors.border100 : theme.colors.border}]`, `flex flex-row justify-between items-center py-[2px] pr-2 border-r-[2px]`)}>

            <View style={tw`flex flex-row flex-wrap gap-2 items-center`} >
                { get_logo(team,22) }
                <Text style={tw.style(`text-[${theme.colors.text}]`, `text-sm`, team.winner && "font-semibold")}>{team.name}</Text>
            </View>

            <View style={tw.style(`flex flex-row items-end`)}>
                <Text style={tw.style(`text-[${theme.colors.text}]`, ` text-lg font-semibold`)}>{team.score}</Text>
                {
                    "shootoutScore" in team &&
                    <Text style={tw.style(`text-[${theme.colors.text100}] text-xs `)}>{team.shootoutScore}</Text>
                }
            </View>
        </View>
    )
}

export default Team