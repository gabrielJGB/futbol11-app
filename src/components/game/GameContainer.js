import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

import { View, Text } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { fetchGame } from '../../utils/fetch'
import { useGame } from '../../context/GameContext';
import GameTabsComponent from './GameTabsComponent';
import { ActivityIndicator } from 'react-native-paper';
import GameHeader from './GameHeader';

const GameContainer = () => {

    const {  setGame } = useGame()
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
        return <ActivityIndicator color='white' style={{ marginTop: 20 }} />



    return (

        <>
            <GameHeader/>
            <GameTabsComponent />
        </>

    )
}

export default GameContainer