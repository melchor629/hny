import * as dotenv from 'dotenv'
dotenv.config()

import Fastify from 'fastify'
import cors from 'fastify-cors'
import rateLimit from 'fastify-rate-limit'
import redis from 'fastify-redis'
import Redis from 'ioredis'
import getTrackInfo from './get-track-info.js'

const createFastifyApp = async () => {
  // --- redis ---
  const redisClient = new Redis({
    url: process.env.REDIS_URL,
    keyPrefix: 'hny:2022:',
  })

  // --- app setup ---
  const app = Fastify({
    logger: true,
    rewriteUrl: (req) => req.url.replace(/^\/api\/2022/, ''),
  })

  await app.register(cors, {
    origin:
      process.env.VERCEL_ENV === 'production'
        ? ['https://fan.melchor9000.me']
        : ['http://localhost:3000'],
  })
  await app.register(redis, {
    client: redisClient,
    closeClient: true,
  })
  await app.register(rateLimit, {
    max: 15,
    timeWindow: '10s',
    redis: redisClient,
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
