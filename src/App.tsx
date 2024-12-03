import PWABadge from './PWABadge.tsx'

import './App.css'
import { Tabs } from './Tabs.tsx'

function App() {
  return (
    <>
      <div><h1 class="app-title web-only"><a href="https://burnt.io/">burnt's</a> Markdown Editor</h1></div>
      <Tabs/>
      <PWABadge />
    </>
  )
}

export default App
