import { createSignal } from "solid-js"
import { compileString } from "sass"
import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from "@kobalte/core"

import CodeMirror from "~/components/CodeMirror"
import ThemeIcon from "~/components/ThemeIcon"

import './App.css'

function App() {
  const storageManager = createLocalStorageManager("ui-theme")

  const [scssCode, setScssCode] = createSignal(
    `// Input your sass/scss code here \n\n$red: red;\n\n.demo {\n color: $red;\n}`
  )

  const cssCode = () => {
    try {
      const result = compileString(scssCode()).css
      return result
    } catch (error: any) {
      return error.message
    }
  }


  function onTransform(codeStr: string) {
    setScssCode(codeStr)
  }

  return (
    <>
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        <main class="p-12">
          <ThemeIcon />
          <h1 class="scroll-m-20 text-4xl font-bold">Sass/Scss to Css tool</h1>
          <p class="my-4 text-balance text-lg sub_title">Enter your SCSS/SASS code, which will be converted to CSS code</p>
          <CodeMirror onChange={onTransform} scssCode={scssCode} cssCode={cssCode} />
        </main>
      </ColorModeProvider>
    </>
  )
}

export default App
