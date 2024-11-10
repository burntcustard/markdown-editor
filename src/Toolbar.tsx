import { Accessor, onMount } from "solid-js";
import { silentMatter } from "./Tabs";

// TODO: Sort out types
export const Toolbar = ({
  tab,
  removeTab,
  index,
}: {
  tab: Accessor<{
    id: number;
    grayMatter: ReturnType<typeof silentMatter>;
    rawText: string;
    editorHidden: boolean;
  }>;
  removeTab: (id: number) => void;
  index: number;
}) => {
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

  }

  const handleExportClick = () => {
    const a = document.createElement('a')
    const blob = new Blob([tab().rawText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    a.setAttribute('href', url)
    a.setAttribute('download', `${tab().grayMatter?.data.title ?? '_'}.md`)
    a.click()
  }

  return (
    <div class="toolbar">
      <button class="undo" onPointerDown={handleUndoPointerDown} onPointerUp={handleUndoPointerUp}>↶<span class="sr-only">Undo</span></button>
      <button class="redo" onPointerDown={handleRedoPointerDown} onPointerUp={handleRedoPointerUp}>↷<span class="sr-only">Redo</span></button>
      <button class="import text" onClick={handleImportClick}>Import</button>
      <button class="export text" onClick={handleExportClick}>Export</button>
      <button class="delete text" onClick={handleDeleteClick}>Delete</button>
    </div>
  )
}
