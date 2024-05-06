import { View, Text } from 'react-native'
import React from 'react'
import VideoCard from '../components/game/VideoCard'
import { useRoute } from '@react-navigation/native'
import { useTheme } from '../context/ThemeContext'
import tw from 'twrnc'

const VideoScreen = () => {

    const { video } = useRoute().params
    const { theme } = useTheme()


    return (
        <View style={tw`bg-[${theme.colors.card}] h-[100%]`}>
            <VideoCard video={video} />
        </View>
    )
}

export default VideoScreen