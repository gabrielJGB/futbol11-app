import { View, Text, Image } from 'react-native'
import React from 'react'
import { useLeague } from '../../context/LeagueContext'
import { useTheme } from '../../context/ThemeContext'
import tw from 'twrnc'
import { get_logo } from '../../utils/match'

const LeagueHeader = () => {
    const { theme } = useTheme()
    const { league } = useLeague()
    const SIZE = 50

    return (
        <View style={tw`bg-[${theme.colors.card}] flex flex-row gap-2 items-center justify-center pb-1 px-16`}>

            {get_logo(league, SIZE)}

            <View style={tw`flex flex-row  gap-2 `}>
                <Text style={tw`text-[${theme.colors.text}] text-left text-[21px] font-semibold`}>{league.name.replace("Argentine", "")}</Text>
                <Text style={tw`self-end text-[${theme.colors.text}] font-semibold`}>{league.seasonDisplay}</Text>
            </View>
        </View>
    )
}

export default LeagueHeader