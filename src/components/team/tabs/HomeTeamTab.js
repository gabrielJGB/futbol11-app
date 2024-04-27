import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTeam } from '../../../context/TeamContext'
import tw from 'twrnc'
import { useTheme } from '../../../context/ThemeContext'
import { get_logo, translate_title } from '../../../utils/match'
import { convert_timestamp } from '../../../utils/time'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { Button } from 'react-native-paper'

const get_bg_color = (result) => {

    switch (result) {

        case "P":
            return "#EB1E1C"
        case "G":
            return "#00A537"
        case "E":
            return "#F7FF32"
        default:
            return ""

    }

}

const HomeTeamTab = () => {

    const { team, selectedSeason, selectedLeagueSlug, setSelectedLeagueSlug } = useTeam()
    const { theme } = useTheme()

    const [selectedLeagueEvents, setSelectedLEagueEvents] = useState([])
    const navigation = useNavigation()



    useEffect(() => {

        const league = team.leagues.find(league => league.slug === selectedLeagueSlug)

        setSelectedLEagueEvents(league != undefined ? league.events : team.leagues[0].events)


    }, [selectedLeagueSlug])



    const Row = ({ game, previous, n }) => {


        const rival = game.competitions[0].competitors.find(comp => comp.id != team.team.id)
        const _team = game.competitions[0].competitors.find(comp => comp.id === team.team.id)
        const homeAway = _team.homeAway === "home" ? "L" : "V"
        const result = previous ? (_team.winner ? "G" : (rival.winner ? "P" : "E")) : "-"

        return (

            <TouchableNativeFeedback
                onPress={() => navigation.push("Game", { id: game.id })}
            >
                <View style={tw`bg-[${theme.colors.card}] flex flex-row gap-1 justify-between items-center `}>
                    <View style={tw`flex flex-col gap-1 p-1 py-[6px] `}>


                        <Text style={tw`text-[${theme.colors.text200}] text-[10px]`}>
                            <Text style={tw`text-[${theme.colors.text200}] text-[10px]`}>{n + 1}. </Text>
                            {translate_title(game.seasonType.name).toUpperCase()}
                        </Text>

                        <View style={tw`flex flex-row gap-[6px] items-center `}>
                            <Text style={tw`text-[${theme.colors.text}] `}>{convert_timestamp(game.date).DDMMYYYY}</Text>
                            <Text style={tw`text-[${theme.colors.text}] text-xs`}>{`${homeAway}`}</Text>
                            <View style={tw`flex flex-row gap-1 items-center py-0`}>
                                {get_logo(rival.team, 22)}
                                <Text style={tw`text-[${theme.colors.text}]`} numberOfLines={1}>
                                    {rival.team.displayName.slice(0, 27)} </Text>
                            </View>
                        </View>
                    </View>
                    {
                        game.played &&
                        <Text style={tw`bg-[${get_bg_color(result)}] text-${result != "E" ? "white" : "black"}  px-3 text-lg text-center align-middle h-full border-l-4 border-[${theme.colors.background}]`}>
                            {previous ? `${_team.score.displayValue}-${rival.score.displayValue}` : `      `}
                        </Text>
                    }

                </View>
            </TouchableNativeFeedback>

        )

    }

    return (
        <ScrollView>
            <View style={tw`mx-1 mt-2 mb-20`}>

                <Text style={tw`text-[${theme.colors.text}] text-center font-semibold  pb-2`}>{team.leagues.find(league => league.slug === selectedLeagueSlug)?.events[0].season.displayName.replace("Argentine", "")}</Text>

                <View style={tw`flex flex-col gap-1 py-1`}>
                    {
                        selectedLeagueEvents
                            .map((game, n) => (
                                <Row key={game.id} game={game} previous={true} n={n} />
                            ))
                    }
                </View>

                {
                    selectedLeagueSlug != "" &&
                    <Button style={tw`mt-4`} buttonColor='black' textColor='white' mode='outlined' onPress={() => navigation.navigate("League", { id: selectedLeagueSlug })} >Ver competición</Button>
                }

            </View>
        </ScrollView>
    )
}

export default HomeTeamTab