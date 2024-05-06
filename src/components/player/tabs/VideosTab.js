import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { usePlayer } from '../../../context/PlayerContext'
import tw from 'twrnc'
import VideoCard from '../../game/VideoCard'

const VideosTab = () => {
  const { theme } = useTheme()
  const { player } = usePlayer()


  return (
    <ScrollView>
      <View style={tw`flex flex-col gap-8 mx-1 mt-2 mb-20`}>
    
        {
          player.videos.map((video,i)=>(
            <VideoCard key={i} video={video}/>
          ))
        }

      </View>
    </ScrollView>
  )
}

export default VideosTab