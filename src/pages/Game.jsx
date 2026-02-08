import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Game.css';

function Game() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const cardEmojis = ['💕', '💖', '💗', '💝', '💘', '💞', '💓', '💌'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false }));
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = flippedCards;
      
      if (cards[first].emoji === cards[second].emoji) {
        const newMatched = [...matchedCards, first, second];
        setMatchedCards(newMatched);
        setFlippedCards([]);
        
        if (newMatched.length === cards.length) {
          setTimeout(() => setGameWon(true), 500);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 800);
      }
    }
  }, [flippedCards, cards, matchedCards, moves]);

  const handleCardClick = (index) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return;
    }
    setFlippedCards([...flippedCards, index]);
  };

  const isCardFlipped = (index) => {
    return flippedCards.includes(index) || matchedCards.includes(index);
  };

  return (
    <div className="game-page">
      <div className="pixel-bg"></div>
      
      <div className="game-content">
        <h1 className="pixel-title">Memory Game</h1>
        <p className="game-subtitle">Match the hearts for a special surprise!</p>
        
        <div className="game-stats">
          <span className="pixel-text">Moves: {moves}</span>
        </div>

        <div className="card-grid">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`game-card ${isCardFlipped(index) ? 'flipped' : ''} ${
                matchedCards.includes(index) ? 'matched' : ''
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-front">?</div>
              <div className="card-back">{card.emoji}</div>
            </div>
          ))}
        </div>

        {gameWon && (
          <div className="game-won-overlay">
            <div className="won-message">
              <h2 className="pixel-title">🎉 You Won! 🎉</h2>
              <p className="pixel-text">You matched all the hearts!</p>
              <button 
                className="pixel-button"
                onClick={() => navigate('/music')}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {!gameWon && (
          <button 
            className="pixel-button reset-button"
            onClick={initializeGame}
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
}

export default Game;
