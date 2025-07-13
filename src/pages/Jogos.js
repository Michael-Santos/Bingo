import React, { useState } from 'react';
import DrawTable from '../components/DrawTable';
import './Jogos.css';

function Jogos() {
  const [games, setGames] = useState([]);
  const [newGameName, setNewGameName] = useState('');
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [drawnNumbers, setDrawnNumbers] = useState({}); // { [gameId]: [números sorteados] }

  const handleCreateGame = (e) => {
    e.preventDefault();
    if (!newGameName.trim()) return;
    const newGame = { name: newGameName, id: Date.now() };
    setGames([...games, newGame]);
    setNewGameName('');
    setDrawnNumbers(prev => ({ ...prev, [newGame.id]: [] }));
  };

  const handleSelectGame = (gameId) => {
    setSelectedGameId(gameId);
  };

  const selectedNumbers = drawnNumbers[selectedGameId] || [];

  return (
    <div className="Jogos">
      <h1>
        {!selectedGameId
          ? 'Bingo Game'
          : games.find(g => g.id === selectedGameId)?.name || 'Bingo Game'}
      </h1>
      {!selectedGameId ? (
        <>
          <form onSubmit={handleCreateGame} style={{ marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Nome do novo jogo"
              value={newGameName}
              onChange={e => setNewGameName(e.target.value)}
            />
            <button type="submit">Criar novo jogo</button>
          </form>
          <h2>Jogos em andamento</h2>
          <ul>
            {games.map(game => (
              <li
                key={game.id}
                style={{
                  cursor: 'pointer',
                  fontWeight: selectedGameId === game.id ? 'bold' : 'normal',
                  background: selectedGameId === game.id ? '#e3eafc' : undefined
                }}
                onClick={() => handleSelectGame(game.id)}
              >
                {game.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div style={{ marginTop: 32 }}>
          <DrawTable
            drawnNumbers={selectedNumbers}
            onDraw={num => setDrawnNumbers(prev => ({
              ...prev,
              [selectedGameId]: [...selectedNumbers, num]
            }))}
          />
        </div>
      )}
    </div>
  );
}

export default Jogos;