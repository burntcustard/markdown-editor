import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.tsx'

import './App.css'
import { Tabs } from './Tabs.tsx'

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={appLogo} class="logo" alt="random-encounter-pwa logo" />
        </a>
      </div>
      <h1>random-encounter-pwa</h1>
      <Tabs/>
      <PWABadge />
    </>
  )
}

export default App
