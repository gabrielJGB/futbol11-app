import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import tw from 'twrnc'
import { get_logo } from '../../utils/match'


const Team = ({ team,isStatePre }) => {

    const { theme } = useTheme()




    return (
        <View style={tw.style(`border-[${team.winner ? theme.colors.border100 : theme.colors.border}]`, ` flex flex-row justify-between items-center py-[3px] pr-2 border-r-[2px]`)}>

            <View style={tw`flex flex-row gap-2 items-center w-[79%]`} >
                {get_logo(team, 22)}

                <Text
                    numberOfLines={1}
                    style={tw.style(`text-sm text-[${theme.colors.text}]`, team.winner && `font-semibold`)}
                >
                    {"team" in team ? team.team.displayName : team.displayName}

                </Text>
            </View>

            <View style={tw.style(`flex flex-row items-end gap-[2px] `)}>
                {
                    !isStatePre &&
                        <Text style={tw.style(`text-[${theme.colors.text}]`, ` text-lg `)}>{team.score}</Text>
                }
                {
                    "shootoutScore" in team &&
                    <Text style={tw.style(`text-[${theme.colors.text100}] text-xs `)}>{team.shootoutScore}</Text>
                }
            </View>
        </View>
    )
}

export default Team