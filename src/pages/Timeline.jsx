import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Timeline.css';

function Timeline() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const startDate = new Date('2023-07-19');
  const today = new Date();
  const daysTogether = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const monthsTogether = Math.floor(daysTogether / 30);

  const memories = [
    {
      title: "The Beginning",
      date: "July 19, 2023",
      text: "The day that changed everything ♥",
      emoji: "🌟"
    },
    {
      title: "Every Day Since",
      date: `${daysTogether} Days Together`,
      text: "Every sunrise and sunset, thinking of you",
      emoji: "🌅"
    },
    {
      title: "Long Distance Love",
      date: "Miles Apart, Hearts Close",
      text: "Distance means nothing when you mean everything",
      emoji: "💌"
    },
    {
      title: "Our Journey",
      date: `${monthsTogether} Months of Love`,
      text: "And counting... ∞",
      emoji: "💕"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [memories.length]);

  return (
    <div className="timeline-page">
      <div className="pixel-bg"></div>
      
      <div className="timeline-content">
        <h1 className="pixel-title">Our Story</h1>
        
        <div className="memory-carousel">
          {memories.map((memory, index) => (
            <div 
              key={index}
              className={`memory-card ${index === currentIndex ? 'active' : ''}`}
            >
              <div className="memory-emoji">{memory.emoji}</div>
              <h2 className="memory-title">{memory.title}</h2>
              <p className="memory-date">{memory.date}</p>
              <p className="memory-text">{memory.text}</p>
            </div>
          ))}
        </div>

        <div className="timeline-dots">
          {memories.map((_, index) => (
            <span 
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>

        <button 
          className="pixel-button next-button"
          onClick={() => navigate('/timer')}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}

export default Timeline;
