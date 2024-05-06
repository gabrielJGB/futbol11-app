import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { useTheme } from '../../../context/ThemeContext'
import tw from 'twrnc'
import { usePlayer } from '../../../context/PlayerContext'
import { get_logo } from '../../../utils/match'
import { Divider } from 'react-native-paper'

const HistoryTab = () => {
  const { theme } = useTheme()
  const { player } = usePlayer()


  return (
    <ScrollView>
      <View style={tw`mx-1 mt-2 mb-60`}>

        <View>
          {
            player.teamHistory.map((section, k) =>{ 
              if(section.teams.length >0)

                return    <View key={k} style={tw`bg-[${theme.colors.card}] flex flex-col gap-0 my-2 p-1 pb-3 rounded-lg shadow shadow-black`}>
                <Text style={tw`text-[${theme.colors.text}] text-lg  mb-2 font-semibold text-center`}>{section.displayName.toUpperCase()}</Text>
                <View style={tw`flex flex-col-reverse gap-4`}>
                  {
                    section.teams.map((team, i) => (
                      <>
                        <View key={i} style={tw`flex flex-row items-end border-[${theme.colors.border}] justify-between gap-1 p-1`}>
                          <View style={tw`flex flex-col gap-2`}> 
                            <View style={tw`flex flex-row items-center gap-2`}>
                              {get_logo(team, 24)}
                              {
                                section.displayName === "Clubes" &&
                                <Image source={{ uri: `https://a1.espncdn.com/combiner/i?img=/i/teamlogos/countries/500/${team.slug.slice(0, 3)}.png?w=18&h=18` }} width={18} height={18} />
                              }
                              <Text style={tw`text-[${theme.colors.text}]`}>{team.displayName}</Text>
                            </View>
                            <Text numberOfLines={1} style={tw`text-[${theme.colors.text200}] text-xs`}>{`${team.seasonCount} TEMPORADA${team.seasonCount === "1" ? "" : "S"}`}</Text>
                          </View>


                          <View style={tw`flex flex-col items-end gap-1`}>
                            {
                              team.seasons.split(",").map((season, i) => (
                                <Text key={i} style={tw`text-center text-[${theme.colors.text}]`}>{season.replace("CURRENT", "PRESENTE")}</Text>
                              ))
                            }

                          </View>
                        </View>
                        <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />
                      </>
                    ))
                  }
                </View>
              </View>

            })
          }
        </View>

      </View>
    </ScrollView>
  )
}

export default HistoryTab