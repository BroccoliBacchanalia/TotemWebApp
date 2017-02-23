export function toggleMenu(hide) {
  return {
    type: 'toggle_menu',
    payload: {
      hide: hide
    }
  }
}
