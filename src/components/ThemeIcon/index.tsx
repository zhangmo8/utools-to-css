import { useColorMode } from "@kobalte/core"
import { ToggleButton } from "@kobalte/core/toggle-button"
import { createEffect, Show } from "solid-js"

import { useDark } from "~/hooks/useDark"

const ThemeIcon = () => {
  const baseStyle = "rounded-full flex p-2 cursor-pointer"

  const [isDark, toggleDark] = useDark()

  const { setColorMode } = useColorMode()

  createEffect(() => {
    setColorMode(isDark() ? "dark" : "light")
  })

  return (
    <ToggleButton class="rounded-full border hover:bg-accent hover:text-accent-foreground absolute top-4 right-4 z-10" pressed={isDark()} onChange={toggleDark}>
      <Show when={isDark()} fallback={<div class={baseStyle} children={<i class="iconify iconoir--sun-light size-6 " />} />}>
        <div class={baseStyle} children={<i class="iconify iconoir--half-moon w-6 h-6" />} />
      </Show>
    </ToggleButton>
  );
}

export default ThemeIcon
