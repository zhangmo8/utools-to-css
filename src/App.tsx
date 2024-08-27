import { createSignal } from "solid-js"
import { compileString } from "sass"
import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from "@kobalte/core"

import CodeMirror from "~/components/CodeMirror"
import ThemeIcon from "~/components/ThemeIcon"
import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout"

import './App.css'

function App() {
  const storageManager = createLocalStorageManager("ui-theme")

  let previousValue: string = '';
  const [scssCode, setScssCode] = createSignal(
    `// Input your sass/scss code here \n\n$red: red;\n\n.demo {\n color: $red;\n}`
  )

  const [errorMessage, setErrorMessage] = createSignal<string>()

  const cssCode = (): string => {
    try {
      const result = compileString(scssCode()).css
      
      previousValue = result
      setErrorMessage(undefined)
      return result
    } catch (error: any) {
      setErrorMessage(error.message)

      return previousValue
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
          <div class="max-h-[480px] mb-8 overflow-auto">
            <CodeMirror onChange={onTransform} scssCode={scssCode} cssCode={cssCode} />
          </div>
          {
            errorMessage() && (
              <Callout variant={"error"}>
                <CalloutTitle>Error</CalloutTitle>
                <CalloutContent>{errorMessage()}</CalloutContent>
              </Callout>
            )
          }

        </main>
      </ColorModeProvider>
    </>
  )
}

export default App
