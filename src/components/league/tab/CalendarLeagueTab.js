import { View, Text } from 'react-native'
import React from 'react'
import { useLeague } from '../../../context/LeagueContext'
import tw from 'twrnc'
import { useTheme } from '../../../context/ThemeContext'
import { ScrollView } from 'react-native-gesture-handler'

const CalendarLeagueTab = () => {

  const { league } = useLeague()
  const { theme } = useTheme()
  console.log(league.stages)

  return (
    <ScrollView>
      <View style={tw`mx-1 mb-20 mt-2`}>

        <View style={tw`flex flex-col gap-1`}>
          {
            league.stages.length > 1 &&

            league.stages.map((stage, i) => (
              <Text style={tw`text-[${theme.colors.text}] bg-[${theme.colors.card}] px-2 py-3 w-full`} key={i}>{stage.name}</Text>
            ))
          }
        </View>

        

      </View>
    </ScrollView>
  )
}

export default CalendarLeagueTab