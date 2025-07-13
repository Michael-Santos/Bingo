import React, { useState } from 'react';
import './DrawTable.css';

const DrawTable = ({ drawnNumbers = [], onDraw }) => {
  const [animating, setAnimating] = useState(false);
  const [currentDraw, setCurrentDraw] = useState(null);

  // Cria uma matriz 5 colunas x 15 linhas (B, I, N, G, O)
  const columns = [
    Array.from({ length: 15 }, (_, i) => i + 1),      // B: 1-15
    Array.from({ length: 15 }, (_, i) => i + 16),     // I: 16-30
    Array.from({ length: 15 }, (_, i) => i + 31),     // N: 31-45
    Array.from({ length: 15 }, (_, i) => i + 46),     // G: 46-60
    Array.from({ length: 15 }, (_, i) => i + 61),     // O: 61-75
  ];
  const headers = ['B', 'I', 'N', 'G', 'O'];

  const handleDrawNumber = () => {
    if (animating) return;
    // Calcula os números disponíveis
    const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
    const available = allNumbers.filter(n => !drawnNumbers.includes(n));
    if (available.length === 0) return;
    setAnimating(true);
    // Animação: mostra números aleatórios antes do sorteado
    let count = 0;
    const animation = setInterval(() => {
      setCurrentDraw(available[Math.floor(Math.random() * available.length)]);
      count++;
      if (count > 15) {
        clearInterval(animation);
        const drawn = available[Math.floor(Math.random() * available.length)];
        setCurrentDraw(drawn);
        setTimeout(() => {
          setAnimating(false);
          setCurrentDraw(null);
          if (onDraw) onDraw(drawn);
        }, 1200);
      }
    }, 70);
  };

  return (
    <div className="DrawTable">
      <h2>Sortear número</h2>
      <button onClick={handleDrawNumber} disabled={animating}>Sortear um número</button>
      {animating && currentDraw !== null && (
        <div className="draw-animation">
          <span>{currentDraw}</span>
        </div>
      )}
      <table>
        <thead>
          <tr>
            {headers.map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 15 }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map((col, colIdx) => {
                const num = col[rowIdx];
                const isDrawn = drawnNumbers.includes(num) || num === currentDraw;
                return (
                  <td
                    key={colIdx}
                    className={isDrawn ? 'drawn' : ''}
                  >
                    {num}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrawTable;