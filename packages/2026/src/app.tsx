import { useCallback, useState } from 'react'
import BasePage from './pages/base'
import Page1 from './pages/page1'
import Page2 from './pages/page2'
import Page3 from './pages/page3'
import Page4 from './pages/page4'
import Snow from './snow'
import Page5 from './pages/page5'
import MissingFeatures from './missing-features'

export default function App() {
  const [partyStarted, setPartyStarted] = useState(false)
  return (
    <div className="relative flex flex-col font-futuristic">
      <Snow />
      <MissingFeatures />

      <BasePage />
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 startParty={useCallback(() => setPartyStarted(true), [])} />
      <Page5 show={partyStarted} />
    </div>
  )
}
