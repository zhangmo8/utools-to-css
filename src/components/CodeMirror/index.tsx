import { Accessor, type Component, createComputed, createMemo, onMount, untrack } from "solid-js";

import { basicSetup, EditorView } from "codemirror";
import { sass } from "@codemirror/lang-sass";
import { EditorState } from '@codemirror/state'

import { Resizable, ResizableHandle, ResizablePanel } from "~/components/ui/resizable"
import { vitesse } from "./theme";

const CodeMirror: Component<{ scssCode: Accessor<string>, cssCode: Accessor<string>, onChange: (code: string) => void }> = (props) => {
  let editorMirrorRef: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;
  let readonlyMirrorRef: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;

  let editorRef: EditorView | undefined;
  let readonlyRef: EditorView | undefined;

  const extensions = [basicSetup, vitesse]

  function initMirror() {
    if (editorMirrorRef && readonlyMirrorRef) {
      const code = untrack(createMemo(props.scssCode))
      const compiledCode = untrack(createMemo(props.cssCode))

      editorRef = new EditorView({
        doc: code,
        extensions: [...extensions, sass()],
        parent: editorMirrorRef as Element,
        dispatch(tr) {
          editorRef?.update([tr])
          if (tr.docChanged) {
            props?.onChange(editorRef?.state.doc.toString() || '')
          }
        }
      });

      readonlyRef = new EditorView({
        doc: compiledCode || '',
        extensions: [
          ...extensions,
          sass({ indented: true }),
          EditorView.editable.of(false),
          EditorState.readOnly.of(true)
        ],
        parent: readonlyMirrorRef as Element,
      });
    }
  }

  onMount(initMirror)

  createComputed(() => {
    const newCssCode = createMemo(props.cssCode)
    if (newCssCode() === readonlyRef?.state.doc.toString()) {
      return
    }

    readonlyRef?.dispatch({
      changes: { from: 0, to: readonlyRef.state.doc.length, insert: newCssCode() || '' }
    });
  });

  return (
    <Resizable orientation="horizontal">
      <ResizablePanel>
        <div ref={editorMirrorRef}></div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div ref={readonlyMirrorRef}></div>
      </ResizablePanel>
    </Resizable>
  );
}

export default CodeMirror
