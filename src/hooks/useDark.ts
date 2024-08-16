import { Accessor, createSignal } from "solid-js";

const [isDark, setIsDark] = createSignal(false);

const toggleDark = () => {
  const _isDark = !isDark()
  setIsDark(_isDark)
}

export const useDark = (): [Accessor<boolean>, () => void] => {
  return [isDark, toggleDark]
}
