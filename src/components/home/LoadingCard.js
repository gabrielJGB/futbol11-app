import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import tw from 'twrnc'


const Card = () => {
    const { theme } = useTheme()

    return <View style={tw`bg-[${theme.colors.card}]  flex flex-col items-center shadow-md px-2 rounded-lg`}>
        <View style={tw`w-full py-3`}>
            <View style={tw` w-[80%] h-[25px] bg-[${theme.colors.card100}]`}></View>
        </View>

        <View style={tw`flex flex-row items-center justify-center w-full h-[120px] border-t-[1px] border-[${theme.colors.border}]`}>
            <View style={tw`flex flex-col gap-2 w-[65%] border-r-[2px] border-[${theme.colors.border}] h-[57px]`}>
                <View style={tw`w-[90%] h-[25px] bg-[${theme.colors.card100}]`}></View>
                <View style={tw`w-[80%] h-[25px] bg-[${theme.colors.card100}]`}></View>
            </View>
            <View style={tw`w-[35%]`}>
                <View style={tw`mx-auto w-[60%] h-[25px] bg-[${theme.colors.card100}]`}></View>
            </View>
        </View>
        <View style={tw`flex flex-row items-center justify-center w-full h-[120px] border-t-[1px] border-[${theme.colors.border}]`}>
            <View style={tw`flex flex-col gap-2 w-[65%] border-r-[2px] border-[${theme.colors.border}] h-[57px]`}>
                <View style={tw`w-[90%] h-[25px] bg-[${theme.colors.card100}]`}></View>
                <View style={tw`w-[80%] h-[25px] bg-[${theme.colors.card100}]`}></View>
            </View>
            <View style={tw`w-[35%]`}>
                <View style={tw`mx-auto w-[60%] h-[25px] bg-[${theme.colors.card100}]`}></View>
            </View>
        </View>
    </View>
}

const LoadingCard = () => {

    

    return (
        <View style={tw`flex flex-col gap-4 my-4 w-full px-1 `}>
            
            {
                [1, 2, 3, 4, 5, 6].map(i => (
                    <Card key={i} />
                ))
            }

        </View>
    )
}

export default LoadingCard