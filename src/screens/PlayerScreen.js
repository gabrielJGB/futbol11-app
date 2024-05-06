import { View, Text } from 'react-native'
import React from 'react'
import { PlayerProvider } from '../context/PlayerContext'
import PlayerContainer from '../components/player/PlayerContainer'

const PlayerScreen = () => {

  return (
    <PlayerProvider>
      <PlayerContainer />
    </PlayerProvider>
  )
}

export default PlayerScreen