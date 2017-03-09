export function hourTimeFormat(time) {
  const milliSeconds = Date.parse(time);
  const timeOffset = new Date(milliSeconds).getTimezoneOffset();
  const date = new Date(milliSeconds + (timeOffset * 1000 * 60));

  return date.toTimeString().substring(0, 5);
}

export function localTimeMilliseconds(milliSeconds) {
  const timeOffset = new Date(milliSeconds).getTimezoneOffset();
  return milliSeconds + (timeOffset * 1000 * 60);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().split(' ').map(function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1, string.length);
  }).join(' ');
}
