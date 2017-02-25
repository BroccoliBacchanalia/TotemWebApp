export function updateUserId(id) {
  return {
    type: 'update_userId',
    payload: { id }
  }
}

export function updateVenueId(id) {
  return {
    type: 'update_venueId',
    payload: { id }
  }
}

export function updateGroupId(id) {
  return {
    type: 'update_groupId',
    payload: { id }
  }
}
