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
    </div>
  );
}
