// based on https://developers.google.com/speed/webp/faq#in_your_own_javascript
const kTestImages = {
  lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
  lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
  alpha:
    'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
  animation:
    'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
}

const detectWebpSupport = (feature) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const result = img.width > 0 && img.height > 0
      resolve(result)
    }
    img.onerror = () => {
      resolve(false)
    }

    if (feature in kTestImages) img.src = `data:image/webp;base64,${kTestImages[feature]}`
    else reject(new Error(`Unexpected feature ${feature}: supported ${Object.keys(kTestImages)}`))
  })

export default detectWebpSupport
