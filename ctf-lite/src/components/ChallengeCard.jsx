import React from 'react';

export default function ChallengeCard({ challenge, onSubmit, scores }) {
  const solved = scores?.[challenge.id];

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      backgroundColor: solved ? '#d4edda' : '#f8f9fa',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      textAlign: 'left'
    }}>
      <h3>{challenge.title} {solved && '✅'}</h3>
      <p>{challenge.description}</p>
      <p><strong>Body:</strong> {challenge.points}</p>
      {!solved && (
        <button
          onClick={() => onSubmit(challenge.id, challenge.points)}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Odevzdat
        </button>
      )}
    </div>
  );
}
