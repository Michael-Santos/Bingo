import React, { useState } from 'react';
import NameEntry from '../components/NameEntry';
import BingoCard from '../components/BingoCard';
import './Home.css';

function Home() {
  const [player, setPlayer] = useState('');
  const [bingoCards, setBingoCards] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [marked, setMarked] = useState([]); // Novo estado

  const handlePlayerSubmit = (name) => {
    setPlayer(name);
    const newCards = Array.from({ length: 3 }, () => generateBingoCard());
    setBingoCards(newCards);
    setMarked(Array(3).fill(null).map(() => Array(5).fill(null).map(() => Array(5).fill(false))));
    setActiveTab(0);
  };

  const handleMark = (cardIdx, i, j) => {
    setMarked(prev => {
      const copy = prev.map(card => card.map(row => [...row]));
      copy[cardIdx][i][j] = !copy[cardIdx][i][j];
      return copy;
    });
  };

  const generateBingoCard = () => {
    const ranges = [
      [1, 15],    // B
      [16, 30],   // I
      [31, 45],   // N
      [46, 60],   // G
      [61, 75],   // O
    ];
    const card = [];
    for (let col = 0; col < 5; col++) {
      // Gera 5 números únicos para cada coluna
      let nums = [];
      while (nums.length < 5) {
        const n = Math.floor(Math.random() * (ranges[col][1] - ranges[col][0] + 1)) + ranges[col][0];
        if (!nums.includes(n)) nums.push(n);
      }
      card.push(nums);
    }
    // Transpõe para linhas
    const transposed = [];
    for (let row = 0; row < 5; row++) {
      transposed[row] = [];
      for (let col = 0; col < 5; col++) {
        transposed[row][col] = card[col][row];
      }
    }
    // Centro livre
    transposed[2][2] = '★';
    return transposed;
  };

  return (
    <div className="Home">
      <h1>Bingo Game</h1>
      {!player ? (
        <NameEntry onSubmit={handlePlayerSubmit} />
      ) : (
        <div>
          <h2>Bem-vindo, {player}!</h2>
          <h3>Suas Cartelas</h3>
          <div className="BingoTabs">
            <div className="BingoTabHeaders">
              {bingoCards.map((_, idx) => (
                <button
                  key={idx}
                  className={activeTab === idx ? 'active' : ''}
                  onClick={() => setActiveTab(idx)}
                >
                  Cartela {idx + 1}
                </button>
              ))}
            </div>
            <div className="BingoTabContent">
              <BingoCard
                numbers={bingoCards[activeTab]}
                marked={marked[activeTab]}
                onMark={(i, j) => handleMark(activeTab, i, j)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;