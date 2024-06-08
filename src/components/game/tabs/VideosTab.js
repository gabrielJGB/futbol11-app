import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { useGame } from '../../../context/GameContext'
import { Video } from 'expo-av'
import tw from 'twrnc'
import { Button, Divider } from 'react-native-paper'
import VideoCard from '../VideoCard'


const VideosTab = () => {
  const { theme } = useTheme()
  const { game,isHDselected, setIsHDselected } = useGame()


  return (
    <ScrollView style={tw`mx-1 pt-4 `} >

      <View style={tw`flex flex-col gap-5 mb-20`} >
{/* 
        <Button
          textColor={theme.colors.text}
          buttonColor='black'
          onPress={() => setIsHDselected(!isHDselected)}
        >{isHDselected ? "HD" : "SD"} </Button> */}

        {
          game.data.videos.map((video, i) => (

            
              <VideoCard key={i} video={video} />
            
          ))
        }

      </View>

    </ScrollView>
  )
}

export default VideosTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    flex: 1,
    alignSelf: "stretch",

  },
});