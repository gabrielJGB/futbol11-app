import { convert_timestamp } from "./time"
import { logo_404,penalty,red_card,ball } from '../../assets/index'
import { Image } from "react-native"

export const get_flag = (item,SIZE) => {
    const slug = item.slug.slice(0, 3)
    const p = 15
    const arr = ['fif', 'afc', 'clu', 'con', 'uef']


    if (arr.includes(slug)) {
        return ""
    }

    
    const logo = `https://a1.espncdn.com/combiner/i?img=/i/teamlogos/countries/500/${item.slug.slice(0, 3)}.png?w=${SIZE+p}&h=${SIZE+p}`

    return <Image source={{ uri: logo }} width={SIZE} height={SIZE} />
}

export const get_logo = (team_p, SIZE) => {
    let logo = ""
    const p = 15

    let team = "team" in team_p?team_p.team:team_p

    if ("logo" in team && Array.isArray(team.logo)) {
        logo = team.logo[0].href
        logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
        logo += `&h=${SIZE + p}&w=${SIZE + p}`
        return <Image source={{ uri: logo }} width={SIZE} height={SIZE} />
    }


    if ("logo" in team && team.logo != "") {
        logo = team.logo
        logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
        logo += `&h=${SIZE + p}&w=${SIZE + p}`
        return <Image source={{ uri: logo }} width={SIZE} height={SIZE} />
    }

    if ("logos" in team && team.logos.length > 0) {
        logo = team.logos[0].href
        logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
        logo += `&h=${SIZE + p}&w=${SIZE + p}`
        return <Image source={{ uri: logo }} width={SIZE} height={SIZE} />

    }

    return <Image source={logo_404} style={{width:SIZE,height:SIZE}} />
}

export const translate_title = (title)=>{

    title = title.replace("Argentine", "").replace(","," -").replace("2024","")
    title = title.replace("Round of 64","32avos de final")
    title = title.replace("Round of 32","16avos de final")
    title = title.replace("Round of 16","Octavos")
    title = title.replace("Round of 8","Cuartos")
    title = title.replace("Ronda de 64","32avos de final")
    title = title.replace("Ronda de 32","16avos de final")
    title = title.replace("Ronda de 16","Octavos")
    title = title.replace("Ronda de 8","Cuartos")
    title = title.replace("First Round","Primera Ronda")
    title = title.replace("Second Round","Segunda Ronda")
    title = title.replace("Third Round","Tercera Ronda")
    title = title.replace("Fourth Round","Cuarta Ronda")
    title = title.replace("Fifth Round","Quinta Ronda")
    return title.toUpperCase()

}

export const get_status = (elem, date) => {
    let status = elem.name

    switch (status) {
        case "STATUS_HALFTIME":
            return "E.T.";

        case "STATUS_SCHEDULED":
            return convert_timestamp(date).time;

        case "STATUS_FIRST_HALF":
            return `${elem.detail} PT`
        case "STATUS_SECOND_HALF":
            return `${parseInt(elem.detail)-45}' ST`
            // return `${elem.detail}`

        case "STATUS_OVERTIME":
        case "STATUS_HALFTIME_ET":
            return elem.detail;

        case "STATUS_ABANDONED":
            return "Suspendido"

        case "STATUS_POSTPONED":
            return "Aplazado";

        case "STATUS_IN_PROGRESS":
            return "Jugando"

        case "STATUS_DELAYED":
            return "Retrasado"

        case "STATUS_CANCELED":
            return "Cancelado";

        case "STATUS_SHOOTOUT":
        case "STATUS_END_OF_EXTRATIME":
            return "Penales";

        case "STATUS_FULL_TIME":
            return "Finalizado";

        case "STATUS_FINAL_PEN":
            return "Finalizado (Pen.)";

        case "STATUS_FINAL_AET":
            return "Finalizado (T. Extra)";

        default:
            return "";
    }
}


export const get_detail_icon = (detail) => {
    const SIZE_2 = 10
    const SIZE_3 = 13

    if (detail.penaltyKick)
        return <Image source={penalty} style={{width:SIZE_3,height:SIZE_3}} />
    else if (detail.redCard)
        return <Image  source={red_card} style={{width:SIZE_2,height:SIZE_2}} />
    else if (detail.scoringPlay)
        return <Image  source={ball} style={{width:SIZE_2,height:SIZE_2}} />
}