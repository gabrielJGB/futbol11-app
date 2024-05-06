import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlayerTabsComponent from './PlayerTabsComponent'
import { useRoute } from '@react-navigation/native'
import { usePlayer } from '../../context/PlayerContext'
import { ActivityIndicator } from 'react-native-paper'
import { fetchPlayer } from '../../utils/fetch'
import PlayerHeader from './PlayerHeader'

const PlayerContainer = () => {

    const [loading, setLoading] = useState(true)
    const route = useRoute()
    const { setPlayer } = usePlayer()
    const { id } = route.params


    useEffect(() => {


        fetchPlayer(id)
            .then(resp => setPlayer(resp))
            .finally(() => setLoading(false))

    }, [])


    if (loading)
        return <ActivityIndicator color='white' style={{ marginTop: 20 }} />

    return (
        <>
            <PlayerHeader />
            <PlayerTabsComponent />
        </>
    )
}

export default PlayerContainer