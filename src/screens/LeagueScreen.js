import React from 'react'

import LeagueContainer from '../components/league/LeagueContainer'
import { LeagueProvider } from '../context/LeagueContext'

const LeagueScreen = () => {


  return (
    <LeagueProvider>
      <LeagueContainer />
    </LeagueProvider>
  )
}

export default LeagueScreen