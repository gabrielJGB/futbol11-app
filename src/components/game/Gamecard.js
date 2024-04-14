import { View, Text, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useTheme } from '../../context/ThemeContext'
import { get_logo } from '../../utils/match'
import { convert_timestamp } from '../../utils/time'





const Gamecard = ({ game, team, navigation, teamHistory }) => {
    const { theme } = useTheme()
    const isTeamHome = game.atVs === "vs"
    const homeWinner = game.gameResult === "G" && isTeamHome || game.gameResult === "P" && !isTeamHome
    const awayWinner = game.gameResult === "P" && isTeamHome || game.gameResult === "G" && !isTeamHome
    const date = convert_timestamp(game.gameDate)

    const Team = ({ team, score, shootoutScore, winner, tie }) => {

        const get_border_color = () => {

            if (teamHistory) {
                if (game.gameResult === "G")
                    return "#00AD38"
                else if (game.gameResult === "E")
                    return "#E5FF1A"
                else if (game.gameResult === "P")
                    return "#FF1E2F"
            } else {
                if (winner)
                    return theme.colors.border100
                else
                    return theme.colors.border

            }

        }

        return (

            <View style={tw`flex flex-row justify-between items-center w-full pr-2 border-[${get_border_color()}] border-r-[2px]`} >

                <View style={tw`flex flex-row gap-2 py-1 w-[70%]`}>
                    {get_logo(team, 22)}

                    <Text
                        numberOfLines={1}
                        style={tw`text-sm text-[${theme.colors.text}]`}
                    >
                        {team.displayName}
                    </Text>
                </View>
                <View style={tw.style(`flex flex-row items-end gap-[3px] `)}>
                    <Text style={tw`text-[${theme.colors.text}] text-lg`}>{score}</Text>
                    <Text style={tw.style(`text-[${theme.colors.text200}] text-xs `)}>{shootoutScore}</Text>
                </View>
            </View>
        )
    }

    return (
        <TouchableNativeFeedback
            style={tw.style(`flex flex-col`)}
            onPress={() => { navigation.push("Game", { id: game.id, video: false }) }}
        >
            <View style={tw`bg-[${theme.colors.card}] flex flex-col px-2 py-4`}>

                <View style={tw`flex flex-row w-full `}>

                    <View style={tw.style(`w-[70%] flex flex-col `)}>

                        <Text style={tw`text-[${theme.colors.text200}] text-[11px] mb-2`}>{game.leagueName.replace("Argentine", "").toUpperCase()}</Text>

                        <Team
                            team={isTeamHome ? team : game.opponent}
                            score={game.homeTeamScore}
                            shootoutScore={game.homeShootoutScore != "0" && game.awayShootoutScore != "0" && game.homeShootoutScore}
                            winner={homeWinner}
                            tie={!homeWinner && !awayWinner}

                        />
                        <Team
                            team={isTeamHome ? game.opponent : team}
                            score={game.awayTeamScore}
                            shootoutScore={game.homeShootoutScore != "0" && game.awayShootoutScore != "0" && game.awayShootoutScore}
                            winner={awayWinner}
                            tie={!homeWinner && !awayWinner}
                        />
                    </View>


                    <View style={tw`w-[30%] flex flex-col justify-center gap-1 items-center`}>
                        <Text style={tw.style(`text-[${theme.colors.text}] text-center text-xs`)}>
                            {
                                `${date.day} ${date.month.slice(0, 3)} ${date.year}`
                            }
                        </Text>
                    </View>

                </View>
            </View>


        </TouchableNativeFeedback>
    )
}

export default Gamecard