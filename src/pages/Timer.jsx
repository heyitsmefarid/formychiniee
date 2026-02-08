import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Timer.css';

function Timer() {
  const navigate = useNavigate();
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const startDate = new Date('2023-07-19T00:00:00');

  const calculateTime = () => {
    const now = new Date();
    const diff = now - startDate;

    // Calculate time components
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Calculate years and months more accurately
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let remainingDays = now.getDate() - startDate.getDate();

    if (remainingDays < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      remainingDays += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setTimeElapsed({
      years: years,
      months: months,
      days: remainingDays,
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    });
  };

  useEffect(() => {
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer-page">
      <div className="pixel-bg"></div>
      <div className="floating-particles"></div>
      
      <div className="timer-content">
        <h1 className="pixel-title">Time Together</h1>
        <p className="timer-subtitle">Since July 19, 2023</p>

        <div className="timer-grid">
          <div className="timer-box">
            <div className="timer-value">{timeElapsed.years}</div>
            <div className="timer-label">Year{timeElapsed.years !== 1 ? 's' : ''}</div>
          </div>

          <div className="timer-box">
            <div className="timer-value">{timeElapsed.months}</div>
            <div className="timer-label">Month{timeElapsed.months !== 1 ? 's' : ''}</div>
          </div>

          <div className="timer-box">
            <div className="timer-value">{timeElapsed.days}</div>
            <div className="timer-label">Day{timeElapsed.days !== 1 ? 's' : ''}</div>
          </div>

          <div className="timer-box">
            <div className="timer-value">{String(timeElapsed.hours).padStart(2, '0')}</div>
            <div className="timer-label">Hours</div>
          </div>

          <div className="timer-box">
            <div className="timer-value">{String(timeElapsed.minutes).padStart(2, '0')}</div>
            <div className="timer-label">Minutes</div>
          </div>

          <div className="timer-box">
            <div className="timer-value">{String(timeElapsed.seconds).padStart(2, '0')}</div>
            <div className="timer-label">Seconds</div>
          </div>
        </div>

        <div className="timer-message">
          <p className="pixel-text">Every second with you matters ♥</p>
          <p className="pixel-text small">And counting... ∞</p>
        </div>

        <button 
          className="pixel-button next-button pulse"
          onClick={() => navigate('/game')}
        >
          CONTINUE →
        </button>
      </div>
    </div>
  );
}

export default Timer;
