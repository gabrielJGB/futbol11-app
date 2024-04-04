import { View, Text, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { get_logo } from '../../utils/match'
import { useTheme } from '../../context/ThemeContext'

const GameTeam = ({ team }) => {


const {theme} = useTheme()

    return (
        <TouchableNativeFeedback
            onPress={() => { }}
        >
            <View style={tw`w-[30%] rounded-sm p-1 flex flex-col justify-center items-center gap-1`}>
                {get_logo(team, 50)}
                <Text style={tw`text-[${theme.colors.text}] text-xs font-semibold text-center`}>{team.displayName}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default GameTeam