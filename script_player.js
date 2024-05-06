const fs = require("fs");
const infoParams = "region=ar&lang=es"

const fetch_URL = async (URL) => {
    const time = new Date().getTime()
    const res = await fetch(`${URL}&_=${time}`)
    const data = await res.json()
    return data

}

const fetchPlayer = async (id) => {

    try {

        const resp1 = await fetch_URL(`https://site.web.api.espn.com/apis/common/v3/sports/soccer/athletes/${id}?region=ar&lang=es`)


        const resp2 = await fetch_URL(`https://site.web.api.espn.com/apis/common/v3/sports/soccer/athletes/${id}/overview?region=ar&lang=es`)

        const resp3 = await fetch_URL(`https://site.web.api.espn.com/apis/common/v3/sports/soccer/athletes/${id}/bio?region=ar`)

        const nationalTeamArray = resp3.teamHistory ? resp3.teamHistory.filter(elem => !elem.slug.includes(".") || elem.slug.includes("u17") || elem.slug.includes("u20") || elem.slug.includes("u23")) : false

        const clubsArray = resp3.teamHistory ? resp3.teamHistory.filter(elem => elem.slug.includes(".") && !elem.slug.includes("u17") && !elem.slug.includes("u20") && !elem.slug.includes("u23")) : false

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

        let eventsId = resp2.gameLog.statistics[0].events.map(event => parseInt(event.eventId))
        let events = eventsId.map(eventId => (
            resp2.gameLog.events[eventId]
        ))

        events.sort((a, b) => {
            return b.gameDate - a.gameDate;
        });



        return { ...resp1.athlete, videos, ...resp2, events, teamHistory }

    } catch (error) {
        throw error
    }
 

}



let id_player = "250284" // Cavani
// let id_player = "125298"

fetchPlayer(id_player)
    .then(resp => {

        fs.writeFile("player_resp.json", JSON.stringify(resp),
            err => {
                if (err) throw err;
                console.log("JSON Saved");
            })
    })
