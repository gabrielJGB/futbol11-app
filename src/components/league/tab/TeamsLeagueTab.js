import React from 'react'
import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native'
import { useLeague } from '../../../context/LeagueContext'
import { useTheme } from '../../../context/ThemeContext'
import tw from 'twrnc'
import { get_logo } from '../../../utils/match'

const TeamsLeagueTab = () => {
  const { league } = useLeague()
  const { theme } = useTheme()

  return (
    <ScrollView>
      <View style={tw`mx-1 mb-20 mt-2`}>

        <View style={tw`flex flex-col gap-2`}>

          {
            league.teams.map((team) => (
              <TouchableNativeFeedback
                key={team.team.id}
                onPress={() => { }}
              >
                <View style={tw`bg-[${theme.colors.card}] w-full px-2 py-3 flex flex-row items-center gap-3`}>
                  {get_logo(team.team,17)}
                  <Text style={tw`text-[${theme.colors.text}]`}>{team.team.displayName}</Text>
                </View>
              </TouchableNativeFeedback>

            ))
          }

        </View>
      </View>
    </ScrollView>
  )
}

export default TeamsLeagueTab