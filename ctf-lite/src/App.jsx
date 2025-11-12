import React, { useState } from 'react';
import ChallengeCard from './components/ChallengeCard';
import SubmitForm from './components/SubmitForm';
import Scoreboard from './components/Scoreboard';
import { challenges } from './data/challenges';

export default function App() {
  const [scores, setScores] = useState({});
  const [solved, setSolved] = useState({}); // vyřešené úlohy podle týmu
  const [currentTeam, setCurrentTeam] = useState('');

  // správně aktualizuje skóre a vyřešené úlohy
  const handleScoreUpdate = (team, challengeId, points) => {
    if (!team) return;

    // kontrola, zda tým už úlohu nevyřešil
    if (solved[team]?.includes(challengeId)) return;

    setScores(prev => ({
      ...prev,
      [team]: (prev[team] || 0) + points
    }));

    setSolved(prev => ({
      ...prev,
      [team]: [...(prev[team] || []), challengeId]
    }));
  };

  // odemčení úloh podle toho, co tým vyřešil
  const unlockedChallenges = (team) => {
    if (!team || !solved[team] || solved[team].length === 0) {
      return [challenges[0]];
    }
    const lastSolvedIndex = Math.max(...solved[team].map(id => challenges.findIndex(c => c.id === id)));
    return challenges.slice(0, lastSolvedIndex + 2);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: '16px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center' }}>CTF Lite</h1>

      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Jméno týmu"
          value={currentTeam}
          onChange={(e) => setCurrentTeam(e.target.value)}
          style={{ padding: '8px', fontSize: '16px', borderRadius: '4px' }}
        />
      </div>

      <section style={{ width: '100%', maxWidth: '600px' }}>
        <h2>Úlohy</h2>
        {unlockedChallenges(currentTeam).map(c => (
          <ChallengeCard key={c.id} challenge={c} />
        ))}
      </section>

      <section style={{ marginTop: '32px', width: '100%', maxWidth: '600px' }}>
        <h2>Odevzdej flag</h2>
        <SubmitForm
          currentTeam={currentTeam}
          challenges={challenges}
          solved={solved}
          onScoreUpdate={handleScoreUpdate} // správné předání
        />
      </section>

      <section style={{ marginTop: '32px', width: '100%', maxWidth: '600px' }}>
        <Scoreboard scores={scores} />
      </section>
    </div>
  );
}
