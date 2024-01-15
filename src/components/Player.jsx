import PropTypes from 'prop-types';
import { useState } from 'react';

const Player = ({ initialName, symbol }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const handleEdit = () => {
    setIsEditing(wasEditing => !wasEditing);
  };

  const handleNameChange = event => {
    setPlayerName(event.target.value);
  };

  return (
    <li>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            required
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? ' Save' : 'Edit'}</button>
    </li>
  );
};

Player.propTypes = {
  initialName: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};

export { Player };
