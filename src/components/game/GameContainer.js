import React, { useEffect, useState } from 'react'
import {ScrollView} from 'react-native'
import { fetchGame } from '../../utils/fetch'
import { useGame } from '../../context/GameContext';
import GameTabsComponent from './GameTabsComponent';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc'
import GameHeader from './GameHeader';

const GameContainer = () => {

    const [loading, setLoading] = useState(true)
    const [screenTitle, setScreenTitle] = useState("")
    const [isFullTime, setIsFullTime] = useState(null)
    const [tabs, setTabs] = useState(null)
    const { setGame } = useGame()
    const { id, video } = useRoute().params
    const navigation = useNavigation()


    useEffect(() => {
        _fetchGame()
        
        
        if (!isFullTime) {
            const intervalId = setInterval(() => {
                _fetchGame()
            }, 1000 * 30)

            return () => clearInterval(intervalId)
        }
    }, [isFullTime])



    useEffect(() => {
        navigation.setOptions({ title: screenTitle  });
    }, [screenTitle]);


    const _fetchGame = () => {
        
        fetchGame(id)
            .then(resp => {
                setIsFullTime(resp.data.header.competitions[0].status.type.state === "post")
                setScreenTitle(resp.data.header.league.name.replace("Argentine", ""))
                setTabs(resp.tabs)
                setGame(resp)

            })
            // .then(() => setRefreshing(false))
            .finally(() => setLoading(false))

    }

    if (loading)
        return <ActivityIndicator color='white' style={{ marginTop: 20 }} />



    return (

        <>
            <GameHeader video={video} />
            <GameTabsComponent tabs={tabs} video={video} />
        </>

    )
}

export default GameContainer