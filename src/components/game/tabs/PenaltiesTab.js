import { View, Text, Image, ScrollView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useGame } from '../../../context/GameContext'
import { useTheme } from '../../../context/ThemeContext'
import { score, no_score } from '../../../../assets/index'
import tw from 'twrnc'
import { Divider } from 'react-native-paper'
import { get_logo } from '../../../utils/match'


const PenaltiesTab = () => {

  const { theme } = useTheme()
  const { game } = useGame()
  const shootout = game.data.shootout
  const IMG_SIZE = 18


  const get_team_logo = (teamName) => {

    const team = game.data.header.competitions[0].competitors.find(elem => elem.team.displayName === teamName)
    const logo = get_logo(team, 40)

    return logo

  }



  const Dot = ({ didScore }) => {
    const size = 12

    return <View style={tw`bg-${didScore ? "green" : "red"}-600 h-[${size}px] w-[${size}px] rounded-xl`}></View>
  }


  return (
    <ScrollView >

      <View style={tw`mt-2 mx-1 pb-1 rounded-lg shadow shadow-black bg-[${theme.colors.card}]`}>
        <Text style={tw`mx-auto text-center  text-[${theme.colors.text}]  font-semibold text-lg pt-2 pb-3 w-full`}>DEFINICIÓN POR PENALES</Text>
        <View style={tw`flex flex-row   w-full`}>

          {
            shootout.map((elem, first) => (
              <View key={first} style={tw`flex flex-col px-0 w-[50%]`}>

                

                {/* <Text style={tw`${first === 1 ? "text-right" : "text-left"} text-[${theme.colors.text}] px-1 py-2 text-[16px] font-semibold`}> {elem.team} </Text> */}
                <View style={tw`flex flex-row${first === 1 ? "-reverse" : ""} px-3`}>
                  {get_team_logo(elem.team)}
                </View>
                

                {elem.shots.map(((shot, i) => (
                  <View key={i}>

                    <View style={[tw.style(`flex flex-row items-center py-2 px-1`)]}>

                      {/* {first === 1 && <Image source={shot.didScore ? score : no_score} style={{ width: IMG_SIZE, height: IMG_SIZE }} />} */}
                      {first === 1 && <Dot didScore={shot.didScore} />}
                      {first === 0 && <Text style={tw`text-[${theme.colors.text200}] text-xs`}>{shot.shotNumber}</Text>}

                      <Text style={tw`text-${first === 1 ? "right" : "left"} text-[${theme.colors.text}] m-1  flex-1 text-[13px]`}> {shot.player} </Text>

                      {first === 1 && <Text style={tw`text-[${theme.colors.text200}]  text-xs`}>{shot.shotNumber}</Text>}
                      {first === 0 && <Dot didScore={shot.didScore} />}
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


