import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
  }, []);

  return (
    <div className="landing-page">
      <div className="pixel-bg"></div>
      <div className="pixel-hearts"></div>
      
      <div className="landing-content">
        {showText && (
          <>
            <h1 className="pixel-title glitch" data-text="♥ For My Chinie ♥">
              ♥ For My Chinie ♥
            </h1>
            <p className="pixel-subtitle fade-in">A Special Valentine's Message</p>
            <p className="pixel-date fade-in-delay">Since July 19, 2023</p>
            <button 
              className="pixel-button start-button pulse"
              onClick={() => navigate('/password')}
            >
              START
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Landing;
