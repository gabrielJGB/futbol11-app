import { View, Text, StatusBar, TouchableNativeFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import tw from 'twrnc'
import { get_logo } from '../../utils/match'
import { useTeam } from '../../context/TeamContext'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'

const TeamHeader = () => {

    const { theme } = useTheme()
    const { team, selectedLeagueSlug, setSelectedLeagueSlug, selectedSeason, setSelectedSeason } = useTeam()
    const navigation = useNavigation()
    const SIZE = 27



    const CustomHeader = () => {
        return (
            <View style={tw` bg-[${theme.colors.card}] flex flex-row justify-between items-center gap-1 px-1 py-0 mt-[${StatusBar.currentHeight || 0}px]`}>
                <View style={tw`w-[50%] flex flex-row items-center gap-1`}>
                    <TouchableNativeFeedback
                        
                        onPress={() => navigation.goBack()}
                    >
                        <View style={tw` rounded-lg`}>
                            <Icon source="arrow-left" size={30} color={theme.colors.text} />
                        </View>
                    </TouchableNativeFeedback>

                    {get_logo(team, SIZE)}
                    <Text numberOfLines={1} style={tw`text-[${theme.colors.text}] font-semibold text-lg`}>{team.team.displayName}</Text>
                </View>

                <Picker
                    style={tw`bg-[${theme.colors.card}] text-[${theme.colors.text}] w-[41%] text-center`}
                    selectedValue={selectedSeason}
                    selectionColor="white"
                    dropdownIconColor={theme.colors.text100}
                    prompt={`Seleccionar Temporada`}
                    onValueChange={(itemValue, itemIndex) => {setSelectedSeason(itemValue)}}

                >

                    {
                        Array.from({ length: 2025 - 2000 }, (_, index) => 2024 - index).map((a, i) => (
                            <Picker.Item key={i} color='black' label={`${a}/${String(a+1).slice(2)}`} value={a} />

                        ))
                    }

                </Picker>

            </View>
        )

    }

    useEffect(() => {

        navigation.setOptions({
            header: () => <CustomHeader />
        })

    }, [team])


    return (
        <View style={tw`bg-[${theme.colors.card}] px-0`}>



            <View style={tw`flex flex-row justify-center gap-1`}>

                {/* <Text style={tw`text-[${theme.colors.text}]  text-[21px] font-semibold`}>
                        {team.team.displayName}
                    </Text> */}

                {/* <Text style={tw`text-[${theme.colors.text100}] `}>
                        {team.leagues.find(league=>league.slug === selectedLeagueSlug).name.replace("Argentine", "")}
                        {" "}
                        {selectedSeason}
                    </Text> */}

                <Picker
                    selectionColor="white"
                    placeholder='Seleccionar competición'
                    mode='dialog'
                    itemStyle={{ color: "white", backgroundColor: "white" }}
                    prompt={`Temporada ${selectedSeason}/${selectedSeason+1}`}
                    style={tw`w-[90%] bg-[${theme.colors.card100}] text-[${theme.colors.text}]`}
                    dropdownIconColor={theme.colors.text100}
                    selectedValue={selectedLeagueSlug}
                    onValueChange={(itemValue, itemIndex) => { setSelectedLeagueSlug(itemValue) }

                    }>

                    {
                        team?.leagues.map((league,i) => (
                            <Picker.Item
                            key={i}
                                color='black'
                                label={`${league.name.replace("Argentine", "")}`}
                                value={league.slug}

                            />
                        ))
                    }

                </Picker>






            </View>





        </View>
    )
}

export default TeamHeader

