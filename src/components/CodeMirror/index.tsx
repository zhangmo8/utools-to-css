import { basicSetup, EditorView } from "codemirror";
import { sass } from "@codemirror/lang-sass";
import { Compartment } from '@codemirror/state'
import { type Component, createEffect, onMount, Ref } from "solid-js";
import { vitesseLight } from 'codemirror-theme-vitesse/light'
import { vitesseDark } from 'codemirror-theme-vitesse/dark'

import { useDark } from "~/hooks/useDark";
import { localStorageManager } from "@kobalte/core";

const CodeMirror: Component<{ ref?: Ref<{ getCode: () => string }> }> = (props) => {
  let mirrorRef: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;
  let editorRef: EditorView | undefined;

  const themeConfig = new Compartment();

  const [isDark] = useDark()

  function initMirror() {
    if (mirrorRef) {
      const theme = localStorageManager.get();

      editorRef = new EditorView({
        doc: `// Input your sass/scss code here

              $refd: red;

              .demo {
                color: $refd;}`,
        extensions: [basicSetup, sass(), themeConfig.of([theme === 'dark' ? vitesseDark : vitesseLight])],
        parent: mirrorRef as Element,
      });
    }
  }

  function getCode() {
    return editorRef?.state.doc.toString() || '';
  }

  props.ref && props.ref({ getCode })

  onMount(initMirror)

  createEffect(() => {
    const theme = isDark() ? vitesseDark : vitesseLight;

    editorRef?.dispatch({
      effects: themeConfig.reconfigure([theme])
    })
  })

  return (
    <div ref={mirrorRef}></div>
  );
}

export default CodeMirror
