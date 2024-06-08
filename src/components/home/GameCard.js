import React from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { get_status, live_match, translate_title } from '../../utils/match'
import { useTheme } from '../../context/ThemeContext'
import Team from './Team'
import { check_date, convert_timestamp } from '../../utils/time'

const GameCard = ({ tournament, home, away, id, status, showOnlyLive, date, video, dateString }) => {

    const { theme } = useTheme()
    const navigation = useNavigation()

    const x = convert_timestamp(date)
    const y = check_date(x.dateObject)

    const gameDate = y ? y : `${x.dayOfWeek} ${x.day} de ${x.month}`


    const get_status_color = (st) => {

        switch (st) {
            case "pre":
            case "post":
                return theme.colors.text
            case "in":
                return "#FFFFFF"


        }
    }

    return (
        <TouchableNativeFeedback
            style={tw.style(`flex  flex-col justify-start`)}
            onPress={() => navigation.navigate("Game", { id, video })}
        >
            <View style={tw`${showOnlyLive && !live_match(status) ? "hidden" : "flex"} flex-col px-2 pt-3  pb-2`}>



                {
                    tournament &&
                    <Text style={tw`text-[${theme.colors.text100}] text-xs `}>{translate_title(tournament).toUpperCase()}</Text>
                }
                {
                    dateString &&
                    <View style={tw`w-full flex-row justify-between `}>
                        <Text style={tw`text-[${theme.colors.text100}] text-xs`}>{gameDate.toUpperCase()}</Text>
                        {/* <Text style={tw`text-[${theme.colors.text100}] text-xs`}>GRUPO A</Text> */}
                    </View>
                }

                <View style={tw`flex flex-row gap-1 w-full `}>

                    <View style={tw.style(`w-[65%] flex flex-col pt-2 pb-2 `)}>
                        {<Team key={0} team={home} isStatePre={status.type.state === "pre"} />}
                        {<Team key={1} team={away} isStatePre={status.type.state === "pre"} />}
                    </View>

                    <View style={tw` w-[35%] flex flex-col justify-center gap-1 items-center`}>

                        <Text style={tw`${status.type.state === "pre" ? "" : "border-[0px]"}  ${status.type.state === "in" ? "bg-red-800 border-red-600 border-[1px]" : ""}  ${status.type.state === "post" ? "bg-black border-gray-700 border-[1px]" : ""}  rounded-md py-[3px] px-[5px] font-semibold text-center text-white`}>

                            {get_status(status.type, date)}

                        </Text>

                        {/* {
                            video &&
                            <Button
                                labelStyle={{ fontSize: 14 }}
                                mode='outlined'
                                buttonColor={theme.colors.background}
                                textColor={theme.colors.text}
                                onPress={() => { navigation.navigate("Game", { id, video: true }) }}
                            >Videos</Button>
                        } */}

                        {
                            //  video &&
                            // <Text style={tw`text-[${theme.colors.text}] bg-[${theme.colors.secondary}] border-[1px] text-center border-[${theme.colors.accent}] rounded-md text-xs p-1`}>Video</Text>
                        }



                    </View>
                </View>
                {
                    video &&
                    <View style={tw`flex-row gap-2 items-center w-full pt-1 pb-2`}>
                        {/* <Text style={tw`text-[${theme.colors.text}] bg-[${theme.colors.secondary}]text-center  border-[1px]  border-[${theme.colors.accent}] rounded-md text-xs py-1 px-1`}>Video</Text> */}
                        <Text style={tw`bg-[${theme.colors.secondary}] text-center rounded text-white p-[3px] text-[11px] italic`}>Video</Text>

                        <Text style={tw`text-[${theme.colors.text100}] w-[87%] text-[13px]  italic leading-normal `}>
                            {video.headline}
                        </Text>
                    </View>

                }

            </View>
        </TouchableNativeFeedback>
    )
}

export default GameCard