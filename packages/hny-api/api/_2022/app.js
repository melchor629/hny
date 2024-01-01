import * as dotenv from 'dotenv'
dotenv.config()

import Fastify from 'fastify'
import getTrackInfo from './get-track-info.js'

const createFastifyApp = async () => {
  // --- app setup ---
  const app = Fastify({
    logger: true,
    trustProxy: true,
    rewriteUrl: (req) => req.url.replace(/^\/api\/2022/, ''),
  })

  await app.register(import('@fastify/cors'), {
    origin:
      process.env.VERCEL_ENV === 'production'
        ? ['https://fan.melchor9000.me']
        : ['http://localhost:3000'],
  })
  await app.register(import('@fastify/redis'), {
    url: process.env.REDIS_URL,
    keyPrefix: 'hny:2022:',
    enableOfflineQueue: true,
    connectTimeout: 4000,
    tls: !!process.env.VERCEL_ENV,
  })
  await app.register(import('@fastify/rate-limit'), {
    max: 15,
    timeWindow: '10s',
    redis: app.redis,
  })

  // --- routes ---
  app.get('/', (_, reply) => reply.send({ hello: '👍' }))

  app.get('/:trackId([a-zA-Z0-9]{22,22})', async (req, reply) => {
    const trackInfo = await getTrackInfo(
      req.params.trackId,
      app.redis,
      req.log.child('get-track-info'),
    )
    reply.send(trackInfo)
  })

  // --- error handling ---
  app.setNotFoundHandler(
    {
      preHandler: app.rateLimit({
        max: 4,
        timeWindow: 30,
      }),
    },
    (req, reply) =>
      reply.code(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: `Route ${req.method} /api/2022/${req.url} not found`,
      }),
  )

  return app
}

export default createFastifyApp
