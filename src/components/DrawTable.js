import React, { useState } from 'react';

const DrawTable = () => {
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [numberPool, setNumberPool] = useState(Array.from({ length: 75 }, (_, i) => i + 1));

  const drawNumber = () => {
    if (numberPool.length === 0) return;
    const randomIndex = Math.floor(Math.random() * numberPool.length);
    const number = numberPool[randomIndex];
    setDrawnNumbers([...drawnNumbers, number]);
    setNumberPool(numberPool.filter((num) => num !== number));
  };

  return (
    <div>
      <h2>Draw Numbers</h2>
      <button onClick={drawNumber}>Draw Number</button>
      <table>
        <thead>
          <tr>
            <th>Drawn Numbers</th>
          </tr>
        </thead>
        <tbody>
          {drawnNumbers.map((number, index) => (
            <tr key={index}>
              <td>{number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrawTable;