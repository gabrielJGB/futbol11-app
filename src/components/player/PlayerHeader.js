import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { usePlayer } from '../../context/PlayerContext'
import { get_logo } from '../../utils/match'
import tw from 'twrnc'

const PlayerHeader = () => {
  const { theme } = useTheme()
  const { player } = usePlayer()

  return (
    <View style={tw`bg-[${theme.colors.card}] flex flex-row items-center justify-center gap-2 px-2 `}>



      {get_logo(player.team, 47)}


      <View style={tw`flex flex-col`}>
        <View style={tw`flex flex-row items-center gap-2`}>
          <Text style={tw`text-[${theme.colors.text100}] text-[21px] font-semibold`}>#{player.jersey}</Text>
          <Text style={tw`text-[${theme.colors.text100}] text-[15px] pt-1`}>{player.position.displayName}</Text>
        </View>
        <Text style={tw`text-[${theme.colors.text}] text-[24px] font-semibold`}>{player.displayName} </Text>
      </View>

    </View>
  )
}

export default PlayerHeader