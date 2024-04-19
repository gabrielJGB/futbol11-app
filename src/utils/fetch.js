import { convert_timestamp } from '../utils/time'

const divide_array = (array, numeroSubarrays) => {
    const tamanoSubarray = Math.ceil(array.length / numeroSubarrays);
    const subarrays = [];

    for (let i = 0; i < array.length; i += tamanoSubarray) {
        const subarray = array.slice(i, i + tamanoSubarray);
        subarrays.push(subarray);
    }

    return subarrays;
}


const fetch_URL = async (URL) => {
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
