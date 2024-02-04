/**
 *@return retorma a hora atual
//  *@param a numero de horas
 */

export default function getTime() {
  let hours = String(new Date().getHours());
  let minutes = String(new Date().getMinutes());
  if (Number(minutes) < 10) {
    minutes = "0" + minutes;
  }
  if (Number(hours) < 10) {
    hours = "0" + hours;
  }

  const time = `${hours}:${minutes}`;

  return { time };
}
