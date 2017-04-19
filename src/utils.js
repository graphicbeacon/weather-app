export default function formatDateTime(dateTime) {
    let date = new Date(dateTime),
        month = date.getMonth() + 1,
        formattedMonth = month < 10 ? `0${month}` : month,
        formattedDate = `${date.getDate()}/${formattedMonth}/${date.getFullYear()}`,
        
        hours = date.getUTCHours(),
        formattedHours = hours < 10 ? `0${hours}`: hours,
        
        minutes = date.getUTCMinutes(),
        formattedMinutes = minutes === 0 ? '00' : minutes,

        time = `${formattedHours}:${formattedMinutes}`;

    return { formattedDate, time }
}