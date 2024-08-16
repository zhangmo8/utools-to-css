import { Button } from "~/components/ui/button"
import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from "@kobalte/core"

import CodeMirror from "~/components/CodeMirror"
import ThemeIcon from "~/components/ThemeIcon"

import './App.css'
import { compileString } from "sass"

function App() {
  const storageManager = createLocalStorageManager("ui-theme")

  let codeRef: { getCode: () => string } | undefined;

  const onTransform = () => {
    console.log('code()', compileString(codeRef?.getCode() || '').css);
  }

  return (
    <>
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        <main class="p-12">
          <ThemeIcon />
          <Button onclick={onTransform}>Transform</Button>
          <h1 class="scroll-m-20 text-4xl font-bold">Sass/Scss to Css tool</h1>
          <p class="my-4 text-balance text-lg sub_title">Enter your SCSS/SASS code, which will be converted to CSS code</p>
          <CodeMirror ref={codeRef} />
        </main>
      </ColorModeProvider>
    </>
  )
}

export default App
