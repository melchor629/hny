const getBackgroundSuffix = (gpu, screen, hasWebpSupport) => {
  if (!gpu.isMobile && gpu.tier >= 3 && screen.maxSide >= 2500 && hasWebpSupport) {
    return '@4k.webp'
  } else if (hasWebpSupport) {
    return '@1080.webp'
  }

  return '@1080.jpg'
}

export default getBackgroundSuffix
