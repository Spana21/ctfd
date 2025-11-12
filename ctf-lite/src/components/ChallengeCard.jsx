import React from 'react';

export default function ChallengeCard({ challenge, onSubmit, scores }) {
  const solved = scores?.[challenge.id];

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '18px',
        marginBottom: '16px',
        backgroundColor: solved ? '#e6ffed' : '#fafafa',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      <h3 style={{ color: '#333', marginBottom: '8px' }}>
        {challenge.title} {solved && <span style={{ color: '#28a745' }}>✅</span>}
      </h3>
      <p style={{ color: '#555', lineHeight: '1.5', marginBottom: '8px' }}>
        {challenge.description}
      </p>
      <p style={{ color: '#000', fontWeight: 'bold', marginBottom: '10px' }}>
        Body: {challenge.points}
      </p>
      {!solved && (
        <button
          onClick={() => onSubmit(challenge.id, challenge.points)}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: '#007bff',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Odevzdat
        </button>
      )}
    </div>
  );
}
