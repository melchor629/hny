const getCardSuffix = (gpu, screen, hasWebpSupport) => {
  const ext = hasWebpSupport ? 'webp' : 'png'
  if (gpu.isMobile) {
    if (gpu.tier >= 3 && screen.maxSide >= 2000) {
      return `@2048.${ext}`
    }
  } else {
    if (gpu.tier === 1 && screen.maxSide >= 2560) {
      return `@2048.${ext}`
    } else if (gpu.tier === 2) {
      if (screen.maxSide >= 2000) {
        return `@2048.${ext}`
      } else if (screen.maxSide >= 4000) {
        return `@4096.${ext}`
      }
    } else if (gpu.tier >= 3) {
      if (screen.maxSide >= 1500) {
        return `@2048.${ext}`
      } else if (screen.maxSide >= 2500) {
        return `@4096.${ext}`
      }
    }
  }

  return `@1024.${ext}`
}

export default getCardSuffix
