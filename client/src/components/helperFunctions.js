import moment from 'moment'

export function hourTimeFormat(time) {
  return moment(time).format('h:mm a');
}
