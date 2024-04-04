import { View, Text } from 'react-native'
import tw from 'twrnc'
import React from 'react'
import { get_status } from '../../utils/match'
import { useTheme } from '../../context/ThemeContext'

const GameScore = ({ score, shootout,status, date }) => {
    const {theme} = useTheme()

    return (
        <View style={tw`flex items-center gap-0`}>
            <Text style={tw`text-white text-4xl `}>{score.home} - {score.away}</Text>
            {
                shootout &&
                    <Text style={tw`text-[${theme.colors.text}] text-sm`}>({shootout.home} - {shootout.away})</Text>
            }
            <View>
                <Text
                    style={tw.style(`text-white mt-2 rounded-sm py-[2px] bg-black px-[4px] font-semibold`, { "bg-red-700": status.state === "in" })}
                >
                    {get_status(status, date)}
                </Text>
            </View>
        </View>
    )
}

export default GameScore