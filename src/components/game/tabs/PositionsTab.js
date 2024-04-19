import React from 'react'
import { View, Text, Image } from 'react-native'
import tw from 'twrnc'
import { useTheme } from '../../../context/ThemeContext'
import { useGame } from '../../../context/GameContext'

import { ScrollView } from 'react-native-gesture-handler'
import { logo_404 } from '../../../../assets'
import Table from '../../Table'
// import { get_logo } from '../../../utils/match'




const PositionsTab = () => {
    const { game } = useGame()
    const { theme } = useTheme()
    const groups = game.data.standings.groups
    const homeId = game.data.boxscore?.teams[0].team.id
    const awayId = game.data.boxscore?.teams[1].team.id

    return (
        <ScrollView style={tw`mx-1`}>
            <View style={tw`mt-2 mb-20`}>
                <View style={tw`flex flex-col gap-2 `}>
                    {
                        groups.map((group, i) => (
                            <View key={i} style={tw`flex flex-col w-full gap-2`}>
                                <Text style={tw`text-[${theme.colors.text}] text-lg text-center`}>{group.header}</Text>
                                <Table entries={group.standings.entries} homeId={homeId} awayId={awayId} />

                            </View>
                        ))
                    }

                </View>
            </View>
        </ScrollView>
    )
}

export default PositionsTab