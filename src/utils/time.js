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
        DDMMYYYY: `${fechaUTC.getUTCDate().toString().padStart(2, '0')}/${(fechaUTC.getUTCMonth()+1).toString().padStart(2, '0')}`
        
    };
}