import PropTypes from 'prop-types'
import React, { Suspense } from 'react'
import { Background, Card, CardsLight, CardsShadow, Effects, Loader, LoaderListener } from './'

const Scene = ({ container }) => (
  <>
    <color attach="background" args={['#000000']} />
    <ambientLight intensity={0.01} color="#F6FFEE" />

    <CardsLight />
    <pointLight
      color="#ffffff"
      intensity={1}
      decay={2}
      distance={3}
      position={[-1.81241, 1.21982, 8.148]}
    />

    <CardsShadow />

    <Suspense fallback={<Loader container={container} />}>
      <Card position={[0.5, 0, 0]} cardName="jarai" />
      <Card position={[0, 0, 0]} cardName="memes" />
      <Card position={[-0.5, 0, 0]} cardName="landi" />
      <Card position={[-1, 0, 0]} cardName="john-lles" />
      <Card position={[-1.5, 0, 0]} cardName="eduardo-doble-h" />
      <Card position={[-2, 0, 0]} cardName="music" />
      <Card position={[-2.5, 0, 0]} cardName="pato" />

      <Background />
      <LoaderListener container={container} />

      <Effects />
    </Suspense>
  </>
)

Scene.propTypes = {
  container: PropTypes.instanceOf(HTMLDivElement).isRequired,
}

export default Scene
