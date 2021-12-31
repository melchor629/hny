import { apiUrl } from '../constants'
import getCachedValue from './get-cached-value'

const getTrackInfo = (trackId) =>
  getCachedValue(`st:${trackId}`, async () => {
    const response = await fetch(`${apiUrl}/${trackId}`, {
      method: 'GET',
    })

    if (!response.ok) {
      console.error({
        message: 'Call to API failed',
        statusCode: response.status,
        response: await response.json(),
      })
      throw new Error('Call to API failed')
    }

    return {
      expiresIn: 24 * 60 * 60 * 1000,
      data: await response.json(),
    }
  })

export default getTrackInfo
