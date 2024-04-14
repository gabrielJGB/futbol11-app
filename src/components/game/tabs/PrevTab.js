import React from 'react'
import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native'
import { useGame } from '../../../context/GameContext'
import { useTheme } from '../../../context/ThemeContext'
import tw from 'twrnc'
import { get_logo } from '../../../utils/match'
import { Divider, Icon } from 'react-native-paper'
import Gamecard from '../Gamecard'

const PrevTab = ({ navigation }) => {

  const { theme } = useTheme()
  const { game } = useGame()
  const games = game.data.headToHeadGames[0].events
  const team = game.data.headToHeadGames[0].team
  const homeHistory = game.data.boxscore.form[0]
  const awayHistory = game.data.boxscore.form[1]
  const IMG_SIZE = 18

  const get_result_color = (result) => {
    if (result === "G")
      return "#00AD38"
    else if (result === "E")
      return "#E5FF1A"
    else if (result === "P")
      return "#FF1E2F"
  }

  return (
    <ScrollView style={tw`mx-1`}>
      <View style={tw`mb-20 mt-2`}>



        {
          "leaders" in game.data && game.data.leaders[0].leaders.length >0 &&
          <View style={tw`mb-2`}>
            <Text style={tw`text-[${theme.colors.text}] bg-[${theme.colors.card}] w-full text-center py-2 text-lg font-semibold`}>GOLEADORES</Text>
            <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />

            <View style={tw`flex flex-row py-3 gap-1  bg-[${theme.colors.card}]`}>
              {
                 
                game.data.leaders?.map((elem, i) => (
                  <View key={i} style={tw`flex flex-col justify-center w-1/2 `}>

                    <View style={tw`flex flex-row items-center justify-center gap-1 mb-2`}>
                      {get_logo(elem.team, 20)}
                      {/* <Text style={tw`text-[${theme.colors.text}]  `}>{elem.team.displayName}</Text> */}
                    </View>

                    <View>


                      {
                        elem.leaders[0].leaders?.map((leader, i) => (
                          <View key={i} style={tw` bg-[${theme.colors.card}] mb-[1px] mx-2 flex flex-col items-center gap-1 border-black`} >

                            <View style={tw`bg-[${theme.colors.card100}] flex flex-row items-center py-1 px-2 my-2 rounded-md`}>
                              {/* <Text style={tw`text-[${theme.colors.text100}]`}>{i + 1}.{" "}</Text> */}
                              <Text style={tw`text-[${theme.colors.text}] text-center text-[13px] text-xs font-semibold`}>{leader.athlete.fullName.toUpperCase()}</Text>
                            </View>
                            
                            <View style={tw`flex flex-row justify-center gap-4 pb-3`}>

                              <View style={tw`flex flex-col items-center justify-center`}>
                                <Text style={tw`text-[${theme.colors.text}] font-semibold`}>{leader.displayValue.split(", ")[1].split(": ")[1]}</Text>
                                <Text style={tw`text-[${theme.colors.text100}] text-xs`}>Goles</Text>
                              </View>

                              <View style={tw`flex flex-col items-center justify-center`}>
                                <Text style={tw`text-[${theme.colors.text}] font-semibold`}>{leader.displayValue.split(", ")[0].split(": ")[1]}</Text>
                                <Text style={tw`text-[${theme.colors.text100}] text-xs `}>Partidos</Text>
                              </View>

                              <View style={tw`flex flex-col items-center justify-center`}>
                                <Text style={tw`text-[${theme.colors.text}] font-semibold`}>{(leader.displayValue.split(", ")[1].split(": ")[1]/leader.displayValue.split(", ")[0].split(": ")[1]).toFixed(2)}</Text>
                                <Text style={tw`text-[${theme.colors.text100}] text-xs `}>Prom</Text>
                              </View>
                            </View>

                            <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />

                          </View>
                        ))
                      }

                    </View>

                  </View>
                ))
       
              }
            </View>

          </View>
        }



        <View>
          <Text style={tw`text-[${theme.colors.text}] bg-[${theme.colors.card}] w-full text-center py-2 text-lg font-semibold`}>ENFRENTAMIENTOS PREVIOS</Text>
          {
            games.length > 0 ?

              games.map((game, i) => (
                <View key={i} style={tw`bg-[${theme.colors.card}]`}>
                  <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />
                  <Gamecard game={game} team={team} navigation={navigation} teamHistory={false} />
                </View>
              ))
              :
              <View style={tw`flex flex-row gap-1 justify-center items-center p-2  pb-4 bg-[${theme.colors.card}]`}>
                <Icon source="information-outline" color='white' size={24} />
                <Text style={tw`text-[${theme.colors.text}] text-[15px] `}>Este es el primer enfrentamiento</Text>
              </View>
          }
        </View>



        {
          [homeHistory, awayHistory].map((elem, i) => {
            return elem.events.length > 0 &&
              <View key={i} style={tw`mt-2`}>

                <View style={tw`bg-[${theme.colors.card}] flex flex-row items-center justify-center gap-2 p-2`}>
                  {get_logo(elem.team, 22)}
                  <Text style={tw`text-[${theme.colors.text}]  text-lg font-semibold`}> ÚLTIMOS PARTIDOS</Text>
                  <View style={tw`flex flex-row-reverse gap-[1px] `}>
                    {
                      elem.events.map((event, i) => (
                        <Text key={i} style={tw`text-[${theme.colors.text}] font-semibold text-[${get_result_color(event.gameResult)}]`}>{event.gameResult}</Text>
                      ))
                    }
                  </View>
                </View>



                {
                  elem.events.map((game, i) => (
                    <View key={i}>
                      <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />
                      <Gamecard game={game} team={elem.team} navigation={navigation} teamHistory={true} />
                    </View>
                  ))
                }



              </View>
          })
        }






      </View>
    </ScrollView>

  )
}

export default PrevTab