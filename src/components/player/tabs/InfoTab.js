import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableNativeFeedback } from 'react-native'
import tw from 'twrnc'
import { useTheme } from '../../../context/ThemeContext'
import { usePlayer } from '../../../context/PlayerContext'
import { useEffect } from 'react'
import { get_flag, get_logo } from '../../../utils/match'
import { Button, Divider, Icon } from 'react-native-paper'
import { convert_timestamp } from '../../../utils/time'
import { useNavigation } from '@react-navigation/native'


const InfoTab = () => {
  const { theme } = useTheme()
  const { player } = usePlayer()
  const navigation = useNavigation()
  const SIZE = 19




  const get_result_color = (result) => {
    if (result === "G")
      return "#00AD38"
    else if (result === "E")
      return "#E5FF1A"
    else if (result === "P")
      return "#FF1E2F"
  }


  const format_label = (label, pos) => {
    //{"labels": ["Ap", "G", "A", "TT", "TM", "FC", "FS", "FL", "TA", "TR"], "stat": ["Titular", "0", "0", "0", "0", "0", "1", "0", "0", "0"]}

    if (label === "A" && pos === "Arquero")
      return "Atajadas"


    switch (label) {
      case "Ap":
        return "Aparición"
      case "G":
        return "Goles"
      case "A":
        return "Asistencias"
      case "TT":
        return "Remates"
      case "TM":
        return "Remates al arco"
      case "FC":
        return "Faltas cometidas"
      case "FS":
        return "Faltas recibidas"
      case "FL":
        return "Fuera de juego"
      case "TA":
        return "Tarjetas amarillas"
      case "TR":
        return "Tarjetas rojas"
      case "VI":
        return "Valla imbatida"
      case "A":
        return "Atajadas"
      case "GA":
        return "Goles concedidos"
      case "G":
        return "Goles"
      default:
        return ""
    }

  }

  const Game = ({ game, playerTeam, statistics }) => {

    const date = convert_timestamp(game.gameDate)
    const home = game.atVs === "en" ? game.opponent : playerTeam
    const away = game.atVs === "en" ? playerTeam : game.opponent
    const navigation = useNavigation()

    const [showStats, setShowStats] = useState(false)

    return (

      <View style={tw`flex flex-col `}>
        <TouchableNativeFeedback onPress={() => setShowStats(!showStats)}>
          <View style={tw` py-3 pl-2 pr-1`}>
            <Text style={tw`text-[${theme.colors.text100}] text-[10px]`}>{game.leagueName.replace("Argentine", "").toUpperCase()}</Text>
            <View style={tw`flex flex-row py-2  `}>
              <View style={tw`flex flex-row justify-between  w-[70%] border-r-2 pr-2 border-[${get_result_color(game.gameResult)}]`}>
                <View style={tw`flex flex-col gap-2 `}>
                  <View style={tw`flex flex-row items-center gap-2`}>
                    {get_logo(home, 22)}
                    <Text style={tw`text-[${theme.colors.text}] text-sm`} numberOfLines={1}>{"displayName" in home ? home.displayName : home.abbreviation}</Text>
                  </View>
                  <View style={tw`flex flex-row items-center gap-2`}>
                    {get_logo(away, 22)}
                    <Text style={tw`text-[${theme.colors.text}] text-sm`} numberOfLines={1}>{"displayName" in away ? away.displayName : away.abbreviation}</Text>
                  </View>
                </View>

                <View style={tw`flex flex-col justify-between items-center gap-0`}>
                  <Text style={tw`text-[${theme.colors.text}] text-lg`}>{game.homeTeamScore}</Text>
                  <Text style={tw`text-[${theme.colors.text}] text-lg `}>{game.awayTeamScore}</Text>
                </View>
              </View>
              <View style={tw`flex flex-row justify-center items-center w-[30%]`}>

                <Text style={tw`text-[${theme.colors.text}] text-xs `}>
                  {`${date.day} ${date.month.slice(0, 3)} ${date.year}`}
                </Text>

              </View>
            </View>
            <View style={tw`flex flex-row justify-center items-center gap-1`}>
              <Icon source={`chevron-${showStats ? "up" : "down"}`} size={22} color={theme.colors.text} />
              <Text style={tw`text-[${theme.colors.text}] text-[11px] font-semibold`}>ESTADÍSTICAS</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <View style={tw`${showStats ? "flex" : "hidden"} flex-col gap-1 pb-2 px-1`}>
          <View style={tw`flex flex-row  justify-center flex-wrap gap-2 py-2 `}>


            {

              statistics.labels.map((label, i) => (
                <View key={i} style={tw`bg-[${theme.colors.card200}] border-[1px] border-[${theme.colors.border}] px-2 py-1 rounded-lg flex flex-col gap-0 items-center justify-start text-center `}>
                  <Text style={tw`text-[${theme.colors.text200}] text-[10px] text-center`}>{format_label(label, player.position.displayName).toUpperCase()}</Text>
                  <Text style={tw`text-[${theme.colors.text}] text-lg text-center`}>{statistics.stat[i]}</Text>
                </View>
              ))
            }
          </View>
          <Button buttonColor='black' mode='outlined' textColor='white' onPress={() => navigation.push("Game", { id: game.id })}>Ficha del partido</Button>
        </View>

      </View>


    )

  }


  const Card = ({ value, title, img }) => {


    return (
      <View style={tw`flex flex-col justify-center items-center gap-0 bg-[${theme.colors.card}] rounded-lg py-1 px-5 shadow shadow-black`}>
        <Text style={tw`text-[${theme.colors.text200}] text-xs`}>{title}</Text>
        <View style={tw`flex flex-row gap-1 items-center`}>
          {img && <Image source={{ uri: `${img}?w=${SIZE}&h=${SIZE}` }} width={SIZE} height={SIZE} />}
          <Text style={tw`text-[${theme.colors.text}] text-[17px]`}>{value}</Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={tw`flex flex-col gap-4 px-1 mt-2 mb-60`}>

        <View style={tw`  flex flex-row justify-center flex-wrap gap-2 px-1 pt-2 pb-0 `}>

          {
            "age" in player &&
            <Card title="Edad" value={player.age} img={false} />
          }

          {
            "displayDOB" in player &&
            <Card title="Fecha de nac." value={player.displayDOB} img={false} />
          }

          {
            "citizenship" in player &&
            <Card title="Nacionalidad" value={player.citizenship} img={player.flag.href ? player.flag.href : false} />
          }

          {
            "displayHeight" in player &&
            <Card title="Altura" value={player.displayHeight} img={false} />
          }

          {
            "displayWeight" in player &&
            <Card title="Peso" value={player.displayWeight} img={false} />
          }

          {
            "status" in player && player.status.type &&
            <Card title="Estado" value={player.status.type === "active" ? "En actividad" : "Retirado"} img={false} />
          }

        </View>


        <TouchableNativeFeedback
          onPress={() => {
            if ("defaultLeague" in player.team && "year" in player.team.defaultLeague) {
              
              navigation.push("Team", {
                team_id: player.team.id,
                league_slug: player.team.defaultLeague.slug,
                season: player.team.defaultLeague.season.year
              })
            }
          }}
        >
          <View style={tw`bg-black border-[1px] border-gray-500 rounded-[20px] py-1 flex flex-row items-center justify-center gap-1 `}>
            {get_logo(player.team, 25)}
            <Text style={tw`text-white text-lg`}>{player.team.displayName}</Text>
          </View>
        </TouchableNativeFeedback>



        {
          player.events.length > 0 &&
          <View style={tw`bg-[${theme.colors.card}] rounded-lg shadow shadow-black`}>
            <View style={tw`flex flex-row items-center justify-center gap-1 py-2`}>
              {/* <View style={tw`flex flex-row items-center gap-1 py-1`}> */}

              <View style={tw`w-[30px]`}></View>
              <Text style={tw`text-[${theme.colors.text}] text-lg text-center font-semibold`}>
                ÚLTIMOS PARTIDOS</Text>




              <View style={tw`flex flex-row-reverse gap-[1px]`}>
                {
                  player.gamesResults.map((e, i) => (
                    <Text key={i} style={tw`text-[${get_result_color(e)}] text-lg font-semibold `}>{e}</Text>
                  ))
                }
              </View>

            </View>

            <View style={tw`flex flex-col gap-0`}>
              {
                "statistics" in player.gameLog &&
                player.gameLog.statistics[0].events.map((elem, i) => (
                  <View key={i}>
                    <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />
                    <Game
                      key={i}
                      game={player.gameLog.events[elem.eventId]}
                      playerTeam={player.gameLog.events[elem.eventId].team}
                      statistics={{
                        labels: player.gameLog.statistics[0].labels,
                        stat: player.gameLog.statistics[0].events.find(event => event.eventId === elem.eventId).stats
                      }}
                    />
                  </View>

                ))
              }
            </View>



          </View>
        }


      </View>
    </ScrollView>
  )
}

export default InfoTab