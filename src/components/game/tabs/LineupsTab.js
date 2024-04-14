import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableNativeFeedback, Image } from 'react-native'
import { useGame } from '../../../context/GameContext';
import { useTheme } from '../../../context/ThemeContext';
import { Button, Divider, Icon } from 'react-native-paper';
import { penalty, own_goal, ball, boot, red_card, yellow_card, arrow_in, arrow_out } from '../../../../assets/index'
import tw from 'twrnc'
import { get_logo } from '../../../utils/match';

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

const get_play_img = (play, p_in, p_out) => {

  if (play.penaltyKick)
    return penalty
  else if (play.ownGoal)
    return own_goal
  else if (play.didScore)
    return ball
  else if (play.didAssist)
    return boot
  else if (play.redCard)
    return red_card
  else if (play.yellowCard)
    return yellow_card
  else if (play.substitution)
    return p_in ? arrow_in : arrow_out


}


const format_stat = (stat) => {

  switch (stat.shortDisplayName) {
    case "FC":
      return stat.value === 1 ? "Falta cometida" : "Faltas cometidas"
    case "FS":
      return stat.value === 1 ? "Falta recibida" : "Faltas recibidas"
    case "EC":
      return stat.value === 1 ? "Gol en contra" : "Goles en contra"
    case "TR":
      return stat.value === 1 ? "Tarjeta roja" : "Tarjetas rojas"
    case "TA":
      return stat.value === 1 ? "Tarjeta amailla" : "Tarjetas amaillas"
    case "GA":
      return stat.value === 1 ? "Gol recibido" : "Goles recibidos"
    case "SHF":
      return stat.value === 1 ? "Remate recibido" : "Remates recibidos"
    case "A":
      return stat.value === 1 ? "Asistencia" : "Asistencias"
    case "OF":
      return "Fuera de juego"
    case "ST":
      return stat.value === 1 ? "Remate al arco" : "Remates al arco"
    case "G":
      return stat.value === 1 ? "Gol" : "Goles"
    case "SH":
      return stat.value === 1 ? "Remate en total" : "Remates en total"
    case "SV":
      return stat.value === 1 ? "Atajada" : "Atajadas"

  }

  stat.displayName.replace("Shots Faced", "Tiros recibidos").replace("Concedidos", "Recibidos").replace("a meta", "al arco").replace("Total de goles", "Goles")
}

const Roster = ({ roster }) => {
  const { theme } = useTheme()

  return (
    <View>

      <Text style={tw`text-[${theme.colors.text}] font-semibold text-center text-2xl mb-1`}>TITULARES</Text>

      {
        roster.filter(elem => elem.starter).map((player, i) => (

          <View key={i} style={tw`bg-[${theme.colors.card}]`}>
            <Player key={i} player={player} />
            {
              i < 10 &&
              <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />
            }
          </View>

        ))
      }

      <Text style={tw`text-[${theme.colors.text}] font-semibold text-center text-2xl mt-4 mb-1`}>SUPLENTES</Text>

      {
        roster.filter(elem => !elem.starter).map((player, i) => (

          <View key={i} style={tw`bg-[${theme.colors.card}]`}>
            <Player key={i} player={player} />
            {
              i < roster.length - 1 &&
              <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />
            }
          </View>

        ))
      }


    </View>
  )


}

