export function updateUserId(id) {
  return {
    type: 'update_fbId',
    payload: { id }
  }
}
