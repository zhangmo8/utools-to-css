import { basicSetup, EditorView } from "codemirror";
import { sass } from "@codemirror/lang-sass";
import { Compartment } from '@codemirror/state'
import { createEffect, onMount } from "solid-js";
import { githubDark } from "@fsegurai/codemirror-theme-github-dark"
import { githubLight } from "@fsegurai/codemirror-theme-github-light";

import { useDark } from "~/hooks/useDark";
import { localStorageManager } from "@kobalte/core";

const CodeMirror = () => {
  let mirrorRef: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;
  let editorRef: EditorView | undefined;

  const themeConfig = new Compartment();

  const [isDark] = useDark()

  createEffect(() => {
    const theme = isDark() ? githubDark : githubLight;

    editorRef?.dispatch({
      effects: themeConfig.reconfigure([theme])
    })
  })


  function initMirror() {
    if (mirrorRef) {
      const theme = localStorageManager.get();
      
      editorRef = new EditorView({
        doc: '// Input your sass/scss code here',
        extensions: [basicSetup, sass(), themeConfig.of([theme === 'dark' ? githubDark : githubLight])],
        parent: mirrorRef as Element,
      });
    }
  }

  onMount(initMirror)

  return (
    <div ref={mirrorRef}></div>
  );
}

export default CodeMirror
