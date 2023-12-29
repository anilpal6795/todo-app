export const getItemFromLocalStorage = (key: string) => {
  return window.localStorage.getItem(key)
}

export const setItemToLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value)
}
