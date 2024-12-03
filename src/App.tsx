import PWABadge from './PWABadge.tsx'

import './App.css'
import { Tabs } from './Tabs.tsx'

function App() {
  return (
    <>
      <h1 class="app-title web-only"><a href="https://burnt.io/">burnt's</a> Markdown Editor</h1>
      <Tabs/>
      <PWABadge />
    </>
  )
}

export default App
