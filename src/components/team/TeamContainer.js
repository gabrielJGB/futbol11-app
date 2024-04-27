import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TeamTabsComponent from './TeamTabsComponents'
import { useTeam } from '../../context/TeamContext'
import TeamHeader from './TeamHeader'
import { fetchTeam } from '../../utils/fetch'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'



// https://site.web.api.espn.com/apis/v2/flex?sport=soccer&league=soccer&region=ar&lang=es&contentorigin=deportes&team=5&limit=10&offset=10&pubkey=soccer-clubhouse 
// type = dstory

const TeamContainer = () => {

  const { setTeam, team, setSelectedLeagueSlug, selectedLeagueSlug, selectedSeason, setSelectedSeason } = useTeam()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const route = useRoute()
  const { team_id, league_slug, season } = route.params

  useEffect(() => {

    setSelectedLeagueSlug(league_slug)
    setSelectedSeason(season)

  }, [route.params])


  useEffect(() => {

    if (selectedSeason && selectedLeagueSlug) {
      setError(false)
      setLoading(true)
      fetchTeam(team_id, selectedSeason)
        .then(resp => { setTeam(resp) })
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    }

  }, [selectedSeason])





  if (loading)
    return <ActivityIndicator color='white' style={{ marginTop: 20 }} />

  if (error)
    return <Text style={{ color: "white", textAlign: "center", padding: 20 }}>{error.message}</Text>

  return (

    <>
      <TeamHeader />
      <TeamTabsComponent />
    </>
  )
}

export default TeamContainer