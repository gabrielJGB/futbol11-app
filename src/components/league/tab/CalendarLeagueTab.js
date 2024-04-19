import { View, Text, TouchableNativeFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLeague } from '../../../context/LeagueContext'
import tw from 'twrnc'
import { useTheme } from '../../../context/ThemeContext'
import { ScrollView } from 'react-native-gesture-handler'
import GameCard from '../../home/GameCard'
import { Icon } from 'react-native-paper'
import { convert_timestamp } from '../../../utils/time'
import { translate_title } from '../../../utils/match'


const CalendarLeagueTab = () => {

  const { league } = useLeague()
  const { theme } = useTheme()
  const [selectedStage, setSelectedStage] = useState(league.stages.find(stage => stage.slug === league.currentStage.slug))
  const [selectedWeek, setSelectedWeek] = useState(0)


  useEffect(() => {

    getCurrentWeek()

  }, [selectedStage])


  const getCurrentWeek = () => {
    if (selectedStage.hasStandings && selectedStage.stageEvents.length > 0) {

      for (let i = 0; i < selectedStage.stageEvents.length; i++) {

        let x = selectedStage.stageEvents[i].find(elem => elem.status.type.state === "pre")

        if (x != undefined || i == selectedStage.stageEvents.length - 1) {
          setSelectedWeek(i)
          break;
        }
      }
    }
  }

  const getStageComponent = () => {


    if (selectedStage.stageEvents.length != 0) {


      if (selectedStage.hasStandings && selectedStage.stageEvents.length > 0) {
        return selectedStage.stageEvents[selectedWeek]
      }
      else if (!selectedStage.hasStandings && selectedStage.stageEvents.length > 0) {
        return selectedStage.stageEvents
      }

    }


    return []

  }

  const getArrows = () => {

    return (

      <View>


        <View style={tw`flex flex-row gap-2 flex-wrap justify-center items-center py-4 px-1 `}>

          {
            selectedStage.stageEvents.map((elem, i) => (
              <TouchableNativeFeedback
                onPress={() => setSelectedWeek(i)}
              >
                <View style={tw`flex justify-center items-center bg-[${selectedWeek === i ? theme.colors.card100 : theme.colors.card}] rounded-sm w-[50px] h-[50px]`}>
                  <Text style={tw`text-[${theme.colors.text}]  text-lg`}>{i + 1}</Text>
                </View>
              </TouchableNativeFeedback>
            ))
          }

        </View>

        <View style={tw`flex flex-row items-center justify-between w-full py-2 px-1`}>
          {
            selectedWeek > 0 ?
              <TouchableNativeFeedback
                onPress={() => {
                  setSelectedWeek(selectedWeek - 1)

                }}
              >
                <View style={tw`bg-[${theme.colors.card}] rounded-sm`}>
                  <Icon source="chevron-left" color='white' size={50} />
                </View>
              </TouchableNativeFeedback>
              :
              <View style={tw`w-[50px]`}></View>
          }
          <Text style={tw`text-[${theme.colors.text}] text-lg`}>Fecha {selectedWeek + 1}</Text>

          {
            selectedWeek < selectedStage.stageEvents.length - 1 ?
              <TouchableNativeFeedback
                onPress={() => {
                  setSelectedWeek(selectedWeek + 1)
                  
                }}
              >
                <View style={tw`bg-[${theme.colors.card}]`}>
                  <Icon source="chevron-right" color='white' size={50} />
                </View>
              </TouchableNativeFeedback>
              :
              <View style={tw`w-[50px]`}></View>
          }

        </View>

      </View>
    )

  }

  const get_date_string = (date) => {

    const x = convert_timestamp(date)

    return `${x.month} ${x.year}`

  }

  return (
    <ScrollView>
      <View style={tw`mx-1 mb-100 mt-2`}>


        {
          !league.oneStage &&
          <View style={tw`flex flex-col gap-1`}>

            {league.stages.map((stage, i) => (
              <TouchableNativeFeedback
                key={i}
                onPress={() => setSelectedStage(stage)}
              >
                <View>
                  <Text style={tw`text-[${theme.colors.text}] bg-[${selectedStage.slug === stage.slug ? theme.colors.card100 : theme.colors.card}] px-2 py-3 w-full`}>
                    {translate_title(stage.name)}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            ))
            }
          </View>

        }

        {
          !league.oneStage &&
          <Text style={tw`text-[${theme.colors.text}] mt-2 text-2xl text-center font-semibold`}>{translate_title(selectedStage.name)}</Text>
        }

        <View style={tw`flex flex-col gap-2 my-4`}>

          {
            selectedStage.hasStandings && selectedStage.stageEvents.length > 0 &&
            getArrows()
          }

          {
            selectedStage.stageEvents.length === 0 &&
            <View style={tw``}>
              <Text style={tw`text-[${theme.colors.text}] text-center mt-2`}> Todavía no se han definido los partidos de esta fase </Text>
              <View style={tw`flex flex-row justify-center gap-1`}>

                <Text style={tw`text-[${theme.colors.text200}] mt-3 text-xs text-left`}>
                  {get_date_string(selectedStage.startDate)}
                </Text>

              </View>
            </View>

          }

          {
            getStageComponent()?.map((game, i) => (
              <View key={i} style={tw`bg-[${game.status.type.state === "post" ? theme.colors.card : theme.colors.card}]`}>
                <GameCard

                  id={game.id}
                  key={game.id}
                  home={game.competitions[0].competitors[0]}
                  away={game.competitions[0].competitors[1]}
                  isTournament={false}
                  video={false}
                  date={game.date}
                  status={game.status}
                  dateString={true}


                />
              </View>
            ))
          }


        </View>

      </View>
    </ScrollView>
  )
}

export default CalendarLeagueTab