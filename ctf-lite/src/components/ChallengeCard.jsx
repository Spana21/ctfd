import React, { useState } from 'react';

export default function ChallengeCard({ challenge, onSubmit, scores }) {
  const [message, setMessage] = useState('');
  const [flag, setFlag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (scores?.[challenge.id]) {
      setMessage('Už jste tuto úlohu vyřešili!');
      return;
    }

    if (!flag.trim()) {
      setMessage('Zadejte flag!');
      return;
    }

    if (flag.trim() === challenge.flag) {
      onSubmit(challenge.id, challenge.points);
      setMessage(`Správný flag! +${challenge.points} bodů`);
      setFlag('');
    } else {
      setMessage('Špatný flag!');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
      <h3>{challenge.name} ({challenge.points} bodů)</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={flag} 
          onChange={(e) => setFlag(e.target.value)} 
          placeholder="Flag" 
        />
        <button type="submit">Odevzdat</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
