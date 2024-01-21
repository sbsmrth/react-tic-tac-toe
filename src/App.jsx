import { useState } from 'react';
import { Player } from './components/Player';
import { GameBoard } from './components/GameBoard';
import { Log } from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import { GameOver } from './components/GameOver';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = gameTurns => {
  return gameTurns[0]?.player === 'X' ? 'O' : 'X';
};

function App() {
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(row => [...row])];

  gameTurns.forEach(turn => {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  });

  let winner;

  WINNING_COMBINATIONS.forEach(combination => {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  });

  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevTurns => {
      const player = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handleRematch = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => ({
      ...prevPlayers,
      [symbol]: newName
    }));
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
