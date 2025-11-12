import { useState, useEffect } from 'react';
import ChallengeCard from './components/ChallengeCard';
import SubmitForm from './components/SubmitForm';
import { challenges } from './data/challenges';

const FRONTEND_URL = 'https://ctf-worker.spaniklukas.workers.dev';

function App() {
  const [team, setTeam] = useState('Team1');
  const [scores, setScores] = useState({});
  const [unlocked, setUnlocked] = useState([1]);

  const fetchScores = async () => {
    try {
      const res = await fetch(`${FRONTEND_URL}/api/score`);
      const data = await res.json();
      setScores(data);
    } catch (err) {
      console.error('Chyba při načítání skóre:', err);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const submitChallenge = async (challengeId, points) => {
    if (scores[team]?.[challengeId]) return alert('Už jste tuto úlohu vyřešili');

    try {
      await fetch(`${FRONTEND_URL}/api/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team, challengeId, points }),
      });

      await fetchScores();

      if (unlocked.length < challenges.length) {
        setUnlocked([...unlocked, unlocked.length + 1]);
      }
    } catch (err) {
      console.error('Chyba při odesílání úlohy:', err);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>CTF Lite</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Tým: 
          <input value={team} onChange={(e) => setTeam(e.target.value)} style={{ marginLeft: '8px', padding: '4px 8px', fontSize: '16px' }} />
        </label>
      </div>

      <h2>Úlohy</h2>
      {challenges
        .filter(c => unlocked.includes(c.id))
        .map(c => (
          <ChallengeCard key={c.id} challenge={c} onSubmit={submitChallenge} scores={scores[team] || {}} />
        ))}

      <SubmitForm
        currentTeam={team}
        challenges={challenges}
        solved={scores}
        onScoreUpdate={(challengeId, points) => submitChallenge(challengeId, points)}
      />

      <h2>Scoreboard</h2>
      <table style={{ margin: '20px auto', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Tým</th>
            {challenges.map(c => <th key={c.id} style={{ border: '1px solid #ccc', padding: '8px' }}>{c.title}</th>)}
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Celkem</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(scores).map(([t, s]) => {
            const total = Object.values(s || {}).reduce((a, b) => a + b, 0);
            return (
              <tr key={t}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{t}</td>
                {challenges.map(c => <td key={c.id} style={{ border: '1px solid #ccc', padding: '8px' }}>{s?.[c.id] || 0}</td>)}
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
