import React, { memo } from 'react'

const CardsShadow = () => (
  <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[10, 10, 1]} receiveShadow>
    <planeGeometry args={[1, 1, 1]} />
    <shadowMaterial transparent opacity={0.9} />
  </mesh>
)

export default memo(CardsShadow)
