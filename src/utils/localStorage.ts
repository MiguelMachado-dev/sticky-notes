import type { NotesType } from 'types/notes'

const APP_KEY = '@StickyNotes'

export function getStorageItem(key: string) {
  const data = window.localStorage.getItem(`${APP_KEY}_${key}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return JSON.parse(data!)
}

export function setStorageItem(key: string, value: Array<NotesType> | string) {
  const data = JSON.stringify(value)
  return window.localStorage.setItem(`${APP_KEY}_${key}`, data)
}
