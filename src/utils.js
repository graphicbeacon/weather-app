export default function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${date.getDate()}/${formattedMonth}/${date.getFullYear()}`;
  const hours = date.getUTCHours();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const minutes = date.getUTCMinutes();
  const formattedMinutes = minutes === 0 ? '00' : minutes;
  const time = `${formattedHours}:${formattedMinutes}`;

  return { formattedDate, time };
}
