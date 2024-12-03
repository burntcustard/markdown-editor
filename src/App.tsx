import PWABadge from './PWABadge.tsx'

import './App.css'
import { Tabs } from './Tabs.tsx'

function App() {
  return (
    <>
      <h1 class="app-title"><span class="web-only"><a href="https://burnt.io/">burnt's</a> Markdown Editor</span></h1>
      <Tabs/>
      <PWABadge />
    </>
  )
}

export default App
