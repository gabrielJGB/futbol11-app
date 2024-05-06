import { View, Text, TouchableNativeFeedback } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useTheme } from '../../context/ThemeContext'
import { get_detail_icon } from '../../utils/match'
import { Button } from 'react-native-paper'

const GameScorers = ({ details, homeId, awayId, video }) => {

    const { theme } = useTheme()
    const [scorersVisible, setScorersVisible] = useState(true)
    const bgColor = theme.colors.card200

    return (

        <View style={tw`flex flex-col gap-0`}>
            <View style={tw`${scorersVisible ? "flex" : "hidden"}  flex-col gap-[4px] pt-1`}>
                {
                    details.map((detail, i) => (
                        <View key={i} style={tw`${detail.team.id === homeId ? "flex-row" : "flex-row-reverse"} `}>


                            <View style={tw`w-[42%]  flex flex-row gap-1 justify-center items-center px-2 py-[1px] bg-[${bgColor}]`} >


                                {get_detail_icon(detail)}

                                <Text style={tw`text-[${theme.colors.text100}] text-center text-xs `}
                                >
                                    {"participants" in detail ?
                                        detail.participants[0].athlete.displayName :
                                        "Expulsión (banco)"} {detail.ownGoal && " (EC)"}
                                </Text>


                            </View>


                            <Text
                                style={tw`w-[16%] h-full rounded-${detail.team.id === homeId ? "r" : "l"}-[6px] bg-[${bgColor}] text-xs text-[${theme.colors.text}] text-center font-semibold align-middle`}
                            >
                                {detail.clock.displayValue}
                            </Text>



                        </View>
                    ))
                }
            </View>
            {
                details.length > 0 &&

                <Button onPress={() => setScorersVisible(!scorersVisible)} icon={`chevron-${scorersVisible ? "up" : "down"}`} textColor={theme.colors.text} style={tw`w-[103%] mx-auto  rounded-0`} rippleColor="black"></Button>
            }


        </View>

    )
}

export default GameScorers