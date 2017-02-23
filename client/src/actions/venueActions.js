export function updateText(text) {
  return {
    type: 'update_text',
    payload: { text }
  }
}

export function selectVenue(id) {
  return {
    type: 'choose_venue',
    payload: { id }
  }
}
