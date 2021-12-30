const _key = (key) => `c:${key}`

/**
 * Gets some value from the cache or loads it using the function.
 * @param {string} key The key of the element
 * @param {() => Promise<({ expiresIn?: number, data: any }>} fn Load function
 * @param {ReturnType<import('ioredis')>} redis The redis connection
 */
const getCachedValue = async (key, fn, redis) => {
  const cacheKey = _key(key)
  const stored = await redis.get(cacheKey)
  if (stored) {
    return JSON.parse(stored)
  }

  const { expiresIn, data } = await fn()
  if (typeof expiresIn === 'number') {
    await redis.set(cacheKey, JSON.stringify(data), 'PX', Math.trunc(expiresIn))
  } else {
    await redis.set(cacheKey, JSON.stringify(data))
  }

  return data
}

export default getCachedValue
