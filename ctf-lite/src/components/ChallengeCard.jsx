import React from 'react';

export default function ChallengeCard({ challenge }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px 0',
      boxShadow: '2px 2px 6px rgba(0,0,0,0.1)'
    }}>
      <h3>{challenge.title} <span style={{color: 'green'}}>({challenge.points} bodů)</span></h3>
      <p>{challenge.description}</p>
    </div>
  );
}
