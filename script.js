const fs = require("fs");

const convert_timestamp = (timestamp) => {
    const fechaUTC = new Date(timestamp);
    fechaUTC.setUTCHours(fechaUTC.getUTCHours() - 3);
    const hora = fechaUTC.getUTCHours().toString().padStart(2, '0') + ':' + fechaUTC.getUTCMinutes().toString().padStart(2, '0');
    const fecha = fechaUTC.getUTCFullYear().toString() + (fechaUTC.getUTCMonth() + 1).toString().padStart(2, '0') + fechaUTC.getUTCDate().toString().padStart(2, '0');
    const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][fechaUTC.getUTCDay()];
    const mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][fechaUTC.getUTCMonth()];

    const date_2 = new Date(fechaUTC.getTime() - 86400000)
    const dateBefore = date_2.getUTCFullYear().toString() + (date_2.getUTCMonth() + 1).toString().padStart(2, '0') + date_2.getUTCDate().toString().padStart(2, '0');


    return {
        time: hora,
        date: fecha,
        dayOfWeek: diaSemana,
        month: mes,
        year: fechaUTC.getUTCFullYear(),
        day: fechaUTC.getUTCDate(),
        dateBefore,
        DDMMYYYY: `${fechaUTC.getUTCDate().toString().padStart(2, '0')}/${(fechaUTC.getUTCMonth() + 1).toString().padStart(2, '0')}`,
        dateObject: fechaUTC

    };
}

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

const fetchLeague = async (slug) => {
    const leagueInfoResp = await fetch_URL(`https://sports.core.api.espn.com/v2/sports/soccer/leagues/${slug}?lang=es&region=ar`)

    const leagueInfo = {
        oneStage: leagueInfoResp.season.types.count === 1,
        stages: leagueInfoResp.season.types.items,
        curentStage: leagueInfoResp.season.type,
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


let slug = "uefa.champions"

fetchLeague(slug)
    .then(resp => {


        fs.writeFile("resp.json", JSON.stringify(resp),
            err => {
                if (err) throw err;
                console.log("JSON Saved");
            })


    })
