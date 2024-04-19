import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useLeague } from '../../../context/LeagueContext'
import { useTheme } from '../../../context/ThemeContext'
import tw from 'twrnc'
import Table from '../../Table'

const PositionsLeagueTab = () => {
    const { league } = useLeague()
    const { theme } = useTheme()


    return (
        <ScrollView>
            <View style={tw`mx-1 mb-20 mt-2`}>

                <View style={tw`flex flex-col gap-4`}>

                    {
                        league.standings.map((table,i) => (
                            <View key={i} style={tw`flex flex-col w-full gap-2`}>
                                <Text style={tw`text-[${theme.colors.text}] text-lg text-center font-semibold`}>{table.name}</Text>
                                <Table entries={table.standings.entries} homeId={false} awayId={false} />
                            </View>
                        ))
                    }

                </View>

            </View>
        </ScrollView>
    )
}

export default PositionsLeagueTab