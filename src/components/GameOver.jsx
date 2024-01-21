import PropTypes from 'prop-types';

const GameOver = ({ winner, onRestart }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner ? <p>{winner} won!</p> : <p>It&apos;s a drag.</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
};

GameOver.propTypes = {
  winner: PropTypes.string.isRequired,
  onRestart: PropTypes.func.isRequired
};

export { GameOver };
