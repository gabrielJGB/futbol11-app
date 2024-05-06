import { Video } from 'expo-av'
import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import tw from 'twrnc'
import { useTheme } from '../../context/ThemeContext'



const VideoCard = ({ video }) => {
    const { theme } = useTheme()
    

    return (
        <View style={tw`bg-[${theme.colors.card}] flex flex-col rounded-lg`}>
            
            {
                "headline" in video &&
                <Text style={tw`text-[${theme.colors.text}] leading-normal text-[21px] pt-2 px-2 font-semibold`}>{video.headline}</Text>
            }

            {
                "description" in video &&
                <Text style={tw`text-[${theme.colors.text100}] leading-normal text-[13px] p-2`}>{video.description}</Text>
            }
            <Video
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height/3.8,
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