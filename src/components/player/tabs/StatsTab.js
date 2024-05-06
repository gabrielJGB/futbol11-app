import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { usePlayer } from '../../../context/PlayerContext'
import { useTheme } from '../../../context/ThemeContext'
import tw from 'twrnc'
import { Picker } from '@react-native-picker/picker'

const StatsTab = () => {
  const { theme } = useTheme()
  const { player } = usePlayer()
  const [selectedLeague, setSelectedLeague] = useState(player.statistics.splits[0])

  return (
    <ScrollView>
      <View style={tw`mx-1 mt-2 mb-60`}>

        <Picker
          style={tw`bg-[${theme.colors.card}] text-[${theme.colors.text}]  text-center`}
          selectedValue={selectedLeague}
          selectionColor="white"
          dropdownIconColor={theme.colors.text100}
          prompt={`Seleccionar Competición`}
          onValueChange={(itemValue, itemIndex) => { setSelectedLeague(itemValue) }}

        >

          {

            player.statistics.splits.map((league, i) => (
              <Picker.Item key={i} color='black' label={league.displayName.replace("Argentine", "")} value={league} />
            ))
          }

        </Picker>


        <View style={tw`rounded-lg flex flex-col${player.position.displayName === "Arquero" ? "-reverse" : ""} gap-[0px] pt-4`}>

          {
            selectedLeague.stats.map((stat, i) => (
              <View key={i} style={tw`bg-[${theme.colors.card}] flex flex-row items-center justify-between py-2 px-2 border-b-[1px] border-[${theme.colors.border}]`}>
                <Text style={tw`text-[${theme.colors.text}]`}>
                  {
                    player.statistics.displayNames[i]
                      .replace("Aperturas", "Titular")
                      .replace("Total de goles","Goles")
                      .replace("Tarjetas","")
                      .replace("amarillas","Amarillas")
                  }
                </Text>
                <Text style={tw`text-[${theme.colors.text}] text-lg font-semibold`}>{stat}</Text>

              </View>
            ))
          }

        </View>




      </View>
    </ScrollView>
  )
}

export default StatsTab