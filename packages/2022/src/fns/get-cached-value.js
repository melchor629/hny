const _key = (key) => `c:${key}`

const loadingValues = {}

/**
 * Gets some value from the cache or loads it using the function.
 * @param {string} key The key of the element
 * @param {() => Promise<({ expiresAt?: Date, expiresIn?: number, data: any }>} fn Load function
 * @param {Storage} storage The storage interface
 */
const getCachedValue = async (key, fn, storage = window.localStorage) => {
  if (key in loadingValues) {
    return loadingValues[key]()
  }

  const cacheKey = _key(key)
  const stored = storage.getItem(cacheKey)
  if (stored) {
    const { expiresAt, data } = JSON.parse(stored)
    if (!expiresAt || +new Date() < +new Date(expiresAt)) {
      return data
    }

    storage.removeItem(cacheKey)
  }

  let resolve, reject
  loadingValues[key] = new Promise((res, rej) => {
    ;[resolve, reject] = [res, rej]
  })

  try {
    const { expiresAt, expiresIn, data } = await fn()
    storage.setItem(
      cacheKey,
      JSON.stringify({
        expiresAt: expiresAt || new Date(Date.now() + expiresIn),
        data,
      }),
    )

    resolve(data)
    return data
  } catch (e) {
    reject(e)
    throw e
  } finally {
    delete loadingValues[key]
  }
}

export default getCachedValue
