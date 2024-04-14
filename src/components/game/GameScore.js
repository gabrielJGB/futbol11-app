import { View, Text } from 'react-native'
import tw from 'twrnc'
import React from 'react'
import { get_status } from '../../utils/match'
import { useTheme } from '../../context/ThemeContext'

const GameScore = ({ score, shootout, status, date, homeWinner, awayWinner }) => {
    const { theme } = useTheme()

    return (
        <View style={tw`flex items-center gap-0`}>
            <View style={tw`flex flex-row gap-[2px]`}>
                <Text style={tw`text-[${homeWinner?theme.colors.accent100:theme.colors.text}] text-4xl`} >{score.home}</Text>
                <Text style={tw`text-[${theme.colors.text}] text-4xl`} >-</Text>
                <Text style={tw`text-[${awayWinner?theme.colors.accent100:theme.colors.text}] text-4xl`} >{score.away}</Text>
            </View>

            {
                shootout &&
                <Text style={tw`text-[${theme.colors.text}] text-sm`}>({shootout.home} - {shootout.away})</Text>
            }
            <View>
                <Text
                    style={tw.style(` text-white mt-2 rounded-sm py-[2px] bg-black px-1 font-semibold`, { "bg-red-700": status.state === "in" })}
                >
                    {get_status(status, date)}
                </Text>
            </View>
        </View>
    )
}

export default GameScore