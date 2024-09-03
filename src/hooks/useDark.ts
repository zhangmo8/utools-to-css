import { Accessor, createSignal } from "solid-js";

const getTheme = () => {
  if (window.isuTools || Boolean(window.utools)) {
    return window.utools.dbStorage.getItem('theme') === 'dark' || false
  }

  return window.localStorage.getItem('theme') === 'dark' || false
}

console.log('getTheme()', getTheme());

const [isDark, setIsDark] = createSignal(getTheme());

const toggleDark = () => {
  const _isDark = !isDark()
  const _theme = _isDark ? 'dark' : 'light'

  if (window.isuTools) {
    window.utools.dbStorage.setItem('theme', _theme)
  } else {
    window.localStorage.setItem('theme', _theme)
  }
  
  setIsDark(_isDark)
}

export const useDark = (): [Accessor<boolean>, () => void] => {
  return [isDark, toggleDark]
}
