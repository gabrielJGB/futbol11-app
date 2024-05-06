import { Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import tw from 'twrnc'
import { useGame } from '../../context/GameContext'
import GameTeam from './GameTeam'
import GameScore from './GameScore'
import GameScorers from './GameScorers'
import { translate_title } from '../../utils/match'

const GameHeader = ({video}) => {

    const { theme } = useTheme()
    const { game } = useGame()

    const home = game.data.header.competitions[0].competitors.find(comp => comp.homeAway === "home")
    const away = game.data.header.competitions[0].competitors.find(comp => comp.homeAway === "away")
    const status = game.data.header.competitions[0].status.type
    const date = game.data.header.competitions[0].date
    const details = game.data.header.competitions[0].details
    const stage = game.data.header.season.name.split(", ").length && game.data.header.season.name.split(", ")[1]
    const homeWinner = home.winner
    const awayWinner = away.winner

    const league_slug = game.data.header.league.slug
    const season = game.data.header.season.year
    


    return (
        <View style={tw`bg-[${theme.colors.card}] flex flex-col `}>

            {
                stage &&
                <Text style={tw`text-[${theme.colors.text200}] text-xs mx-auto`}>{translate_title(stage).toUpperCase()}</Text>
            }

            <View style={tw`flex flex-row items-center justify-evenly `}>

                <GameTeam team={home.team} league_slug={league_slug} season={season}/>

                <GameScore
                    homeWinner={homeWinner}
                    awayWinner={awayWinner}
                    score={{ home: home.score, away: away.score }}
                    shootout={"shootoutScore" in home ? { home: home.shootoutScore, away: away.shootoutScore } : false}
                    status={status}
                    date={date}

                />

                <GameTeam team={away.team} league_slug={league_slug} season={season}/>

            </View>

            {
                details &&
                    <GameScorers details={details} homeId={home.id} awayId={away.id} video={video}/>
                
            }


        </View>
    )
}

export default GameHeader