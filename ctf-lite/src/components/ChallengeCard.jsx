import React from 'react';

export default function ChallengeCard({ challenge, onSubmit, scores }) {
  const solved = scores?.[challenge.id];

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '16px',
      backgroundColor: solved ? '#e6ffed' : '#ffffff', // světlé pozadí
      boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
      textAlign: 'left',
      transition: 'all 0.2s ease',
    }}>
      <h3 style={{
        margin: '0 0 10px 0',
        fontSize: '20px',
        color: '#333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {challenge.title} {solved && <span style={{ color: '#28a745' }}>✅</span>}
      </h3>

      <p style={{ margin: '0 0 10px 0', color: '#555', fontSize: '16px', lineHeight: '1.5' }}>
        {challenge.description}
      </p>

      <p style={{ margin: '0 0 12px 0', color: '#333', fontWeight: 'bold' }}>
        Body: {challenge.points}
      </p>

      {!solved && (
        <button
          onClick={() => onSubmit(challenge.id, challenge.points)}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Odevzdat
        </button>
      )}
    </div>
  );
}
