import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native';
import React from 'react'
import { useTheme } from '../../../context/ThemeContext';
import tw from 'twrnc'
import { useGame } from '../../../context/GameContext';


const InfoTab = () => {
  const route = useRoute();

  const { theme } = useTheme()
  const { game } = useGame()

    console.log(game.data.header.id)

  return (
    <View style={tw`bg-[${theme.colors.card}] h-full`}>
      <Text style={tw`text-[${theme.colors.text}]`}>
      { game.data.header.id }
      </Text>
    </View>
  )
}

export default InfoTab
