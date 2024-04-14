import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useGame } from '../../../context/GameContext'
import { useTheme } from '../../../context/ThemeContext'
import { get_logo } from '../../../utils/match'
import tw from 'twrnc'


const getLabel = (label) => {

  switch (label) {
    case "Fouls":
      return "Faltas"
    case "Corner Kicks":
      return "Tiros de esquina"
    case "Possession":
      return "% Posesión"
    case "POSSESSION":
      return "% Posesión"
    case "Fuera de Lugar":
      return "Fuera de Juego"
    case "Salvadas":
      return "Atajadas"
    case "TIROS":
      return "Tiros totales"
    case "SHOTS":
      return "Tiros totales"
    case "ON GOAL":
      return "Tiros al arco"
    case "A GOL":
      return "Tiros al arco"
    case "On Target %":
      return "% Tiros al arco"
    case "% al arco":
      return "Tiros"
    case "Penalty Goals":
      return "Goles de penal"
    case "Penalty Kicks Taken":
      return "Penales atajados"
    case "Accurate Passes":
      return "Pases precisos"
    case "Passes":
      return "Pases"
    case "Pass Completion %":
      return "% Pases completados"
    case "Accurate Crosses":
      return "Centros precisos"

    case "Cross %":
      return "% Centros"
    case "Crosses":
      return "Centros"
    case "Tackles":
      return "Barridas"
    case "Tackle %":
      return "% Barridas"

    case "Effective Tackles":
      return "Barridas efectivas"

    case "Blocked Shots":
      return "Tiros bloqueados"
    case "Long Balls %":
      return "% Pases aereos"
    case "Accurate Long Balls":
      return "Pases aereos precisos"

    case "Long Balls":
      return "Pases arereos"

    case "Clearances":
      return "Despejes"
    case "Effective Clearances":
      return "Despejes efectivos"

    case "Interceptions":
      return "Intercepciones"


    default:
      return label
  }

}

const Stat = ({ homeStat, awayStat }) => {
  const { theme } = useTheme()
  let homeWidth = 0
  let awayWidth = 0
  let homeValue = Math.abs(parseFloat(homeStat.displayValue))
  let awayValue = Math.abs(parseFloat(awayStat.displayValue))
  let total = homeValue + awayValue

  homeWidth = (homeValue * 100) / total
  awayWidth = (awayValue * 100) / total
  homeWidth = homeWidth ? homeWidth : 0
  awayWidth = awayWidth ? awayWidth : 0


  return (
    <View>
  
      {
        homeStat.displayValue != "0" &&
        awayStat.displayValue != "0" &&
        !homeStat.label.includes("%") &&
        !homeStat.label.includes("Effective") &&

        <View style={tw`flex flex-col mb-[10px]`}>
          <Text style={tw`text-[${theme.colors.text}] text-center font-semibold mb-[2px]`}>{getLabel(homeStat.label)}</Text>

          <View style={tw`bg-[${theme.colors.card}] flex flex-row items-center justify-between gap-[2px] w-full px-2 rounded-md`}>

            <View style={tw`flex flex-row items-center justify-between w-1/2`}>
              <Text style={tw`text-[${theme.colors.text}] text-[17px]  font-semibold pr-1`}>{parseInt(homeStat.displayValue).toFixed()}</Text>
              <Text style={tw`text-[${theme.colors.text}] h-[6px] w-[${homeWidth.toFixed()}%] bg-[#43e143] rounded-l-sm`}></Text>
            </View>

            <View style={tw`flex flex-row items-center justify-between w-1/2`}>
              <Text style={tw`text-[${theme.colors.text}] h-[6px] w-[${awayWidth.toFixed()}%] bg-[#3787ff] rounded-r-sm`}></Text>
              <Text style={tw`text-[${theme.colors.text}] text-[17px] font-semibold pl-1`}>{parseInt(awayStat.displayValue).toFixed()}</Text>
            </View>

          </View>
        </View>

      }

    </View>
  )
}


const StatsTab = () => {

  
  const { game } = useGame()
  const home = game.data.boxscore.teams[0]
  const away = game.data.boxscore.teams[1]
  const statsLength = game.data.boxscore.teams[0].statistics.length

  return (
    <ScrollView style={tw`mx-1`}>
      <View style={tw`mt-2 mb-20`}>

        <View style={tw`flex flex-col`}>

          <View style={tw`w-full flex-row justify-between`}>
            {get_logo(home.team, 20)}
            {get_logo(away.team, 20)}
          </View>

          {
            new Array(statsLength).fill(0).map((e, i) => (
              <Stat
                key={i}
                homeStat={home.statistics[i]}
                awayStat={away.statistics[i]} />
            ))
          }

        </View>
      </View>
    </ScrollView>
  )
}

export default StatsTab