import { useState, useEffect } from 'react'
import ChallengeCard from './ChallengeCard'
import challenges from './challenges' // pole s úlohami

const FRONTEND_URL = 'https://ctf-worker.spaniklukas.workers.dev/' // URL tvého Workeru

function App() {
  const [team, setTeam] = useState('Team1')
  const [scores, setScores] = useState({})
  const [unlocked, setUnlocked] = useState([1]) // první úloha odemčená

  // Načtení scoreboardu z Workeru
  const fetchScores = async () => {
    const res = await fetch(`${FRONTEND_URL}/api/score`)
    const data = await res.json()
    setScores(data)
  }

  useEffect(() => {
    fetchScores()
  }, [])

  // Odevzdání úlohy
  const submitChallenge = async (challengeId, points) => {
    if (scores[team]?.[challengeId]) return alert('Už jste tuto úlohu vyřešili')

    await fetch(`${FRONTEND_URL}/api/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team, challengeId, points }),
    })

    await fetchScores()

    // odemknout další úlohu
    if (unlocked.length < challenges.length) {
      setUnlocked([...unlocked, unlocked.length + 1])
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>CTF Lite</h1>
      <div>
        <label>
          Tým:
          <input value={team} onChange={(e) => setTeam(e.target.value)} />
        </label>
      </div>

      <h2>Úlohy</h2>
      {challenges
        .filter((c) => unlocked.includes(c.id))
        .map((c) => (
          <ChallengeCard key={c.id} challenge={c} onSubmit={submitChallenge} scores={scores[team]} />
        ))}

      <h2>Scoreboard</h2>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Tým</th>
            {challenges.map((c) => (
              <th key={c.id}>{c.name}</th>
            ))}
            <th>Celkem</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(scores).map(([t, s]) => {
            const total = Object.values(s).reduce((a, b) => a + b, 0)
            return (
              <tr key={t}>
                <td>{t}</td>
                {challenges.map((c) => (
                  <td key={c.id}>{s[c.id] || 0}</td>
                ))}
                <td>{total}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
