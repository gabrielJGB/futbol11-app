import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import tw from 'twrnc'
import { Button } from 'react-native-paper'
import { useGame } from '../../context/GameContext'
import GameTeam from './GameTeam'
import GameScore from './GameScore'
import GameScorers from './GameScorers'

const GameHeader = () => {

    const { theme } = useTheme()
    const { game } = useGame()
    
    const home = game.data.header.competitions[0].competitors.find(comp => comp.homeAway === "home")
    const away = game.data.header.competitions[0].competitors.find(comp => comp.homeAway === "away")
    const status = game.data.header.competitions[0].status.type
    const date = game.data.header.competitions[0].date
    const details = game.data.header.competitions[0].details


    console.log(game.data.header)

    return (
        <View style={tw`bg-[${theme.colors.card}] flex flex-col p-2`}>
            <View style={tw`flex flex-row items-center justify-evenly`}>

                <GameTeam team={home.team} />
                
                <GameScore 
                    
                    score={{home:home.score,away:away.score}}
                    shootout={"shootoutScore" in home? {home:home.shootoutScore,away:away.shootoutScore}:false}
                    status={status} 
                    date={date} 

                />

                <GameTeam team={away.team} />

            </View>

            <GameScorers details={details} homeId={home.id}  awayId={away.id}/>


        </View>
    )
}

export default GameHeader