const fs = require("fs");
const infoParams = "region=ar&lang=es"

const fetch_URL = async (URL) => {
    const res = await fetch(URL)
    const data = await res.json()
    return data

}

const fetchTeam = async (teamId, season) => {


    try {

        //?enable=roster
        const teamResp1 = await fetch_URL(`https://site.api.espn.com/apis/site/v2/sports/soccer/all/teams/${teamId}/schedule?${infoParams}&season=${season}`)

        if (teamResp1.events.length === 0)
            throw Error("Sin datos")

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

    }catch (error) {
        throw error
    }
}



let id_team = "6086"

fetchTeam(id_team, "2023")
    .then(resp => {


        fs.writeFile("team_resp.json", JSON.stringify(resp),
            err => {
                if (err) throw err;
                console.log("JSON Saved");
            })
    })
