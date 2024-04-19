export const date_to_YYYYMMDD = (date) => {

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}${month}${day}`;
}


export const convert_timestamp = (timestamp) => {
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
        DDMMYYYY: `${fechaUTC.getUTCDate().toString().padStart(2, '0')}/${(fechaUTC.getUTCMonth()+1).toString().padStart(2, '0')}`,
        dateObject :fechaUTC
        
    };
}


export const format_date = (date) => {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (is_same_day(date, today)) {
        return "Hoy";
    } else if (is_same_day(date, tomorrow)) {
        return "Mañana";
    } else if (is_same_day(date, yesterday)) {
        return "Ayer";
    } else {
        const days = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
        const days_lower = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const dayOfWeek = days_lower[date.getDay()];
        const formatedDate = `${dayOfWeek} ${format_number(date.getDate())}/${format_number(date.getMonth() + 1)}/${format_number(date.getFullYear() % 100)}`;
        return formatedDate;
    }
}

export const check_date = (date)=>{
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);


    if (is_same_day(date, today)) {
        return "Hoy";
    } else if (is_same_day(date, tomorrow)) {
        return "Mañana";
    } else if (is_same_day(date, yesterday)) {
        return "Ayer"
    }
    else{
        return false
    }
    


}

const format_number = (number) => {
    return number < 10 ? '0' + number : number;
}


export const is_same_day = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
}
