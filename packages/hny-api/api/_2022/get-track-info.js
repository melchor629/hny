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
    error.status = response.status
    error.headers = Object.fromEntries(response.headers.entries())
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
    error.status = response.status
    error.headers = Object.fromEntries(response.headers.entries())
    error.body = body
    throw error
  }
}

const getAccessToken = (redis, log) =>
  getCachedValue(
    'sak',
    async () => {
      log.debug('Sending request to get a new access token')
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

      await checkInvalidContentType(res, log)

      const response = await res.json()

      await checkBadStatusCode(res, response, log)

      return {
        data: response.access_token,
        expiresIn: response.expires_in * 1000,
      }
    },
    redis,
  )

const getTrackInfo = (trackId, redis, log) =>
  getCachedValue(
    `st:${trackId}`,
    async () => {
      const accessToken = await getAccessToken(redis)
      log.debug('Sending request to get track info', { trackId })
      const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}?market=ES`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      await checkInvalidContentType(response, log)

      const trackInfo = await response.json()

      await checkBadStatusCode(response, trackInfo, log)

      return {
        expiresIn: 24 * 60 * 60 * 1000,
        data: trackInfo,
      }
    },
    redis,
  )

export default getTrackInfo
