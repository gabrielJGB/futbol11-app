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