import PWABadge from './PWABadge.tsx'

import './App.css'
import { Tabs } from './Tabs.tsx'

function App() {
  return (
    <>
      <h1 class="app-title">Markdown Editor PWA</h1>
      <Tabs/>
      <PWABadge />
    </>
  )
}

export default App
