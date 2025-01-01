const _key = (key) => `c:${key}`

/**
 * Gets some value from the cache or loads it using the function.
 * @param key The key of the element
 * @param fn Load function
 * @param redis The redis connection
 */
const getCachedValue = async (
  key: string,
  fn: () => Promise<{ expiresIn?: number; data: any }>,
  redis: import('ioredis').Redis,
) => {
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
