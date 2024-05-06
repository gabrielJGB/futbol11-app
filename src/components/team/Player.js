import { View, Text, TouchableNativeFeedback, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useTheme } from '../../context/ThemeContext'
import { useNavigation } from '@react-navigation/native'



const Player = ({ player }) => {

  const { theme } = useTheme()
  const navigation = useNavigation()
  const SIZE = 20


  const get_slug = (flagString) => {

    const regex = /\/([a-z]+)\.png$/i;
    const slug = flagString.match(regex);

    return slug[1]

  }


  const get_uri = (flagString) => {

    const slug = get_slug(flagString)
    const uri = `https://a1.espncdn.com/combiner/i?img=/i/teamlogos/countries/500/${slug}.png?w=${SIZE + 15}&h=${SIZE + 15}`
    return uri

  }

  const get_player_color = (position) => {

    if (!position)
      return "#808080"

    if (position.displayName === "Arquero")
      return "#FF8700"

    else if (position.displayName.includes("Defensor") || position.displayName.includes("Lateral") || position.displayName.includes("defensivo") || position.displayName.includes("Líbero"))
      return "#20b4ff"

    else if (position.displayName.includes("Mediocampista"))
      return "#42d515"

    else if (position.displayName.includes("Atacante") || position.displayName.includes("Enganche"))
      return "#D90001"
    else
      return "#808080"

  }

  return (
    <TouchableNativeFeedback
      onPress={() => navigation.push("Player", { id: player.id })}
    >
      <View style={tw`flex flex-row justify-between items-center bg-[${theme.colors.card}] py-3 `}>

        <View style={tw`flex flex-row items-center gap-2 pl-2`}>
          <Text style={tw`text-[${theme.colors.text100}] w-[30px] text-center font-semibold text-[16px]`}>{"jersey" in player ? `${player.jersey}` : "-"}</Text>

          <Text style={tw`text-[${get_player_color(player.position)}] font-semibold text-center`}>{player.position?.abbreviation}</Text>

          <Text style={tw`text-[${theme.colors.text}] w-[65%]`}>{player.fullName}</Text>
        </View>

        <View style={tw`flex flex-row items-center gap-4 pr-2`}>
          <Image source={{ uri: "flag" in player ? get_uri(player.flag.href) : undefined }} width={SIZE} height={SIZE} />
          <Text style={tw`text-[${theme.colors.text}] text-[16px]`}>{player.age}</Text>
        </View>

      </View>
    </TouchableNativeFeedback>
  )
}

export default Player