import { useState, useEffect } from 'react'
import ChallengeCard from './components/ChallengeCard'
import SubmitForm from './components/SubmitForm'
import challenges from './data/challenges'

const FRONTEND_URL = 'https://ctf-worker.spaniklukas.workers.dev'

function App() {
  const [team, setTeam] = useState('Team1')
  const [scores, setScores] = useState({})
  const [unlocked, setUnlocked] = useState([1])

  const fetchScores = async () => {
    const res = await fetch(`${FRONTEND_URL}/api/score`)
    const data = await res.json()
    setScores(data)
  }

  useEffect(() => {
    fetchScores()
  }, [])

  const submitChallenge = async (challengeId, points) => {
    if (scores[team]?.[challengeId]) return alert('Už jste tuto úlohu vyřešili')

    await fetch(`${FRONTEND_URL}/api/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team, challengeId, points }),
    })

    await fetchScores()

    if (unlocked.length < challenges.length) {
      setUnlocked([...unlocked, unlocked.length + 1])
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          padding: '24px',
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#333' }}>CTF Lite</h1>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Tým:</label>
          <input
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              width: '150px',
              textAlign: 'center',
            }}
          />
        </div>

        <SubmitForm
          onScoreUpdate={(team, challengeId, points) => submitChallenge(challengeId, points)}
          currentTeam={team}
          challenges={challenges}
          solved={scores}
        />

        <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Úlohy</h2>

        {challenges
          .filter((c) => unlocked.includes(c.id))
          .map((c) => (
            <ChallengeCard
              key={c.id}
              challenge={c}
              onSubmit={submitChallenge}
              scores={scores[team]}
            />
          ))}

        <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Scoreboard</h2>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'center',
              fontSize: '16px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
                <th style={{ padding: '10px' }}>Tým</th>
                {challenges.map((c) => (
                  <th key={c.id} style={{ padding: '10px' }}>
                    {c.title}
                  </th>
                ))}
                <th style={{ padding: '10px' }}>Celkem</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(scores).map(([t, s]) => {
                const total = Object.values(s).reduce((a, b) => a + b, 0)
                return (
                  <tr key={t} style={{ backgroundColor: '#f9f9f9' }}>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>{t}</td>
                    {challenges.map((c) => (
                      <td key={c.id} style={{ padding: '8px' }}>
                        {s[c.id] || 0}
                      </td>
                    ))}
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>{total}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
