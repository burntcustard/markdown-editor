import { Accessor } from "solid-js";
import { silentMatter } from "./Tabs";

// TODO: Sort out types
export const Toolbar = ({
  tab,
  removeTab,
  tabToggleEditor,
}: {
  tab: Accessor<{
    id: number;
    grayMatter: ReturnType<typeof silentMatter>;
    rawText: string;
    editorHidden: boolean;
  }>;
  removeTab: (id: number) => void;
  tabToggleEditor: (id: number) => void;
}) => {
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

  const handleEditMdClick = () => {
    tabToggleEditor(tab().id)
  }

  return (
    <div class="toolbar">
      <button class="delete" onClick={handleDeleteClick}>Delete</button>
      <button class="import" onClick={handleImportClick}>Import</button>
      <button class="export" onClick={handleExportClick}>Export</button>
      <button class="editmd" onClick={handleEditMdClick}>Toggle Editor</button>
    </div>
  )
}
