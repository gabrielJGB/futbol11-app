import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useTheme } from '../../context/ThemeContext'
import { get_detail_icon } from '../../utils/match'

const GameScorers = ({ details, homeId, awayId }) => {

    const { theme } = useTheme()

    return (
        <View style={tw`flex flex-col w-full pt-1 gap-1 mx-auto`}>




            {
                details.map((detail, i) => (
                    <View key={i} style={tw`flex flex-row justify-center items-center`}>

                        {
                            detail.team.id === homeId ?

                                <View style={tw`flex h-full w-1/2 flex-row justify-center items-center  bg-[${theme.colors.card200}]`} >
                                    {get_detail_icon(detail)}
                                    <Text style={tw`text-[${theme.colors.text100}] text-center text-xs`}> {"participants" in detail ? detail.participants[0].athlete.displayName : "Expulsión"}{detail.ownGoal && " (EC)"}</Text>
                                </View>
                                :
                                <View style={tw`w-1/2`}></View>
                        }

                        <Text style={tw`min-w-[50px] bg-[${theme.colors.card200}] text-[${theme.colors.text}] text-center font-semibold `}>{detail.clock.displayValue}</Text>

                        {
                            detail.team.id === awayId ?
                                <View style={tw`flex h-full w-1/2 flex-row justify-center items-center  bg-[${theme.colors.card200}]`} >{get_detail_icon(detail)}
                                    <Text style={tw`text-[${theme.colors.text100}] text-center text-xs`}> {"participants" in detail ? detail.participants[0].athlete.displayName : "Expulsión"}{detail.ownGoal && " (EC)"}</Text>
                                </View>
                                :
                                <View style={tw`w-1/2`}></View>
                        }



                    </View>
                ))
            }

        </View>
    )
}

export default GameScorers