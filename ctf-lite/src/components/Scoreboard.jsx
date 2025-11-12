import React from 'react';

export default function Scoreboard({ scores }) {
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return (
    <div>
      <h2>Scoreboard</h2>
      <table>
        <thead>
          <tr>
            <th>Tým</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map(([team, points]) => (
            <tr key={team}>
              <td>{team}</td>
              <td>{points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
