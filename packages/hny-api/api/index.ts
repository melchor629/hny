import Fastify from 'fastify'

// --- app setup ---
const app = Fastify({
  logger: true,
  trustProxy: true,
  rewriteUrl: (req) => req.url.replace(/^\/api/, ''),
  return503OnClosing: true,
})

// --- register cors for all apis ---
await app.register(import('@fastify/cors'), {
  origin:
    process.env.NODE_ENV === 'production'
      ? ['https://fan.melchor9000.me']
      : ['http://localhost:3000'],
})

// --- register apis ---
await app.register(import('./2022/app.ts'), { prefix: '/2022' })

app.setNotFoundHandler((req, reply) =>
  reply.code(404).send({
    statusCode: 404,
    error: 'Not Found',
    message: `Route ${req.method} /api${req.url} not found`,
  }),
)

// --- start app ---
const closeSignal = new AbortController()
process.on('SIGINT', () => closeSignal.abort())
process.on('SIGTERM', () => closeSignal.abort())

await app.ready()
await app.listen({
  host: '::',
  port: parseInt(process.env.PORT || '3001', 10),
  signal: closeSignal.signal,
})
