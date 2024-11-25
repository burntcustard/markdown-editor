import { createEffect, createSignal, Index, lazy, on } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import defaultTabData from './default-tab-data.md?raw'
const Toolbar = lazy(() => import('./Toolbar'))
const Content = lazy(() => import('./Content'))

function parseFrontMatter(markdown: string): Record<string, any> {
  const frontMatterObject: Record<string, any> = {}

  // Extract the front matter block
  const frontMatterRegex = /^---[\s\S]*?\n---/
  const match = frontMatterRegex.exec(markdown)

  if (match) {
    const frontMatterContent = match[0]

    // Parse the YAML into key-value pairs
    frontMatterContent.split('\n').forEach((line) => {
      const [key, value] = line.split(/:\s*/) // Split on the first colon followed by space

      if (key && value !== undefined) {
        frontMatterObject[key.trim()] = value.trim()
      }
    })
  }

  return frontMatterObject
}

export const Tabs = () => {
  const localSelectedTabIndex = localStorage.getItem('selectedTabIndex')
  const [selectedTabIndex, setSelectedTabIndex] = createSignal(localSelectedTabIndex ? parseInt(localSelectedTabIndex) : 0)

  let tabId = 0

  const [tabStore, setTabStore] = createStore<{
    id: number;
    matter: any;
    rawText: string;
    editorHidden: boolean;
  }[]>([])

  const addTab = (rawText: string) => {
    setTabStore(
      produce((tabsData) => {
        tabsData.push({
          id: ++tabId,
          matter: parseFrontMatter(rawText),
          rawText,
          editorHidden: false
        })
      })
    )
  }

  const updateTab = (id: number, rawText: string) => {
    setTabStore(
      tabData => tabData.id === id,
      produce((tabData) => {
        tabData.matter = parseFrontMatter(rawText)
        tabData.rawText = rawText
      })
    )
  }

  const removeTab = (id: number) => {
    setTabStore(tabData => tabData.filter((t) => t.id !== id))
    // Set the selected tab to the one of the left of the removed one
    if (selectedTabIndex() >= tabStore.length) setSelectedTabIndex(tabStore.length - 1)
  }

  const tabToggleEditor = (id: number) => {
    setTabStore(
      tab => tab.id === id,
      produce((tab) => (tab.editorHidden = !tab.editorHidden)),
    )
  }

  createEffect(() => {
    localStorage.setItem('tabsData', JSON.stringify(tabStore.map((tab) => tab.rawText)))
  }, { defer: true })

  const defaultData = [ defaultTabData ]
  const localData = localStorage.getItem('tabsData')
  const startingData = (localData ? JSON.parse(localData) : defaultData)

  startingData.forEach((rawTabData: string) => addTab(rawTabData))

  createEffect(on(selectedTabIndex, (selectedTabIndex) => {
    localStorage.setItem('selectedTabIndex', selectedTabIndex.toString())
  }, { defer: true }))

  const handleFileUpload = async (event: { target: { files: any } }) => {
    for (const file of event.target.files) {
      // TODO: Don't add files that are identical to existing ones - show a warning message instead.
      addTab(await file.text())
      setSelectedTabIndex(tabStore.length - 1)
    }
  }

  const handleAddTabButtonClick = () => {
    addTab(`---\ntitle: Tab ${tabStore.length + 1}\n---\n\n# Heading 1`)
    setSelectedTabIndex(tabStore.length - 1)
  }

  let editorTextareaRef: HTMLTextAreaElement | undefined;

  return (
    <div class="tabs">
      <div class="tablist-and-add">
        <div role="tablist" aria-label="Tabs">
          <Index each={tabStore}>{(tab, index) =>
            <button
              role="tab"
              aria-selected={selectedTabIndex() === index}
              aria-controls={`panel-${index}`}
              id={`tab-button-${index}`}
              tabindex={selectedTabIndex() === index ? -1 : 0}
              onClick={() => setSelectedTabIndex(index)}
            >
              {tab().matter?.title}
              <div class="circle left"></div>
              <div class="circle right"></div>
            </button>
          }</Index>
        </div>

        <button onClick={handleAddTabButtonClick} class="add">
          <svg width="16" height="16" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg" stroke="currentcolor" aria-hidden="true">
            <path d="M1 4 H7 M4 1 V7"/>
          </svg>
          <span class="sr-only">New tab</span>
        </button>
      </div>

      <div class="panel-wrapper">
        <Index each={tabStore}>{(tab, index) =>
          <div
            id={`panel-${index}`}
            role="tabpanel"
            tabindex="-1"
            aria-labelledby={`tab-button-${index}`}
            aria-hidden={selectedTabIndex() === index ? undefined : true}
            class="tab-content"
          >
            <div class="content-and-editor">
              <div class="content-wrapper">
                <Content value={tab().rawText} />
              </div>

              <div class="editor-toggler">
                <span aria-hidden="true">---&nbsp;</span>

                <button onclick={() => tabToggleEditor(tab().id)} aria-labelledby="show-hide-editor textarea-label"></button>

                <span id="show-hide-editor">{tab().editorHidden ? 'Show' : 'Hide'}&nbsp;</span>

                <label for={`tab-md-input-${index}`} id="textarea-label">
                  Editor
                </label>

                <span aria-hidden="true">&nbsp;---</span>
              </div>

              <div class="editor" aria-hidden={tab().editorHidden}>
                <div class="toolbar-wrapper">
                  <Toolbar tab={tab} removeTab={removeTab} index={index} handleFileUpload={handleFileUpload} />
                </div>

                <textarea
                  id={`tab-md-input-${index}`}
                  rows="1"
                  cols="50"
                  oninput={(e) => updateTab(tab().id, e.target.value)}
                  ref={editorTextareaRef}
                >
                  {tab().rawText}
                </textarea>
              </div>
            </div>
          </div>
        }</Index>
      </div>
    </div>
  )
}
