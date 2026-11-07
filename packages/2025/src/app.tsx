import { memo } from 'react'
import GlCanvas from './gl/glcanvas'
import AnimalsContainer from './hud/animals-container'
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
