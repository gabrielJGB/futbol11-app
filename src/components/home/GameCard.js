import React from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { get_status, translate_title } from '../../utils/match'
import { useTheme } from '../../context/ThemeContext'
import Team from './Team'
import { check_date, convert_timestamp } from '../../utils/time'

const GameCard = ({ tournament, home, away, id, status, date, video, dateString }) => {

    const { theme } = useTheme()
    const navigation = useNavigation()

    const x = convert_timestamp(date)
    const y = check_date(x.dateObject)

    const gameDate = y ? y : `${x.dayOfWeek} ${x.day} de ${x.month}`


    const get_status_color = (st) => {

        switch (st) {
            case "pre":
                return theme.colors.text
            case "in":
                return theme.colors.textLive
            case "post":
                return theme.colors.text
        }
    }

    return (
        <TouchableNativeFeedback
            style={tw.style(`flex flex-col justify-start`)}
            onPress={() => navigation.navigate("Game", { id, video: false })}
        >
            <View style={tw`flex flex-col px-2 py-3`}>
                {
                    tournament &&
                    <Text style={tw`text-[${theme.colors.text100}] text-xs`}>{translate_title(tournament).toUpperCase()}</Text>
                }
                {
                    dateString &&
                    <View style={tw`w-full flex-row justify-between`}>
                        <Text style={tw`text-[${theme.colors.text100}] text-xs`}>{gameDate.toUpperCase()}</Text>
                        {/* <Text style={tw`text-[${theme.colors.text100}] text-xs`}>GRUPO A</Text> */}
                    </View>
                }
                <View style={tw`flex flex-row gap-1 w-full `}>

                    <View style={tw.style(`w-[65%] flex flex-col py-3 `)}>
                        {<Team key={0} team={home} isStatePre={status.type.state === "pre"} />}
                        {<Team key={1} team={away} isStatePre={status.type.state === "pre"} />}
                    </View>

                    <View style={tw`w-[35%] flex flex-col justify-center gap-1 items-center`}>

                        <Text style={tw.style(`font-semibold text-center text-${status.type.state === "in" ? "lg" : "sm"} text-[${get_status_color(status.type.state)}]`)}>

                            {get_status(status.type, date)}

                        </Text>

                        {
                            video &&
                            <Button
                                labelStyle={{ fontSize: 14 }}
                                mode='outlined'
                                buttonColor={theme.colors.background}
                                textColor={theme.colors.text}
                                onPress={() => { navigation.navigate("Game", { id, video: true }) }}
                            >Videos</Button>
                        }


                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

export default GameCard