import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLeague } from '../../../context/LeagueContext'
import { fetchLeagueStats } from '../../../utils/fetch'
import { ActivityIndicator } from 'react-native-paper'
import tw from 'twrnc'
import { useTheme } from '../../../context/ThemeContext'
import { get_logo } from '../../../utils/match'
import { useNavigation } from '@react-navigation/native'

const StatsLeagueTab = () => {

    const { league } = useLeague()
    const { theme } = useTheme()
    const [error, setError] = useState(false)
    const [stats, setStats] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()


    useEffect(() => {

        setError(false)
        setLoading(true)

        fetchLeagueStats(league.slug, league.year)
            .then(resp => setStats(resp))
            .catch(error => setError(error))
            .finally(() => setLoading(false))

    }, [])

    if (loading)
        return <ActivityIndicator color='white' style={{ marginTop: 20 }} />

    if (error)
        return <Text style={{ color: "white", textAlign: "center", padding: 20 }}>{error.message}</Text>


    return (
        <ScrollView >
            <View style={tw`mt-2 mx-1 mb-20`}>

                {
                    stats.map((stat, i) => (
                        <View key={i} style={tw`my-2 `}>
                            <Text style={tw`text-[${theme.colors.text}] text-center text-[22px] mb-1 font-semibold`}>{`${stat.displayName.toUpperCase()} (PARTIDOS)`}</Text>

                            <View style={tw`flex flex-col gap-[1px] `}>
                                {
                                    stat.leaders.map((leader, k) => (
                                        <TouchableNativeFeedback key={k} onPress={()=>navigation.push("Player",{id:leader.athlete.id})}>
                                            <View  style={tw`bg-[${theme.colors.card}] flex flex-row  justify-between w-full gap-1 px-2  py-3 items-center`}>
                                                <View style={tw`flex flex-row items-center gap-2 justify-between `}>
                                                    <Text style={tw`text-[${theme.colors.text200}]`}>#{k + 1}</Text>
                                                    {get_logo(leader.athlete.team, 18)}
                                                    <Text style={tw`text-[${theme.colors.text}] w-[20px] text-center`}>{leader.athlete.jersey}</Text>
                                                    <Text style={tw`text-[${theme.colors.text}]`}>{leader.athlete.displayName}</Text>
                                                </View>

                                                <View style={tw`flex flex-row gap-1 items-center`}>
                                                    <Text style={tw`text-[${theme.colors.text}] text-[20px] font-semibold`}>{leader.value}</Text>
                                                    <Text style={tw`text-[${theme.colors.text100}] text-[14px] `}>({leader.athlete.statistics[0].value})</Text>
                                                </View>
                                            </View>
                                        </TouchableNativeFeedback>
                                    ))
                                }
                            </View>
                        </View>
                    ))
                }

            </View>
        </ScrollView>
    )
}

export default StatsLeagueTab