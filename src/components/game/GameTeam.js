import { View, Text, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { get_logo } from '../../utils/match'
import { useTheme } from '../../context/ThemeContext'
import { useNavigation } from '@react-navigation/core'

const GameTeam = ({ team, league_slug, season }) => {

    const { theme } = useTheme()
    const navigation = useNavigation()


    return (
        <TouchableNativeFeedback
            style={tw`rounded-lg`}
            onPress={() => navigation.push("Team", { team_id: team.id, league_slug, season })}
        >
            <View style={tw`w-[30%] rounded-lg p-0 flex flex-col justify-center items-center gap-1`}>
                {get_logo(team, 42)}
                <Text style={tw`text-[${theme.colors.text}] text-xs font-semibold text-center`}>{team.shortDisplayName}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default GameTeam