import { getGPUTier } from 'detect-gpu'
import { useAsset } from 'use-asset'
import detectWebpSupport from './detect-webp-support'
import getBackgroundSuffix from './get-background-suffix'
import getCardSuffix from './get-card-suffix'

const useGameSettings = () => {
  const data = useAsset(async () => {
    const [gpu, webpLossy, webpAlpha] = await Promise.all([
      getGPUTier(),
      detectWebpSupport('lossy'),
      detectWebpSupport('alpha'),
    ])

    const hasWebpSupport = webpLossy && webpAlpha
    const screen = {
      width: window.screen.width,
      height: window.screen.height,
      maxSide: Math.max(window.screen.width, window.screen.height),
    }
    const cardSuffix = getCardSuffix(gpu, screen, hasWebpSupport)
    const backgroundSuffix = getBackgroundSuffix(gpu, screen, hasWebpSupport)

    return {
      gpu,
      hasWebpSupport,
      screen,
      enableSSAO: !gpu.isMobile && gpu.tier >= 2,
      cardSuffix,
      backgroundSuffix,
    }
  }, ['game-settings'])

  return data
}

export default useGameSettings
