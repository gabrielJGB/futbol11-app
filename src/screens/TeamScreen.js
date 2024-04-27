import React from 'react'
import { TeamProvider } from '../context/TeamContext'
import TeamContainer from '../components/team/TeamContainer'
import { SafeAreaView } from 'react-native'

const TeamScreen = () => {


  return (
    
      <TeamProvider>
        <TeamContainer />
      </TeamProvider>
    
  )
}

export default TeamScreen