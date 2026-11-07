import { useCallback, useState } from 'react'
import MissingFeatures from './missing-features'
import BasePage from './pages/base'
import Page1 from './pages/page1'
import Page2 from './pages/page2'
import Page3 from './pages/page3'
import Page4 from './pages/page4'
import Page5 from './pages/page5'
import Snow from './snow'

export default function App() {
  const [partyStarted, setPartyStarted] = useState(false)
  return (
    <div className="font-futuristic relative flex flex-col">
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
