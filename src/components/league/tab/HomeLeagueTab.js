import { View, Text } from 'react-native'
import React from 'react'
import { useLeague } from '../../../context/LeagueContext'
import tw from 'twrnc'
import { useTheme } from '../../../context/ThemeContext'
import GameCard from '../../home/GameCard'
import { ScrollView } from 'react-native-gesture-handler'

const HomeLeagueTab = () => {

  const { league } = useLeague()
  const { theme } = useTheme()
  

  return (
    <ScrollView>
      <View style={tw`mx-1 mb-20 mt-2`}>

        <View style={tw`flex `}>
          {
            league.recentEvents.map((game, i) => (
              <View style={tw`bg-[${theme.colors.card}] mb-2`}>
                <GameCard key={i} game={game.competitions[0]} isTournament={false} />
              </View>
            ))
          }
        </View>

      </View>
    </ScrollView>
  )
}

export default HomeLeagueTab