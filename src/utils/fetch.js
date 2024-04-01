export const fetchAllLeagues = async (date) => {

    try {
        const num = new Date().getTime()
        const url = `https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=soccer&lang=es&region=ar&dates=${date}&_=${num}`
        const res = await fetch(url)
        const data = await res.json()
        return data.sports[0].leagues

    } catch (error) {
        console.error(error)
    }

}


export const fetchGame = async (id) => {
    const url = `https://site.web.api.espn.com/apis/site/v2/sports/soccer/all/summary?region=ar&lang=es&contentorigin=deportes&event=${id}`
    const res = await fetch(url)
    const data = await res.json()
    
    const tabs = ["INFORMACIÓN", "PREVIA"]

    if ("shootout" in data)
        tabs.push("PENALES")

    if ("roster" in data.rosters[0])
        tabs.push("FORMACIONES")

    if ("commentary" in data || "keyEvents" in data)
        tabs.push("RELATO")

    if ("statistics" in data.boxscore.teams[0] && data.boxscore.teams[0].statistics.length > 0)
        tabs.push("ESTADÍSTICAS")

    if (data.standings.groups.length && data.standings.groups[0].standings.entries.length)
        tabs.push("POSICIONES")

    if (data.videos?.length)
        tabs.push("VIDEOS")

    return {data,tabs}
}