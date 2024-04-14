import { convert_timestamp } from '../utils/time'

export const fetchAllLeagues = async (date) => {

    try {
        const num = new Date().getTime()
        const url = `https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=soccer&lang=es&region=ar&dates=${date}&_=${num}`
        const res = await fetch(url, { cache: "no-store"})
        const data = await res.json()
        return data.sports[0].leagues

    } catch (error) {
        console.error(error)
    }

}


export const fetchGame = async (id) => {
    const num = new Date().getTime()
    const url = `https://site.web.api.espn.com/apis/site/v2/sports/soccer/all/summary?region=ar&lang=es&contentorigin=deportes&event=${id}&_=${num}`
    const res = await fetch(url, { cache: "no-store"})
    const data = await res.json()

    const tabs = [{ penales: false,name:"Penales" }, { formaciones: false,name:"Formaciones" }, { relato: false,name:"Relato" }, { estadisticas: false,name:"Estadísticas" }, { posiciones: false,name:"Posiciones" }, { videos: false,name:"Videos" }]

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

    if ("videos" in data && data.videos.length )
        tabs.videos = true

    return { data, tabs }
}



export const fetchCoreLeague = async (id) => {

    if (id != "manifest.json") {
        const link = `https://sports.core.api.espn.com/v2/sports/soccer/leagues/${id}?lang=es&region=ar`
        const res = await fetch(link)
        const data = await res.json()

        const size = 80
        let logo = data.logos.length > 1 ? data.logos[1].href.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`) : data.logos[0].href.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
        logo += `?h=${size}&w=${size}`


        const name = data.name.replace("Argentine", "")
        const season = data.season.abbreviation
        const year = await data.season.year
        const currentStage = data.season.type
        const stages = data.season.types.items
        const startDate = convert_timestamp(data.season.startDate)
        const endDate = convert_timestamp(data.season.endDate)
        // const displayDate = `${startDate.day}/${startDate.monthNum} - ${endDate.day}/${endDate.monthNum}`


        const standingsLink = `https://site.web.api.espn.com/apis/v2/sports/soccer/${id}/standings?season=${year}&lang=es&region=ar`
        const res2 = await fetch(standingsLink)
        const data2 = await res2.json()
        const standings = "children" in data2 ? data2.children : false

        const teamsLink = `https://site.api.espn.com/apis/site/v2/sports/soccer/${id}/teams?lang=es&region=ar`
        const res3 = await fetch(teamsLink)
        const data3 = await res3.json()
        const teams = data3.sports[0].leagues[0].teams


        const num = new Date().getTime()
        const eventsLink = `https://site.api.espn.com/apis/site/v2/sports/soccer/${id}/scoreboard?lang=es&region=ar&_=${num}`
        const res4 = await fetch(eventsLink)
        const data4 = await res4.json()
        const recentEvents = data4.events


        return {  name, logo, year, currentStage, stages, standings, teams, season, id: data.slug, startDate, endDate, recentEvents }
    }

}