const Player = ({ player }) => {
  const { theme } = useTheme()
  const [statsVisible, setStatsVisible] = useState(false)

  const IMG_SIZE = 12

  return (
    <View style={tw``}>
      <TouchableNativeFeedback
        style={tw`flex flex-row items-center justify-between `}
        onPress={() => setStatsVisible(!statsVisible)}
      >
        <View style={tw`flex flex-row justify-between items-center px-2 py-4`}>
          <View style={tw`flex flex-row flex-wrap w-[95%] items-center gap-1`}>

            <Text style={tw`text-[${theme.colors.text}] bg-gray-900 rounded-lg py-[2px] font-semibold w-[30px] text-center text-[15px]`}>{player.jersey}</Text>
            <Text style={tw`text-[${get_player_color(player.position)}] font-semibold text-center w-[30px]`}>{player.position?.abbreviation}</Text>
            <Text style={tw`text-[${theme.colors.text}]`}>{player.athlete.fullName}</Text>
            {
              "plays" in player &&
              player.plays.map((play, i) => (
                <View key={i} style={tw`flex flex-row items-center gap-1`}>
                  {/* <Image key={i} src={get_play_img(play, player.subbedIn, player.subbedOut)} alt="Play" width={IMG_SIZE} height={IMG_SIZE} /> */}
                  <Image source={get_play_img(play, player.subbedIn, player.subbedOut)} style={{ width: IMG_SIZE, height: IMG_SIZE }} />
                  <Text style={tw`text-xs text-[${theme.colors.text200}]`}>{play.clock.displayValue}</Text>
                </View>
              ))

            }

          </View>
          <Icon source={`chevron-${statsVisible ? "up" : "down"}`} size={20} color={theme.colors.text} />
        </View>
      </TouchableNativeFeedback>

      <View style={tw`${statsVisible ? "flex" : "hidden"}  flex-row items-center justify-between mx-3  mb-5`}>
        <View style={tw`flex  flex-col gap-1 justify-evenly items-start `}>

          {/* <Text style={tw`text-[${get_player_color(player.position)}]  text-xs`}>{player.position?.displayName}</Text> */}

          {
            "subbedOutFor" in player &&
            <View style={tw`flex flex-row gap-1 items-center mb-2`}>

              <Image source={arrow_in} style={{ width: IMG_SIZE, height: IMG_SIZE }} />
              <Text style={tw`text-[${theme.colors.text}] bg-gray-900 rounded-md py-[2px] font-semibold w-[25px] text-center text-xs`}>{player.subbedOutFor.jersey}</Text>
              <Text style={tw`text-[${theme.colors.text}] text-xs`}>{player.subbedOutFor.athlete.displayName}</Text>
            </View>
          }

          {
            "subbedInFor" in player &&
            <View style={tw`flex flex-row gap-1 items-center mb-2`}>

              <Image source={arrow_out} style={{ width: IMG_SIZE, height: IMG_SIZE }} />
              <Text style={tw`text-[${theme.colors.text}] bg-gray-900 rounded-md py-[2px] font-semibold w-[25px] text-center text-xs`}>{player.subbedInFor.jersey}</Text>
              <Text style={tw`text-[${theme.colors.text}] text-xs`}>{player.subbedInFor.athlete.displayName}</Text>
            </View>
          }

          <View style={tw`flex flex-row w-full justify-between items-center`}>

            <View>

              {
                "stats" in player &&

                player.stats.map((stat, i) => {
                  return (
                    stat.value != 0 &&
                    stat.shortDisplayName != "Ap" &&
                    stat.shortDisplayName != "Sub" &&
                    (player.position?.abbreviation === "G" || stat.shortDisplayName != "GA") &&

                    <View key={i} style={tw`flex flex-col gap-2 justify-start items-start`}>
                      <View style={tw`flex flex-row gap-2 justify-center items-center`}>
                        <Text style={tw`text-[${theme.colors.text}] font-semibold `}>{stat.value}</Text>
                        <Text style={tw`text-[${theme.colors.text100}] text-xs`}>{format_stat(stat)}
                        </Text>
                      </View>
                    </View>
                  )
                })
              }


            </View>

            <Button
              buttonColor='black'
              textColor='white'
              labelStyle={{ fontSize: 14 }}
              mode='outlined'
              style={tw`self-end`}
              onPress={() => { }}
            >Info Jugador</Button>
          </View>
        </View>

      </View>
    </View>
  )
}

const LineupsTab = () => {
  const { game } = useGame()
  const { theme } = useTheme()
  const [selectedIndex, setselectedIndex] = useState(0)



  return (
    <ScrollView>
      <View style={tw`mb-20 mx-1`}>
        <View style={tw`flex flex-row gap-0 justify-center w-full my-3`}>
          {
            game.data.rosters.map((elem, i) => (

              <TouchableNativeFeedback
                key={i}
                onPress={() => setselectedIndex(prev => prev == 0 ? 1 : 0)}
              >
                <View style={tw`bg-[${selectedIndex === i ? theme.colors.card100 : theme.colors.background}] border-[1px] border-[${theme.colors.card100}] flex flex-row items-center gap-1 p-4`}>
                  {get_logo(elem.team, 20)}
                  <Text style={tw`text-[${selectedIndex === i ? theme.colors.text : theme.colors.text200}]`}>{elem.team.abbreviation}</Text>
                </View>
              </TouchableNativeFeedback>
            ))
          }
        </View>

        <Roster roster={game.data.rosters[selectedIndex].roster} />
      </View>
    </ScrollView>
  )
}

export default LineupsTab