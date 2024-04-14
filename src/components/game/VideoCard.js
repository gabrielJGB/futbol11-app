import { Video } from 'expo-av'
import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import tw from 'twrnc'
import { useTheme } from '../../context/ThemeContext'
import { Image } from 'react-native'
import { useGame } from '../../context/GameContext'

const VideoCard = ({ video }) => {
    const { theme } = useTheme()
    const {isHDselected} = useGame()

    return (
        <View style={tw`bg-[${theme.colors.card}] flex flex-col `}>
            
            {
                "headline" in video &&
                <Text style={tw`text-[${theme.colors.text}] text-[22px] p-2 `}>{video.headline}</Text>
            }

            {
                "description" in video &&
                <Text style={tw`text-[${theme.colors.text100}] leading-normal text-[13px] px-2`}>{video.description}</Text>
            }
            <Video
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height/3.5,
                    backgroundColor: theme.colors.card,
                }}
                resizeMode='contain'
                useNativeControls
                source={{ uri: video.links.mobile.source.href }}
                // source={{ uri:  isHDselected?video.links.source.full.href:video.links.mobile.source.href }}
            />
        </View>
    )
}

export default VideoCard