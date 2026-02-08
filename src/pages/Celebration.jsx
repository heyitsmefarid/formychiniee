import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import './Celebration.css';

function Celebration() {
  const [showMessage, setShowMessage] = useState(false);
  const [flowers, setFlowers] = useState([]);

  const flowerEmojis = ['🌸', '🌺', '🌹', '🌷', '🌼', '💐', '🌻', '🏵️', '💮'];

  useEffect(() => {
    // Detect if mobile
    const isMobile = window.innerWidth <= 768;
    const confettiInterval = isMobile ? 500 : 250;
    const flowerInterval = isMobile ? 600 : 300;
    const particleCount = isMobile ? 20 : 50;
    
    // Continuous fireworks
    const duration = 15000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const currentParticleCount = particleCount * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount: currentParticleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#ff1493', '#ffc0cb'],
      });
      confetti({
        ...defaults,
        particleCount: currentParticleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#ff1493', '#ffc0cb'],
      });
    }, confettiInterval);

    // Heart confetti bursts
    const heartInterval = setInterval(() => {
      confetti({
        particleCount: isMobile ? 50 : 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#fff'],
        shapes: ['circle'],
        scalar: 1.2,
      });
    }, 2000);

    // Spawn flowers
    const flowerInterval = setInterval(() => {
      const newFlower = {
        id: Date.now(),
        emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 2,
        size: 2 + Math.random() * 2,
      };
      setFlowers(prev => [...prev, newFlower]);
      
      setTimeout(() => {
        setFlowers(prev => prev.filter(f => f.id !== newFlower.id));
      }, (newFlower.animationDuration * 1000) + 1000);
    }, flowerInterval);

    setTimeout(() => setShowMessage(true), 1000);

    return () => {
      clearInterval(interval);
      clearInterval(heartInterval);
      clearInterval(flowerInterval);
    };
  }, []);

  return (
    <div className="celebration-page">
      <div className="pixel-bg celebration-bg"></div>
      
      {flowers.map(flower => (
        <div
          key={flower.id}
          className="falling-flower"
          style={{
            left: `${flower.left}%`,
            animationDuration: `${flower.animationDuration}s`,
            fontSize: `${flower.size}rem`,
          }}
        >
          {flower.emoji}
        </div>
      ))}

      <div className="celebration-content">
        {showMessage && (
          <>
            <h1 className="pixel-title celebration-title glitch" data-text="🎉 SHE SAID YES! 🎉">
              🎉 SHE SAID YES! 🎉
            </h1>
            
            <div className="celebration-message">
              <p className="pixel-text large">Thank you for making me the happiest!</p>
              <p className="pixel-text">You're my forever Valentine ♥</p>
              <p className="pixel-date">July 19, 2023 - Forever ∞</p>
            </div>

            <div className="heart-animation">
              <div className="pixel-heart">
                <span>♥</span>
              </div>
            </div>

            <div className="floating-messages">
              <span className="float-msg msg-1">I love you!</span>
              <span className="float-msg msg-2">My Chinie ♥</span>
              <span className="float-msg msg-3">Forever & Always</span>
              <span className="float-msg msg-4">You & Me</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Celebration;
