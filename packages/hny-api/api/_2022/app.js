import * as dotenv from 'dotenv'
dotenv.config()

import Fastify from 'fastify'
import cors from 'fastify-cors'
import redis from 'fastify-redis'
import getTrackInfo from './get-track-info.js'

const app = Fastify({
  logger: true,
  rewriteUrl: (req) => req.url.replace(/^\/api\/2022/, ''),
})

app.register(cors, {
  origin:
    process.env.VERCEL_ENV === 'production'
      ? ['https://fan.melchor9000.me']
      : ['http://localhost:3000'],
})

app.register(redis, {
  url: process.env.REDIS_URL,
  keyPrefix: 'hny:2022:',
  closeClient: true,
})

app.get('/', (_, reply) => reply.send({ hello: '👍' }))

app.get('/:trackId([a-zA-Z0-9]{22,22})', async (req, reply) => {
  const trackInfo = await getTrackInfo(
    req.params.trackId,
    app.redis,
    req.log.child('get-track-info'),
  )
  reply.send(trackInfo)
})

export default app
