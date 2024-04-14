import React from 'react'
import { View, Text, Image } from 'react-native'
import tw from 'twrnc'
import { useTheme } from '../../../context/ThemeContext'
import { useGame } from '../../../context/GameContext'
import { DataTable } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { logo_404 } from '../../../../assets'
// import { get_logo } from '../../../utils/match'

const get_logo = (team) => {
    const SIZE = 19
    let logo = team.logo ? team.logo[0].href : false

    if (logo) {
        logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
        logo += `&h=${SIZE + 5}&w=${SIZE + 5}`
    }
    return logo ? <Image source={{ uri: logo }} width={SIZE} height={SIZE} /> : <Image source={logo_404} style={{ width: SIZE, height: SIZE }} />
}

const Table = ({ entries, awayId, homeId }) => {
    const { theme, isDarkMode } = useTheme()
    const var_width = 1.5
    const cellStyle = { flex: var_width, borderRightWidth: 1, borderColor: theme.colors.border }

    const highlight_team = (id) => {
        return id === awayId || id === homeId ? theme.colors.card100 : theme.colors.card

    }

    return (

        <DataTable >
            <DataTable.Header  style={{ backgroundColor: (isDarkMode ? "black" : "white") }}>

                <DataTable.Title style={{ flex: 1 }}>
                    <Text style={tw`text-[${theme.colors.text}]  text-center w-full`}>#</Text>
                </DataTable.Title >
                <DataTable.Title style={{ flex: 7 }}>
                    <Text style={tw`text-[${theme.colors.text}] text-center w-full`}>Equipo</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={tw`text-[${theme.colors.text}] text-center w-full`}>Pts</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={tw`text-[${theme.colors.text}] text-center w-full`}>PJ</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={tw`text-[${theme.colors.text}] text-center w-full`}>PG</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={tw`text-[${theme.colors.text}] text-center w-full`}>PE</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={tw`text-[${theme.colors.text}] text-center w-full`}>PP</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={tw`text-[${theme.colors.text}] text-center`}>Dif</Text>
                </DataTable.Title>

            </DataTable.Header>



            {
                entries.map((team, i) => (
                    <DataTable.Row key={i}  style={tw`border-b-[1px] border-[${theme.colors.border}] bg-[${highlight_team(typeof (team.team) === "object" ? team.team.id : team.id)}]`}>

                        <DataTable.Cell style={{ flex: 1, borderRightWidth: 1, borderColor: theme.colors.border }}>

                            <Text style={tw`text-[${theme.colors.text}] w-full`}>
                                {team.stats.find(stat => stat.name === "rank").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 7, borderRightWidth: 1, borderColor: theme.colors.border }}>
                            <View style={tw`flex flex-row gap-1 items-center w-[80%] px-1 `}>
                                {get_logo(team)}
                                <Text style={tw`text-[${theme.colors.text}]  text-xs `} numberOfLines={1}>
                                    {typeof (team.team) === "object" ? team.team.shortDisplayName : team.team}
                                </Text>
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={cellStyle}>
                            <Text style={tw`text-[${theme.colors.text}] text-center text-xs w-full font-semibold`}>
                                {team.stats.find(stat => stat.name === "points").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={cellStyle}>
                            <Text style={tw`text-[${theme.colors.text}] text-center text-xs w-full`}>
                                {team.stats.find(stat => stat.name === "gamesPlayed").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={cellStyle}>
                            <Text style={tw`text-[${theme.colors.text}] text-center text-xs w-full`}>
                                {team.stats.find(stat => stat.name === "wins").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={cellStyle}>
                            <Text style={tw`text-[${theme.colors.text}] text-center text-xs w-full`}>
                                {team.stats.find(stat => stat.name === "ties").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={cellStyle}>
                            <Text style={tw`text-[${theme.colors.text}] text-center text-xs w-full`}>
                                {team.stats.find(stat => stat.name === "losses").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: var_width }}>
                            <Text style={tw`text-[${theme.colors.text}] text-center text-xs w-full`}>
                                {team.stats.find(stat => stat.name === "pointDifferential").value}
                            </Text>
                        </DataTable.Cell>
                    </DataTable.Row>

                ))
            }

        </DataTable>
    )
}


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