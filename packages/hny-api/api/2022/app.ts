import { type FastifyPluginCallback } from 'fastify'
import getTrackInfo from './get-track-info.ts'

const create2022Api: FastifyPluginCallback = async (app) => {
  await app.register(import('@fastify/redis'), {
    url: process.env.REDIS_URL,
    keyPrefix: 'hny:2022:',
    enableOfflineQueue: true,
    connectTimeout: 4000,
  })
  await app.register(import('@fastify/rate-limit'), {
    max: 15,
    timeWindow: '10s',
    redis: app.redis,
  })

  // --- routes ---
  app.get('/', (_, reply) => reply.send({ hello: '👍' }))

  app.get<{ Params: { trackId: string } }>('/:trackId([a-zA-Z0-9]{22,22})', async (req, reply) => {
    const trackInfo = await getTrackInfo(
      req.params.trackId,
      app.redis,
      req.log.child({ name: 'get-track-info' }),
    )
    reply.send(trackInfo)
  })

  return app
}

export default create2022Api
