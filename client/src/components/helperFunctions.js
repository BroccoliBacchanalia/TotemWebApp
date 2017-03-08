export function hourTimeFormat(time) {
  const milliSeconds = Date.parse(time);
  const timeOffset = new Date(milliSeconds).getTimezoneOffset();
  const date = new Date(milliSeconds + (timeOffset * 1000 * 60));

  return date.toTimeString().substring(0, 5);
}
