import type { FastifyBaseLogger } from 'fastify'
import getCachedValue from './get-cached-value.ts'
import ApiError from './api-error.ts'

type Redis = import('ioredis').Redis

const spotifyClientSettings = {
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
}

const checkInvalidContentType = async (response: Response) => {
  if (!response.headers.get('Content-Type').startsWith('application/json')) {
    const error = new ApiError(
      'Unexpected error from Spotify API: not a json',
      response.status,
      Object.fromEntries(response.headers.entries()),
      await response.text(),
    )
    throw error
  }
}

const checkBadStatusCode = async (response: Response, body: any) => {
  if (!response.ok) {
    const error = new ApiError(
      `Spotify API failed with ${response.status} ${response.statusText}`,
      response.status,
      Object.fromEntries(response.headers.entries()),
      body,
    )
    throw error
  }
}

const getAccessToken = (redis: Redis, log: FastifyBaseLogger) =>
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

const getTrackInfo = (trackId: string, redis: Redis, log: FastifyBaseLogger) =>
  getCachedValue(
    `st:${trackId}`,
    async () => {
      const accessToken = await getAccessToken(redis, log)
      log.debug({ trackId }, 'Sending request to get track info')
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
