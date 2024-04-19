import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../../context/ThemeContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from 'twrnc'

import { ActivityIndicator, Icon } from 'react-native-paper'
import LeagueTabsComponent from './LeagueTabsComponents'
import { useLeague } from '../../context/LeagueContext'
import { fetchLeague } from '../../utils/fetch'
import LeagueHeader from './LeagueHeader'

const LeagueContainer = () => {

    const [loading, setLoading] = useState(true)
    const [screenTitle, setScreenTitle] = useState("")


    const { id } = useRoute().params
    const { setLeague } = useLeague()
    const navigation = useNavigation()

    useEffect(() => {

        fetchLeague(id)
            .then(resp => setLeague(resp))
            .finally(() => setLoading(false))

    }, [])



    useEffect(() => {
        navigation.setOptions({
            title: screenTitle,

            // headerRight:()=><Icon source="calendar" size={20} color={theme.colors.text} theme={theme}/>

        })

    }, [screenTitle]);

    if (loading)
        return <ActivityIndicator color='white' style={{ marginTop: 20 }} />


    return (
        <>
            <LeagueHeader />
            <LeagueTabsComponent />
        </>
    )
}

export default LeagueContainer