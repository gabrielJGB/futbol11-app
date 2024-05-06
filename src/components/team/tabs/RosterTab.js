import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchRoster } from '../../../utils/fetch'
import { useTeam } from '../../../context/TeamContext'
import { ActivityIndicator } from 'react-native-paper'
import tw from 'twrnc'
import Player from '../Player'
import { useTheme } from '../../../context/ThemeContext'



const Roster = () => {

  const [roster, setRoster] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { team, selectedSeason, selectedLeagueSlug } = useTeam()
  const { theme } = useTheme()

  useEffect(() => {

    setLoading(true)
    setError(false)


    fetchRoster(selectedLeagueSlug, team.team.id, selectedSeason)
      .then(resp => setRoster(resp))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false))

  }, [selectedLeagueSlug, selectedSeason])


  const get_pos = (pos) => {
    switch (pos) {
      case "G":
        return "Arqueros"
      case "D":
        return "Defensores"
      case "M":
        return "Mediocampistas"
      case "A":
        return "Delanteros"
    }
  }


  if (loading)
    return <ActivityIndicator color='white' style={{ marginTop: 20 }} />

  if (error)
    return <Text style={{ color: "white", textAlign: "center", padding: 20 }}>{error.message}</Text>


  return (
    <ScrollView>
      <View style={tw`mt-2 mx-1 mb-20`}>

        <View style={tw`flex flex-col gap-4`}>
          {
            ["G", "D", "M", "A"].map(position => {

              return (

                <View key={position} style={tw`flex flex-col gap-[1px]`}>
                  <Text style={tw`bg-[${theme.colors.card}] pt-2 pb-3 mt-2 text-[${theme.colors.text}] font-semibold text-[21px] text-center`}>{get_pos(position).toUpperCase()}</Text>

                  {
                    roster.filter(p => p.position.abbreviation === position).map(player => (
                      <Player key={player.id} player={player} />
                    ))

                  }
                </View>
              )
            })
          }
        </View>

      </View>
    </ScrollView>
  )
}

export default Roster