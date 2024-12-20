import { Accessor, createSignal, onMount } from "solid-js"
import IconUndo from "./icon-undo"

// TODO: Sort out types
export const Toolbar = ({
  tab,
  removeTab,
  index,
  handleFileUpload,
}: {
  tab: Accessor<{
    id: number;
    matter: Record<string, any>;
    rawText: string;
    editorHidden: boolean;
  }>;
  removeTab: (id: number) => void;
  index: number;
  handleFileUpload: (event: { target: { files: any } }) => void;
}) => {
  const [importExpanded, setImportExpanded] = createSignal(false);

  let textareaElement: HTMLTextAreaElement | null;

  onMount(() => {
    textareaElement = document.querySelector(`#tab-md-input-${index}`);
  })

  const handleUndoPointerDown = () => {
    textareaElement?.focus();
    document.execCommand('undo')
  }

  const handleRedoPointerDown = () => {
    textareaElement?.focus();
    document.execCommand('redo')
  }

  const handleUndoPointerUp = () => {
    textareaElement?.focus()
  }

  const handleRedoPointerUp = () => {
    textareaElement?.focus()
  }

  const handleDeleteClick = () => {
    removeTab(tab().id)
  }

  const handleImportClick = () => {
    setImportExpanded(!importExpanded())
  }

  const handleExportClick = () => {
    const a = document.createElement('a')
    const blob = new Blob([tab().rawText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    a.setAttribute('href', url)
    a.setAttribute('download', `${tab().matter?.title ?? '_'}.md`)
    a.click()
  }

  return (
    <div class="toolbar">
      <div class="buttons">
        <button class="basic-button undo" onPointerDown={handleUndoPointerDown} onPointerUp={handleUndoPointerUp}>
          <IconUndo width="13px" height="13px" aria-hidden="true"/><span class="sr-only">Undo</span>
        </button>
        <button class="basic-button redo" onPointerDown={handleRedoPointerDown} onPointerUp={handleRedoPointerUp}>
          <IconUndo width="13px" height="13px" aria-hidden="true" style="scale: -1 1"/><span class="sr-only">Redo</span>
        </button>
        <button class="basic-button import text" onClick={handleImportClick} aria-controls="import-modal" aria-expanded={importExpanded()}>Import</button>
        <button class="basic-button export text" onClick={handleExportClick}>Export</button>
        <button class="basic-button delete text" onClick={handleDeleteClick}>Delete</button>
      </div>

      <div id="import-modal" class="import-modal" aria-hidden={!importExpanded()}>
        <input
          tabIndex={importExpanded() ? undefined : -1}
          type="file"
          id="upload-md"
          name="upload-md"
          accept=".md"
          onchange={(e) => { handleFileUpload(e); setImportExpanded(false) }}
        />
      </div>
    </div>
  )
}

export default Toolbar;
