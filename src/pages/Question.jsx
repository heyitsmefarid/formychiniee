import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Question.css';

function Question() {
  const navigate = useNavigate();
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonStyle, setNoButtonStyle] = useState({});

  const handleNoHover = () => {
    const randomX = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
    const randomY = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
    
    setNoButtonStyle({
      transform: `translate(${randomX}px, ${randomY}px)`,
      transition: 'transform 0.3s ease'
    });
  };

  const handleYes = () => {
    navigate('/celebration');
  };

  return (
    <div className="question-page">
      <div className="pixel-bg"></div>
      <div className="floating-hearts"></div>
      
      <div className="question-content">
        <div className="letter-container">
          <div className="letter-paper">
            <h1 className="pixel-title small">Hi Elfiema Cabana Rumbaoa,</h1>
            
            <div className="letter-text">
              <p>I just want to say this simply. I'm really thankful for you.</p>
              
              <p>Since <span className="highlight">July 19, 2023</span>, being with you has been one of the best parts of my life.</p>
              
              <p>I like being with you. I like how easy things feel when we talk, laugh, or even stay quiet. You make my days better without trying.</p>
              
              <p className="emphasis">So this Valentine's Day, I just want to ask you one thing...</p>
            </div>
            
            <h2 className="big-question pixel-title">
              Can I be your Valentine, My Chinie?
            </h2>
            
            <div className="button-container">
              <button 
                className="pixel-button yes-button pulse"
                onClick={handleYes}
              >
                YES! ♥
              </button>
              
              <button 
                className="pixel-button no-button"
                style={noButtonStyle}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
