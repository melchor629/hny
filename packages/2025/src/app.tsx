import { memo } from 'react'
import AnimalsContainer from './hud/animals-container'
import GlCanvas from './gl/glcanvas'
import Text from './hud/text'

const App = memo(function App() {
  return (
    <>
      <GlCanvas />
      <Text />
      <AnimalsContainer />
    </>
  )
})

export default App
