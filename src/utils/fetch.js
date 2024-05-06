import { convert_timestamp } from '../utils/time'

const infoParams = "region=ar&lang=es"

const divide_array = (array, numeroSubarrays) => {
    const tamanoSubarray = Math.ceil(array.length / numeroSubarrays);
    const subarrays = [];

    for (let i = 0; i < array.length; i += tamanoSubarray) {
        const subarray = array.slice(i, i + tamanoSubarray);
        subarrays.push(subarray);
    }

    return subarrays;
}

export const fetch_URL = async (URL) => {
    const time = new Date().getTime()
    const res = await fetch(`${URL}&_=${time}`)
    const data = await res.json()
    return data

}


export const fetchAllLeagues = async (date) => {

    try {
        const num = new Date().getTime()
        const url = `https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=soccer&lang=es&region=ar&dates=${date}&_=${num}`
        const res = await fetch(url, { cache: "no-store" })
        const data = await res.json()
        return data.sports[0].leagues

    } catch (error) {
        console.error(error)
    }

}


export const fetchGame = async (id) => {
    const num = new Date().getTime()
    const url = `https://site.web.api.espn.com/apis/site/v2/sports/soccer/all/summary?region=ar&lang=es&contentorigin=deportes&event=${id}&_=${num}`
    const res = await fetch(url, { cache: "no-store" })
    const data = await res.json()

    const tabs = [{ penales: false, name: "Penales" }, { formaciones: false, name: "Formaciones" }, { relato: false, name: "Relato" }, { estadisticas: false, name: "Estadísticas" }, { posiciones: false, name: "Posiciones" }, { videos: false, name: "Videos" }]

    if ("shootout" in data)
        tabs.penales = true

    if ("roster" in data.rosters[0])
        tabs.formaciones = true

    if ("commentary" in data || "keyEvents" in data)
        tabs.relato = true

    if ("statistics" in data.boxscore.teams[0] && data.boxscore.teams[0].statistics.length > 0)
        tabs.estadisticas = true

    if (data.standings.groups.length && data.standings.groups[0].standings.entries.length)
        tabs.posiciones = true

    if ("videos" in data && data.videos.length)
        tabs.videos = true

    return { data, tabs }
}



export const fetchLeague = async (slug) => {
    const leagueInfoResp = await fetch_URL(`https://sports.core.api.espn.com/v2/sports/soccer/leagues/${slug}?lang=es&region=ar`)

    const leagueInfo = {
        oneStage: leagueInfoResp.season.types.count === 1,
        stages: leagueInfoResp.season.types.items,
        currentStage: leagueInfoResp.season.type,
        name: leagueInfoResp.name,
        shortName: leagueInfoResp.shortName,
        isTournament: leagueInfoResp.isTournament,
        logos: leagueInfoResp.logos,
        startDate: convert_timestamp(leagueInfoResp.season.startDate).date,
        endDate: convert_timestamp(leagueInfoResp.season.endDate).dateBefore,
        year: leagueInfoResp.season.year,
        seasonDisplay: leagueInfoResp.season.abbreviation,
    }



    const allEventsResp = await fetch_URL(`https://site.web.api.espn.com/apis/site/v2/sports/soccer/scorepanel?league=${slug}&contentorigin=deportes&dates=${leagueInfo.startDate}-${leagueInfo.endDate}&lang=es&region=ar&limit=380`)
    const allEvents = allEventsResp.scores[0].events

    const standingsResp = await fetch_URL(`https://site.web.api.espn.com/apis/v2/sports/soccer/${slug}/standings?season=${leagueInfo.year}&lang=es&region=ar`)
    const standings = "children" in standingsResp ? standingsResp.children : false

    const teamsResp = await fetch_URL(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slug}/teams?lang=es&region=ar`)
    const teams = teamsResp.sports[0].leagues[0].teams

    leagueInfo.stages = await leagueInfo.stages.map(stage => {
        return { ...stage, "stageEvents": allEvents.filter(event => event.season.slug === stage.slug) }
    })



    leagueInfo.stages = leagueInfo.stages.map((stage, i) => {

        if (stage.hasStandings) {


            const totalEvents = stage.stageEvents.length
            const n = stage.hasLegs ? 1 : 2
            const teamCount = standings[0].standings.entries.length
            const tablesCount = standings.length
            const weeksCount = (totalEvents / (teamCount * tablesCount)) * n

            const weeksArray = divide_array(stage.stageEvents, weeksCount)

            delete stage.stageEvents

            return { ...stage, "stageEvents": weeksArray }
        }
        else
            return stage

    })

    return { ...leagueInfo, standings, teams }

}



export const fetchTeam = async (teamId, season) => {




    try {
        //?enable=roster
        const teamResp1 = await fetch_URL(`https://site.api.espn.com/apis/site/v2/sports/soccer/all/teams/${teamId}/schedule?${infoParams}&season=${season}`)

        if (teamResp1.events.length === 0)
            throw new Error("Sin datos")

        const teamResp2 = teamResp1.season.year === teamResp1.requestedSeason.year ? await fetch_URL(`https://site.api.espn.com/apis/site/v2/sports/soccer/all/teams/${teamId}/schedule?${infoParams}&fixture=true&season=${season}`) : { events: [] }

        const teamInfo = teamResp1
        const previousGames = teamResp1.events
        const nextGames = teamResp2.events

        previousGames.forEach(objeto => {
            objeto['played'] = true;
        })

        nextGames.forEach(objeto => {
            objeto['played'] = false;
        });


        let events = [...previousGames, ...nextGames]

        events.sort((a, b) => {
            return a.date.localeCompare(b.date);
        });


        const leaguesRepeated = events.map(event => event.league)
        const seasonLeagues = Array.from(new Set(leaguesRepeated.map(JSON.stringify))).map(JSON.parse)
        const leagues = seasonLeagues.map(league => ({ ...league, events: events.filter(event => event.league.id === league.id) }))

        delete teamInfo.events





        return { ...teamInfo, leagues }

    } catch (error) {
        throw error
    }

}



