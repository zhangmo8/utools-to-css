import { Button } from "~/components/ui/button"
import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from "@kobalte/core"

import CodeMirror from "~/components/CodeMirror"
import ThemeIcon from "~/components/ThemeIcon"

import './App.css'

function App() {
  const storageManager = createLocalStorageManager("ui-theme")

  return (
    <>
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        <main>
          <ThemeIcon />
          <Button>Transform</Button>
          <CodeMirror />
        </main>
      </ColorModeProvider>
    </>
  )
}

export default App
