import React from 'react';
import './BingoCard.css';

export default function BingoCard({ numbers, marked, onMark }) {
  const headers = ['B', 'I', 'N', 'G', 'O'];

  const handleClick = (i, j) => {
    if (i === 2 && j === 2) return;
    onMark(i, j);
  };

  return (
    <div className="BingoCard">
      <table>
        <thead>
          <tr>
            {headers.map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {numbers.map((row, i) => (
            <tr key={i}>
              {row.map((num, j) => (
                <td
                  key={j}
                  className={
                    (i === 2 && j === 2 ? 'center ' : '') +
                    (marked && marked[i][j] ? 'marked' : '')
                  }
                  onClick={() => handleClick(i, j)}
                  style={{ cursor: i === 2 && j === 2 ? 'default' : 'pointer' }}
                >
                  {num}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}