import { View, Text, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useTheme } from '../../context/ThemeContext'
import { format_date } from '../../utils/time'

const HomeButtons = ({selectedDate,setSelectedDate,setLoading}) => {

    const { theme } = useTheme()

    const previousDate =  new Date(selectedDate.getTime() - 86400000)
    const nextDate =  new Date(selectedDate.getTime() + 86400000)

    return (
        <View style={tw`flex flex-row items-center bg-[${theme.colors.card}] border-[${theme.colors.background}] border-b-[1px]`}>

            <TouchableNativeFeedback
                onPress={() => {
                    setSelectedDate(previousDate)
                    setLoading(true)
                }}

            >
                <View
                    style={tw`flex-1 p-3`}
                >
                    <Text style={tw`text-center text-xs text-[${theme.colors.text100}]`}>{format_date(previousDate)}</Text>
                </View>
            </TouchableNativeFeedback>


        
                <View
                    style={tw`flex-1 py-3 border-b-[2px] border-[${theme.colors.accent}]`}
                >
                    <Text style={tw`text-center font-semibold text-[${theme.colors.text}]`}>{format_date(selectedDate)}</Text>
                </View>
        

            <TouchableNativeFeedback
                onPress={() => {
                    setSelectedDate(nextDate)
                    setLoading(true)
                }}

            >
                <View
                    style={tw`flex-1 py-3`}
                >
                    <Text style={tw`text-center text-xs text-[${theme.colors.text100}]`}>{format_date(nextDate)}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>

    )
}

export default HomeButtons