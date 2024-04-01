import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { fetchGame } from '../utils/fetch';
import { useRoute } from '@react-navigation/native';
import TabComponents from '../components/game/TabComponents';



const GameScreen = () => {


  const [game, setGame] = useState(false)
  const [loading, setLoading] = useState(true)

  const { id } = useRoute().params

  useEffect(() => {
    _fetchGame()

    const intervalId = setInterval(() => {
      _fetchGame()
    }, 1000 * 120)

    return () => clearInterval(intervalId)
  }, [])


  const _fetchGame = () => {

    fetchGame(id)
      .then(resp => setGame(resp))
      // .then(() => setRefreshing(false))
      .finally(() => setLoading(false))

  }



  if (loading)
    return <Text>Cargando...</Text>


  return (


    //aca un gameState con el objeto game en lugar del props

    // este comentario se ve solo en home-tabs pero no en main

    <TabComponents  />


    

  )
}

export default GameScreen