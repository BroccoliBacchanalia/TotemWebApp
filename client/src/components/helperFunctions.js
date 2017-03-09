import moment from 'moment'

export function hourTimeFormat(time) {
  return moment(time).format('h:mm a');
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
