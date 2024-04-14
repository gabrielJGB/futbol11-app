import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableNativeFeedback, Image } from 'react-native'
import { useTheme } from '../../../context/ThemeContext'
import { useGame } from '../../../context/GameContext'
import { arrow_in, arrow_out, ball, boot, red_card, yellow_card, referee } from '../../../../assets/index'
import tw from 'twrnc'
import { get_logo } from '../../../utils/match'

const get_color_selector = (id) => {

  switch (id) {
    case '94':
      return "#ECF900"

    case '93':
      return "#E60200"
    case '138':
    case '98':
    case '137':
    case '70':
    case '173':
    case '97':
      return "#00E903"

    default:
      return "#FFFFFF"

  }
}

const get_icon = (id, i, theme) => {
  const sub_imgs = [arrow_in, arrow_out]
  const score_imgs = [ball, boot]
  const foul = ["De", "A"]
  const SIZE = 14


  switch (id) {
    case '94':
      return <Image source={yellow_card} style={{ width: SIZE, height: SIZE }} />

    case '93':
      return <Image source={red_card} style={{ width: SIZE, height: SIZE }} />

    case '76':
      return <Image source={sub_imgs[i]} style={{ width: SIZE, height: SIZE }} />

    case '36':
    case '66':
      return <Text style={tw`text-[${theme.colors.text}]`}> {foul[i]}</Text>

    case '138':
    case '98':
    case '137':
    case '70':
    case '173':
    case '97':
      return <Image source={score_imgs[i]} style={{ width: SIZE, height: SIZE }} />

    default:
      return <View></View>

  }

}


const translate_text = (text) => {

  switch (text) {
    case "Goal - Free-kick":
      return "Gol de tiro libre"

    case "Gol, anotación":
      return "Gol"
    case "Tiro a la meta":
      return "Tiro al arco"
    case "Balón mano":
      return "Mano"
    case "Fuera de lugar":
      return "Fuera de juego"
    case "Penal - Anotado":
      return "Penal convertido"
    case "Shot Hit Woodwork":
      return "Tiro en el travesáneo"
    case "Goal - Volley":
      return "Gol de volea"
    case "Penalty - Saved":
      return "Penal atajado"
    case "Penal -Errado":
      return "Penal fallado"
    case "VAR - Referee decision cancelled":
      return "El VAR anuló la desición del árbitro"
    case "Start 2nd Half Extra Time":
      return "Inicio del segundo tiempo extra"
    case "Start Extra Time":
      return "Inicio del tiempo extra"
    case "End Extra Time":
      return "Final del tiempo extra"
    case "Start Shootout":
      return "Inicio de la tanda de penales"
    case "Throw in":
      return "Saque lateral"
    default:
      return text
  }

}

const CardEvent = ({ text, clock, participants, typeId, typeText, team }) => {
  const { theme } = useTheme()
  const SIZE = 14



  return (
    <View style={tw`bg-[${theme.colors.card}] flex flex-col gap-3 py-3 px-2 shadow shadow-black`}>
      {
        clock != "" &&
        <View style={tw`flex flex-row items-center gap-2`}>

          <Text style={tw`bg-[${get_color_selector(typeId)}] text-black text-[16px] rounded px-[3px] py-[1px] font-semibold`}>
            {clock}
          </Text>
          {get_logo(team, 20)}
          <Text style={tw`text-[${get_color_selector(typeId)}] text-[16px] font-semibold`}>
            {translate_text(typeText)}
          </Text>

        </View>
      }

      <Text style={tw`text-[${theme.colors.text100}] text-sm leading-normal`}>{text} </Text>

      {
        participants &&

        <View style={tw`flex flex-col gap-2`}>
          {
            participants.map((elem, i) => (
              <View key={i} style={tw`bg-[${theme.colors.background}] flex flex-row items-center gap-1 p-2`}>

                {get_icon(typeId, i, theme)}
                <Text style={tw`text-[13px] rounded-sm text-[${theme.colors.text}]`}>{elem.athlete.displayName}</Text>

              </View>
            ))
          }
        </View>

      }

    </View>
  )
}



const CommentaryTab = () => {

  const { theme } = useTheme()
  const { game } = useGame()
  const events = "commentary" in game.data ? game.data.commentary : false
  const keyEvents = "keyEvents" in game.data ? game.data.keyEvents : false
  const [showKeyEvents, setShowKeyEvents] = useState(!events)


  const get_team = (displayName) => {

    return game.data.boxscore.teams.find(team => team.team.displayName === displayName)?.team
  }

  return (
    <ScrollView style={tw` mx-1`}>
      <View style={tw`mb-20 mt-2`}>

        {

          events && keyEvents &&

          <View style={tw`flex flex-row justify-between w-full`}>
            <View></View>

            <TouchableNativeFeedback
              onPress={() => setShowKeyEvents(!showKeyEvents)}

            >
              <View style={tw`bg-[${showKeyEvents ? theme.colors.card : theme.colors.background}] border-[1px] border-[${showKeyEvents ? theme.colors.background : "#7B7B7B"}] rounded-lg p-3 mb-3 mt-1`} >
                <Text style={tw`text-[${showKeyEvents ? theme.colors.text : "#7B7B7B"}] `} >Eventos destacados</Text>
              </View>
            </TouchableNativeFeedback>
          </View>


        }


        {
          events &&
          <View style={tw`${!showKeyEvents ? "flex" : "hidden"}  flex-col-reverse gap-3`}>
            {
              events.map((event, i) => (
                <CardEvent
                  key={i}
                  text={event.text}
                  clock={event.time.displayValue}
                  participants={event.play && "participants" in event.play && event.play.participants}
                  typeId={event.play && "type" in event.play && "id" in event.play.type && event.play.type.id}
                  typeText={event.play && "type" in event.play && "text" in event.play.type && event.play.type.text}
                  team={event.play && "team" in event.play && get_team(event.play.team.displayName)}

                />
              ))
            }
          </View>
        }

        {
          keyEvents &&
          <View style={tw`${showKeyEvents ? "flex" : "hidden"}  flex-col-reverse gap-3`}>
            {
              keyEvents.map((event, i) => (
                <CardEvent
                  key={i}
                  text={event.text}
                  clock={event.clock.displayValue}
                  participants={"participants" in event && event.participants}
                  typeId={"type" in event && "id" in event.type && event.type.id}
                  typeText={"type" in event && "text" in event.type && event.type.text}
                  team={"team" in event && get_team(event.team.displayName)}

                />
              ))
            }
          </View>
        }

      </View>
    </ScrollView>
  )
}

export default CommentaryTab