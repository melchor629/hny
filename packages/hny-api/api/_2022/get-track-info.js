import fetch from 'node-fetch'
import getCachedValue from './get-cached-value.js'

const spotifyClientSettings = {
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
}

/**
 * @param {Response} response
 */
const checkInvalidContentType = async (response) => {
  if (response.headers.get('Content-Type') !== 'application/json') {
    const error = new Error('Unexpected error from Spotify API: not a json')
    error.response = response
    error.body = await response.text()
    throw error
  }
}

/**
 * @param {Response} response
 * @param {any} body
 */
const checkBadStatusCode = async (response, body) => {
  if (!response.ok) {
    const error = new Error(`Spotify API failed with ${response.status} ${response.statusText}`)
    error.response = response
    error.body = body
    throw error
  }
}

const getAccessToken = (redis) =>
  getCachedValue(
    'sak',
    async () => {
      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: spotifyClientSettings.refreshToken,
        }),
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${spotifyClientSettings.clientId}:${spotifyClientSettings.clientSecret}`,
          ).toString('base64')}`,
        },
      })

      await checkInvalidContentType(res)

      const response = await res.json()

      await checkBadStatusCode(res, response)

      return {
        data: response.access_token,
        expiresIn: response.expires_in * 1000,
      }
    },
    redis,
  )

const getTrackInfo = (trackId, redis) =>
  getCachedValue(
    `st:${trackId}`,
    async () => {
      const accessToken = await getAccessToken(redis)
      const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}?market=ES`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      await checkInvalidContentType(response)

      const trackInfo = await response.json()

      await checkBadStatusCode(response, trackInfo)

      return {
        expiresIn: 24 * 60 * 60 * 1000,
        data: trackInfo,
      }
    },
    redis,
  )

export default getTrackInfo
