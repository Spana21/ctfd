import { Hono } from 'hono'
import { cors } from 'hono/cors' 

// const app = new Hono<{ Bindings: Env }>()  → změna:
const app = new Hono()

app.use(
  '*',
  cors({
    origin: 'https://ctfd-7xq.pages.dev',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
  })
)

// POST /api/score
app.post('/api/score', async (c) => {
  const body = await c.req.json()
  const { team, challengeId, points } = body

  if (!team || !challengeId || !points) {
    return c.json({ error: 'invalid request' }, 400)
  }

  const currentData = await c.env.SCOREBOARD.get(team)
  const teamData = currentData ? JSON.parse(currentData) : {}

  if (!teamData[challengeId]) {
    teamData[challengeId] = points
    await c.env.SCOREBOARD.put(team, JSON.stringify(teamData))
  }

  return c.json({ success: true, team, scores: teamData })
})

async function getAllScores(kv) {
  const keys = await kv.list()
  const scores = {}
  for (const k of keys.keys) {
    const value = await kv.get(k.name)
    scores[k.name] = value ? JSON.parse(value) : {}
  }
  return scores
}

app.get('/api/score', async (c) => {
  const scoreboard = await getAllScores(c.env.SCOREBOARD)
  return c.json(scoreboard)
})

app.get('/api/reset', async (c) => {
  const keys = await c.env.SCOREBOARD.list()
  for (const k of keys.keys) {
    await c.env.SCOREBOARD.delete(k.name)
  }
  return c.json({ success: true, message: 'Scoreboard vymazán' })
})

export default app
