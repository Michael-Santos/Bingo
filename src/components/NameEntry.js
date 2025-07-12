import React, { useState } from 'react';

const NameEntry = ({ onSubmit }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName) {
      onSubmit(playerName);
      setPlayerName('');
    }
  };

  return (
    <div>
      <h2>Enter Player Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NameEntry;