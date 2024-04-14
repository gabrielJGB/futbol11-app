import { View, Text, Image, ScrollView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useGame } from '../../../context/GameContext'
import { useTheme } from '../../../context/ThemeContext'
import { score, no_score } from '../../../../assets/index'
import tw from 'twrnc'
import { Divider } from 'react-native-paper'


const PenaltiesTab = () => {

  const { theme } = useTheme()
  const { game } = useGame()
  const IMG_SIZE = 18

  const shootout = game.data.shootout


  return (
    <ScrollView >

      <View style={tw`mt-2 mx-1`}>
        <Text style={tw`mx-auto text-center text-[${theme.colors.text}] font-semibold text-lg pt-2 pb-3 w-full bg-[${theme.colors.card}]`}>DEFINICIÓN POR PENALES</Text>
        <View style={tw`flex flex-row bg-[${theme.colors.card}] w-full`}>

          {
            shootout.map((elem, first) => (
              <View key={first} style={tw`flex flex-col px-0 w-[50%]`}>


                <Text style={tw`text-center text-[${theme.colors.text}] text-[16px] font-semibold`}> {elem.team} </Text>

                {elem.shots.map(((shot, i) => (
                  <View key={i}>

                    <View style={[tw.style(`flex flex-row items-center py-2 px-1`)]}>

                      {first === 1 && <Image source={shot.didScore ? score : no_score} style={{ width: IMG_SIZE, height: IMG_SIZE }} />}
                      {first === 0 && <Text style={tw`text-[${theme.colors.text100}] text-xs`}>{shot.shotNumber}</Text>}

                      <Text style={tw`text-${first === 1 ? "right" : "left"} text-[${theme.colors.text}] m-1  flex-1 text-[13px]`}> {shot.player} </Text>

                      {first === 1 && <Text style={tw`text-[${theme.colors.text100}]  text-xs`}>{shot.shotNumber}</Text>}
                      {first === 0 && <Image source={shot.didScore ? score : no_score} style={{ width: IMG_SIZE, height: IMG_SIZE }} />}
                    </View>




                    {
                      i < elem.shots.length - 1 &&
                      <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />
                    }
                  </View>
                )))}


              </View>
            ))
          }

        </View>
      </View>

    </ScrollView>
  )
}

export default PenaltiesTab


