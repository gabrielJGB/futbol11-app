import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
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
          <Text style={tw`text-[${theme.colors.text}] text-center font-semibold text-lg pb-2`}>EVENTOS DESTACADOS</Text>
          {/* {
            league.recentEvents.map((game, i) => (
              <View key={i} style={tw`bg-[${theme.colors.card}] mb-2`}>
                <GameCard

                  id={game.id}
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
          } */}
        </View>

      </View>
    </ScrollView>
  )
}

export default HomeLeagueTab