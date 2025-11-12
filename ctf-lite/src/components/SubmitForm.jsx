import React, { useState } from 'react';

export default function SubmitForm({ onScoreUpdate, currentTeam, challenges, solved }) {
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentTeam) {
      setMessage('Zadej jméno!');
      return;
    }

    const challenge = challenges.find(c => c.flag === flag.trim());
    if (!challenge) {
      setMessage('Špatný flag!');
      return;
    }

    if (solved[currentTeam]?.[challenge.id]) {
      setMessage('Tuto úlohu jste už vyřešili!');
      return;
    }

    onScoreUpdate(challenge.id, challenge.points);
    setMessage(`Správný flag! +${challenge.points} bodů`);
    setFlag('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Zadej flag"
        value={flag}
        onChange={(e) => setFlag(e.target.value)}
        required
        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px' }}
      />
      <button
        type="submit"
        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff', border: 'none' }}
      >
        Odevzdat flag
      </button>
      <p>{message}</p>
    </form>
  );
}