export const fetchArticles = async (teamId) => {

    const resp = await fetch_URL(`https://site.web.api.espn.com/apis/v2/flex?sport=soccer&league=soccer&region=ar&lang=es&contentorigin=deportes&team=${teamId}&limit=22&offset=0&pubkey=soccer-clubhouse`)
    const articles = resp.columns[1].items[0].feed.filter(article => article.type === "dStory")

    return articles

}


export const fetchRoster = async (leagueSlug, teamId, season) => {

    try {

        const resp = await fetch_URL(`https://site.api.espn.com/apis/site/v2/sports/soccer/${leagueSlug}/seasons/${season}/teams/${teamId}?enable=roster&lang=es&region=ar`)

        if (resp.team?.athletes === undefined)
            throw Error("Sin datos")


        if (resp.team.athletes != undefined && resp.team.athletes.length === 0)
            throw Error("Sin datos")


        return resp.team.athletes
    } catch (error) {
        throw error
    }
}

export const fetchLeagueStats = async (leagueSlug, season) => {
    try {

        const res = await fetch_URL(`https://site.web.api.espn.com/apis/site/v2/sports/soccer/${leagueSlug}/statistics?region=ar&lang=es&level=1&season=${season}`)

        if (!"stats" in res)
            throw Error("Sin datos")

        return res.stats


    } catch (error) {
        throw error
    }
}


export const fetchLeagueArticles = async (leagueId) => {
    https://site.web.api.espn.com/apis/site/v2/sports/soccer/arg.copa_lpf/news?lang=es&region=ar
    try {

        const res = await fetch_URL(`https://site.web.api.espn.com/apis/site/v2/sports/soccer/${leagueId}/news?lang=es&region=ar&limit=20`)

        if (!"articles" in res)
            throw Error("Sin datos")

        return res.articles


    } catch (error) {
        throw error
    }
}


export const fetchArticle = async (url) => {

    const res = await fetch_URL(url)
    return res.headlines[0]

}

export const fetchVideo = async (url) => {

    const res = await fetch_URL(url)
    return res.videos[0]

}



export const fetchPlayer = async (id) => {

    try {

        const resp1 = await fetch_URL(`https://site.web.api.espn.com/apis/common/v3/sports/soccer/athletes/${id}?region=ar&lang=es`)


        const resp2 = await fetch_URL(`https://site.web.api.espn.com/apis/common/v3/sports/soccer/athletes/${id}/overview?region=ar&lang=es`)

        const resp3 = await fetch_URL(`https://site.web.api.espn.com/apis/common/v3/sports/soccer/athletes/${id}/bio?region=ar`)

        const nationalTeamArray = resp3.teamHistory ? resp3.teamHistory.filter(elem => (!elem.slug.includes(".") && !elem.slug.includes("_")) || elem.slug.includes("u17") || elem.slug.includes("u19") || elem.slug.includes("u21") || elem.slug.includes("u20") || elem.slug.includes("u23")) : false

        const clubsArray = resp3.teamHistory ? resp3.teamHistory.filter(elem => elem.slug.includes(".")  && !elem.slug.includes("u17")&& !elem.slug.includes("u19") &&  !elem.slug.includes("u21") && !elem.slug.includes("u20") && !elem.slug.includes("u23")) : false

        const teamHistory = nationalTeamArray && clubsArray ? [ 
            {
                displayName: "Clubes",
                teams: clubsArray
            },
            {
                displayName: "Selección Nacional",
                teams: nationalTeamArray
            }
        ] : false


        const videos = resp1.videos != undefined ? resp1.videos : false

        let eventsId = resp2.gameLog.statistics[0].events?.map(event => parseInt(event.eventId))
        let events = eventsId?.map(eventId => (
            resp2.gameLog.events[eventId]
        ))

        events.sort((a, b) => {
            return b.gameDate - a.gameDate;
        });

        let gamesResults = events.map(e=>e.gameResult)

        return { ...resp1.athlete, gamesResults,videos, ...resp2, events,teamHistory }

    } catch (error) {
        throw error
    }


}

// let sofaGameId = sofaEvents.find(event=> 
//     event.homeTeam.name.toLowerCase().trim() === home.displayName.toLowerCase().trim() ||     
//     event.homeTeam.shortName.toLowerCase().trim() === home.name.toLowerCase().trim() ||
    
//     event.awayTeam.name.toLowerCase().trim() === away.displayName.toLowerCase().trim() ||     
//     event.awayTeam.shortName.toLowerCase().trim() === away.name.toLowerCase().trim() ||
    
//     event.homeTeam.shortName.toLowerCase().trim() === home.name.toLowerCase().trim() ||
//     event.awayTeam.name.toLowerCase().trim() === away.displayName.toLowerCase().trim() ||

//     event.homeTeam.nameCode.toLowerCase().trim() === home.abbreviation.toLowerCase().trim() ||
//     event.awayTeam.nameCode.toLowerCase().trim() === away.abbreviation.toLowerCase().trim()
                
// )?.id

