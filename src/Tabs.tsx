import { createEffect, createSignal, Index, on } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { SolidMarkdown } from 'solid-markdown'
import matter from 'gray-matter'
import defaultTabData from './default-tab-data.md?raw'

const silentMatter = (rawText: string) => {
  let grayMatter = null

  try {
    grayMatter = matter(rawText)
  } catch(error) {
    console.warn('Unable to parse markdown, reason:', (error as Error).message)
  }

  return grayMatter
}

export const Tabs = () => {
  const localSelectedTabIndex = localStorage.getItem('selectedTabIndex')
  const [selectedTabIndex, setSelectedTabIndex] = createSignal(localSelectedTabIndex ? parseInt(localSelectedTabIndex) : 0)

  let tabId = 0

  const [tabStore, setTabStore] = createStore<{
    id: number;
    grayMatter: ReturnType<typeof silentMatter>;
    rawText: string;
  }[]>([])

  const addTab = (rawText: string) => {
    setTabStore(
      produce((tabsData) => {
        tabsData.push({ id: ++ tabId, grayMatter: silentMatter(rawText), rawText })
      })
    )
  }

  const updateTab = (id: number, rawText: string) => {
    setTabStore(
      tabData => tabData.id === id,
      produce((tabData) => {
        const parsedText = silentMatter(rawText)

        if (parsedText) {
          tabData.grayMatter = parsedText
          tabData.rawText = rawText
        }
      })
    )
  }

  const removeTab = (id: number) => {
    setTabStore(tabData => tabData.filter((t) => t.id !== id))
    // Set the selected tab to the one of the left of the removed one
    if (selectedTabIndex() >= tabStore.length) setSelectedTabIndex(tabStore.length - 1)
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

  const handleFileChange = async (event: { target: { files: any } }) => {
    for (const file of event.target.files) {
      // TODO: Don't add files that are identical to existing ones - show a warning message instead.
      addTab(await file.text())
      setSelectedTabIndex(tabStore.length - 1)
    }
  }

  const handleAddTabButtonClick = () => {
    addTab('---\ntitle: New tab X\n---\n\n# Heading 1')
    setSelectedTabIndex(tabStore.length - 1)
  }

  return (
    <div class="tabs">
      <div>
        <input
          type="file"
          id="upload-md"
          name="upload-md"
          accept=".md"
          onchange={handleFileChange}
        />
      </div>

      <div role="tablist" aria-label="Tabs">
        <Index each={tabStore}>{(tab, index) =>
          <div>
            <button
              role="tab"
              aria-selected={selectedTabIndex() === index}
              aria-controls={`panel-${index}`}
              id={`tab-button-${index}`}
              tabindex={selectedTabIndex() === index ? 0 : -1}
              onClick={() => setSelectedTabIndex(index)}
            >
              {tab().grayMatter?.data.title}
            </button>
            <button onClick={() => removeTab(tab().id)}>x</button>
          </div>
        }</Index>
        <button onClick={handleAddTabButtonClick}>+</button>
      </div>

      <div>
        <Index each={tabStore}>{(tab, index) =>
          <div
            id={`panel-${index}`}
            role="tabpanel"
            tabindex="0"
            aria-labelledby={`tab-button-${index}`}
            hidden={selectedTabIndex() === index ? undefined : true}
          >
            <SolidMarkdown class="markdown-wrapper" children={tab().grayMatter?.content} />
            <textarea rows="8" cols="33" oninput={(e) => updateTab(tab().id, e.target.value)}>
              {tab().rawText}
            </textarea>
          </div>
        }</Index>
      </div>
    </div>
  )
}
